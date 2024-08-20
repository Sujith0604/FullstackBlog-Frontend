import { useRef } from "react";

const AddBlog = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <label>Title</label>
          <input
            className=" p-2 border rounded-md"
            type="text"
            ref={titleRef}
            placeholder="Enter the blog title"
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label>Content</label>
          <input
            className=" p-2 border rounded-md"
            type="text"
            ref={contentRef}
            placeholder="Enter the blog content"
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label>image</label>
          <input
            className=" p-2 border rounded-md"
            type="file"
            ref={imageRef}
          />
        </div>
        <button className=" bg-blue-400 p-2 rounded-md" type="submit">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
