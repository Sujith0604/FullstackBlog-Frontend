import { useRef } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const nameRef = useRef();
  const emaiRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className=" bg-blue-300 w-[100%] h-screen flex items-center justify-center">
      <div className=" bg-white flex flex-col gap-5 p-4 rounded-md">
        <div className=" flex flex-col gap-5">
          <div className=" font-bold text-xl">LOGO</div>
          <div className=" flex flex-col gap-2">
            <h2 className=" text-xl font-semibold">Register now!</h2>
            <p>Please enter your name, email and password to register.</p>
          </div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-2">
            <label>Username</label>
            <input
              className=" p-2 border rounded-md"
              type="text"
              ref={nameRef}
              placeholder="Enter your name"
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label>Email</label>
            <input
              className=" p-2 border rounded-md"
              type="email"
              ref={emaiRef}
              placeholder="Enter your Email"
            />
          </div>

          <div className=" flex flex-col gap-2">
            <label>Password:</label>
            <input
              className=" p-2 border rounded-md"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
            />
          </div>

          <button className=" bg-blue-400 p-2 rounded-md" type="submit">
            Sign up
          </button>
        </form>
        <div className="flex justify-center gap-2">
          <p>Already have an account?</p>
          <NavLink to="#">Login</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
