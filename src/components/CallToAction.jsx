const CallToAction = () => {
  return (
    <div className=" flex flex-col md:flex-row items-center justify-center md:justify-between p-4 w-[100%] border">
      <div className=" flex flex-col items-center justify-center gap-5 p-4 md:w-[50%]">
        <h1 className=" text-2xl font-bold text-center">
          Want to learn about the Fullstack Web Development?
        </h1>
        <h2 className="font-semibold">Check out this website</h2>
        <button className=" flex items-center justify-center p-4 bg-green-600 rounded-full">
          Fullstack from begginer to advance
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-5  p-4 md:w-[50%]">
        <img src="https://codingbytes.com/wp-content/uploads/2022/03/full-stack-web-development.jpg" />
      </div>
    </div>
  );
};

export default CallToAction;
