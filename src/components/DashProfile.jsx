import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "../utils/axios";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  logoutSuccess,
} from "../slices/userSlice";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const [imageFile, setImageFile] = useState("");
  const [imageURL, setImageURL] = useState("");
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageSucceeded, setImageSucceeded] = useState(false);

  const [uploadSucess, setUploadSucess] = useState("");
  const [uploadError, setUploadError] = useState("");

  console.log(imageFileUploadError, imageFileUploadProgress);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      updateImage();
    }
  }, [imageFile]);

  const updateImage = async () => {
    setImageSucceeded(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress percentage
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload error: ", error);
        setImageFileUploadError(error.message);
        setImageFileUploadProgress(null);
        setImageSucceeded(false);
        setImageURL(null);
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("Image uploaded to: ", downloadURL);
          setImageURL(downloadURL);
          setFormData({ ...formData, profileImage: imageURL });

          setImageSucceeded(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");
    setUploadSucess("");
    if (Object.keys(formData).length === 0) {
      setUploadError("No changes in the field");
      return;
    }
    if (imageSucceeded) {
      setUploadError("Image is uploading");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await axios.put(`/user/${currentUser._id}`, formData);
      console.log(res);
      if (!res.statusText === "OK") {
        dispatch(updateFailure("Error updating"));
        setUploadError("Error updating");
      }
      const data = await res.data;
      dispatch(updateSuccess(data.rest));
      setUploadSucess("Uploaded the changes");
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDelete = async (id) => {
    dispatch(deleteUserStart());
    try {
      const res = await axios.delete(`/user/${id}`);
      console.log(res);
      if (!res.statusText === "OK") {
        dispatch(deleteUserFailure("Error deleting"));
      }
      const data = await res.data;
      dispatch(deleteUserSuccess(data));
      alert("User deleted successfully");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("/user/logout");
      console.log(res);
      const data = await res.data;
      if (!res.statusText === "OK") {
        console.log("Error logging out");
      }
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" bg-blue-600 w-screen">
      <form onClick={handleSubmit} className=" flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onClick={handleImageChange}
          ref={filePickerRef}
          className=" hidden"
        />
        <div>
          {/* {imageFileUploadProgress < 100 ? (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}`}
            />
          ) : ( */}
          <img
            onClick={() => filePickerRef.current.click()}
            className=" h-[220px] rounded-full"
            src={imageURL || currentUser.profileImage}
          />
          {/* )} */}
        </div>

        <input
          type="text"
          placeholder="Enter your name"
          defaultValue={currentUser.username}
          name="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter your email"
          defaultValue={currentUser.email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
      <div>
        <button onClick={() => handleDelete(currentUser._id)}>
          Delete Account
        </button>
        <button onClick={handleLogout}>Logout Account</button>
      </div>
      {uploadSucess && <p className="text-green-500">{uploadSucess}</p>}
      {uploadError && <p className="text-red-500">{uploadError}</p>}
    </div>
  );
};

export default DashProfile;
