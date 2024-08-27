import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";

const BlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState([]);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(blog);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setErrors(null);
      const res = await axios.get(`/blog?slug=${slug}`);
      const data = await res.data.blogs[0];
      setBlog(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setErrors(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col items-center justify-center gap-5">
      <h1 className=" text-4xl font-bold">BLOG</h1>
      {blog && (
        <div className=" flex flex-col gap-5 items-center justify-center px-4">
          <img className="h-[350px] w-[350px]" src={blog.image} />
          <h2 className=" text-2xl font-bold">Title: {blog.title}</h2>
          <h2 className=" text-2xl font-bold">Category: {blog.category}</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>

          <p>Publish: {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <CallToAction />
    </div>
  );
};

export default BlogPage;
