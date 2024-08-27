import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const HomeBlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState([]);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showmore, setShowmore] = useState(true);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setErrors(null);
      const res = await axios.get("/blog");
      const data = await res.data.blogs;
      setBlog(data);
      setLoading(false);
      if (data.length < 9) {
        setShowmore(false);
      }
    } catch (error) {
      console.log(error.message);
      setErrors(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const handleShowmore = async () => {
    try {
      const res = await axios.get(`/blog?startIndex=${blog.length}`);
      const data = await res.data.blogs;
      console.log(data);
      setBlog((prev) => [...prev, ...data]);
      if (data.length < 9) {
        setShowmore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col items-center justify-center gap-5">
      <div className=" text-4xl font-bold">BLOG'S</div>{" "}
      <div className=" flex flex-wrap gap-5 items-center justify-center md:justify-between ">
        {blog.map((item) => (
          <div
            key={item._id}
            className=" border p-4 flex flex-col gap-5 items-center justify-center  "
          >
            <img className="h-[250px] w-[270px]" src={item.image} />
            <h2>Title: {item.title}</h2>
            <div className=" flex gap-2">
              <h2>Content:</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.content.substring(0, 30),
                }}
              ></div>
            </div>
            <h3>Category: {item.category}</h3>

            <p>Publish: {new Date(item.createdAt).toLocaleDateString()}</p>
            <NavLink
              to={`/blog/${item.slug}`}
              className="flex items-center justify-center p-4  bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 text-black"
            >
              Read more
            </NavLink>
          </div>
        ))}
      </div>
      {showmore && <button onClick={handleShowmore}>Load More</button>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default HomeBlogPage;
