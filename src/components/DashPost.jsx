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
      {currentUser.isAdmin && userBlogs.length > 0 ? (
        <>
          {" "}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userBlogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{blog.title}</td>
                  <td className="px-6 py-4">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.substring(0, 30),
                    }}
                  ></td>
                  <td className="px-6 py-4">{blog.category}</td>
                  <td className="px-6 py-4">
                    <NavLink to={`/blog/${blog.slug}`}>
                      <img className="h-[50px] w-[50px]" src={blog.image} />
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <NavLink to={`/updateblog/${blog._id}`}>Update</NavLink>
                    <button
                      onClick={() => handleDelete(blog._id, currentUser._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showmore && <button onClick={handleShowmore}>Load More</button>}
        </>
      ) : null}
    </div>
  );
};

export default DashPost;
