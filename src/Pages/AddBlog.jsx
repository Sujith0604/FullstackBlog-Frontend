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
    <div className="w-[100%] flex md:flex-row flex-col gap-10 md:gap-0 ">
      <div className=" flex flex-col items-center gap-5 justify-center  md:w-[50%]">
        <div className=" text-2xl font-semibold">CREATE BLOG</div>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
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
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JAVASCRIPT">JAVASCRIPT</option>
              <option value="REACTJS">REACTJS</option>
              <option value="NODEJS">NODEJS</option>
              <option value="EXPRESSJS">EXPRESSJS</option>
              <option value="MONGODB">MONGODB</option>
            </select>
          </div>
          <div>
            <ReactQuill
              theme="snow"
              required
              value={formData.content}
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
            />
          </div>

          {formData.image && (
            <img
              className=" h-[250px] w-[250px]"
              src={formData.image}
              alt="Blog Image"
            />
          )}
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
            <button
              onClick={handleUploadImage}
              className=" bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 text-black p-2 rounded-md"
              type="button"
            >
              Upload image
            </button>
          </div>
          <button
            className=" bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 text-black p-2 rounded-md"
            type="submit"
          >
            Publish Blog
          </button>
        </form>
      </div>
      <div className=" md:w-[50%] flex flex-col justify-center md:items-start items-center p-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  );
};

export default AddBlog;
