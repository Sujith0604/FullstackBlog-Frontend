import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>BLOG</h1>
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>

          <img className="h-[50px] w-[50px]" src={blog.image} />
          <p> {new Date(blog.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
