import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState("");
  const [imageURL, setImageURL] = useState("");
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

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
        setImageURL(null);
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("Image uploaded to: ", downloadURL);
          setImageURL(downloadURL);
        });
      }
    );
  };

  return (
    <div className=" bg-blue-600 w-screen">
      <form className=" flex flex-col gap-2">
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
        />
        <input
          type="email"
          placeholder="Enter your email"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="Enter your password"
          defaultValue="sadadadad"
        />
        <button type="submit">Update Profile</button>
      </form>
      <div>
        <button>Delete Account</button>
      </div>
    </div>
  );
};

export default DashProfile;
