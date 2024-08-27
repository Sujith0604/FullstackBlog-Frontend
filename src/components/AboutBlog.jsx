import React from "react";

const AboutBlog = () => {
  return (
    <div className=" flex flex-col md:flex-row items-center md:h-screen justify-center md:justify-between p-4 w-[100%]">
      <div className="flex flex-col items-center justify-center gap-5  p-4 md:w-[50%]">
        <img src="https://codingbytes.com/wp-content/uploads/2022/03/full-stack-web-development.jpg" />
      </div>
      <div className=" flex flex-col items-center justify-center md:items-start gap-5 p-4 md:w-[50%]">
        <h1 className=" md:text-2xl text-xl font-bold text-center">
          Want to learn about the Mern-stack Development?
        </h1>
        <p className=" font-thin md:text-start text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <button className=" flex items-center justify-center p-4 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 text-black">
          Click here
        </button>
      </div>
    </div>
  );
};

export default AboutBlog;
