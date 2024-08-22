import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const navigate = useNavigate();

  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("No file selected");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress percentage
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(error);
          console.error("Upload failed", error);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({
              ...formData,
              image: downloadURL,
            });
            setImageUploadError(null);
            setImageUploadProgress(null);
          });
        }
      );
    } catch (error) {
      setImageUploadError(error);
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/blog/${currentUser._id}`, {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        image: formData.image,
      });

      const data = res.data;
      if (!res.statusText === "OK") {
        console.log("Error creating blog");
        return;
      }
      navigate(`/blog/${data.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <input
            className=" p-2 border rounded-md "
            type="text"
            placeholder="Enter the blog title"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>
        <ReactQuill
          theme="snow"
          required
          value={formData.content}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        <div>
          <select
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="World">World</option>
          </select>
        </div>
        {formData.image && <img src={formData.image} alt="Blog Image" />}
        <div className=" flex flex-col gap-2">
          <input
            className=" p-2 border rounded-md"
            type="file"
            accept="image/*"
            placeholder="Upload an image"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {imageUploadProgress && (
            <div>Image upload progress: {imageUploadProgress}%</div>
          )}
          {imageUploadError && <div>{imageUploadError}</div>}
          <button onClick={handleUploadImage} type="button">
            Upload image
          </button>
        </div>
        <button className=" bg-blue-400 p-2 rounded-md" type="submit">
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
