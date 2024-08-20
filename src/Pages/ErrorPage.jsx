import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className=" flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-red-500">OOPS! Error 404</h1>
      <p className="text-3xl">Page not found</p>
      <NavLink to="/">
        <button className="text-xl px-4 py-2 text-red-500 border ">
          Back to Home
        </button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
