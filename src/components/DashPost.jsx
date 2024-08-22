import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [userBlogs, setUserBlogs] = useState([]);
  const [showmore, setShowmore] = useState(true);

  const getAllBlogs = async () => {
    const res = await axios.get(`/blog?userId=${currentUser._id}`);
    const data = await res.data.blogs;

    setUserBlogs(data);
    if (data.length < 9) {
      setShowmore(false);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      getAllBlogs();
    }
  }, [currentUser._id]);

  const handleShowmore = async () => {
    try {
      const res = await axios.get(
        `/blog?userId=${currentUser._id}&startIndex=${userBlogs.length}`
      );
      const data = await res.data.blogs;
      console.log(data);
      setUserBlogs((prev) => [...prev, ...data]);
      if (data.length < 9) {
        setShowmore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (blogId, id) => {
    alert("Are you sure you want to delete the posts?");
    try {
      const res = await axios.delete(`/blog/${blogId}/${id}`);
      alert("Deleted successfully");
      setUserBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {currentUser.isAdmin && userBlogs.length > 0
        ? userBlogs.map((blog) => (
            <>
              <div key={blog._id}>
                <NavLink to={`/blog/${blog.slug}`}>
                  <h3>{blog.title}</h3>
                </NavLink>

                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                <p>{blog.content}</p>
                <p>{blog.category}</p>
                <NavLink to={`/blog/${blog.slug}`}>
                  <img className="h-[100px]" src={blog.image} />
                </NavLink>
                <NavLink to={`/updateblog/${blog._id}`}>Update</NavLink>
                <button onClick={() => handleDelete(blog._id, currentUser._id)}>
                  Delete
                </button>
              </div>
              {showmore && <button onClick={handleShowmore}>Load More</button>}
            </>
          ))
        : null}
    </div>
  );
};

export default DashPost;
