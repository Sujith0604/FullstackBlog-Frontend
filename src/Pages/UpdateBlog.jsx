import { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { id } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`/blog/${id}`);
      setFormData({
        title: res.data.title,
        content: res.data.content,
        category: res.data.category,
        image: res.data.image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
      const res = await axios.put(`/blog/${id}/${currentUser._id}`, {
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
      <div className=" flex flex-col items-center gap-5 justify-center  md:w-[50%] p-4">
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
      <div className=" flex flex-col items-center gap-5 justify-center  md:w-[50%] p-4">
        <div className=" uppercase text-3xl font-bold">Update blog</div>
        <form className=" flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-2">
            <label className="text-xl font-bold">Title:</label>
            <input
              className=" p-2 border rounded-md "
              type="text"
              placeholder="Enter the blog title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className=" flex flex-col gap-2 mb-5">
            <label className="text-xl font-bold">Content:</label>
            <ReactQuill
              theme="snow"
              required
              value={formData.content}
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
            />
          </div>

          <div className=" flex flex-col gap-2">
            <label className="text-xl font-bold">Category:</label>
            <select
              value={formData.category}
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
          {formData.image && (
            <img
              src={formData.image}
              className=" h-[100px] w-[100px]"
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
            <div>
              <button
                className=" bg-blue-400 p-2 rounded-md"
                onClick={handleUploadImage}
                type="button"
              >
                Upload image
              </button>
            </div>
          </div>
          <button className=" bg-blue-400 p-2 rounded-md" type="submit">
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
