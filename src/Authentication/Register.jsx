import axios from "../utils/axios";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const Register = () => {
  const nameRef = useRef();
  const emaiRef = useRef();
  const passwordRef = useRef();
  const [errormsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = nameRef.current.value.trim();
    const email = emaiRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    try {
      setIsLoading(true);
      setErrorMsg("");
      if (!username || !email || !password) {
        setErrorMsg("Please fill all the fields");
        return;
      }
      const res = await axios.post("/user", {
        username,
        email,
        password,
      });
      const data = res.data;
      console.log("Data:", data);
      if (!res.statusText === "OK") {
        setErrorMsg("Invalid email or password");
        return;
      }
      setIsLoading(false);
      nameRef.current.value = "";
      emaiRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className=" bg-blue-300 w-[100%] h-screen flex items-center justify-center">
      <div className="md:w-[50%] px-4 flex flex-col gap-5">
        <h1 className=" text-5xl font-bold">Blog website</h1>
        <p className=" text-xl font-thin">
          This is sample website to add new blog an explore it.
        </p>
      </div>
      <div className="flex items-center justify-center md:w-[50%] px-2">
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
              {isLoading ? "Loading" : "Register"}
            </button>
            <OAuth />
          </form>
          <div className="flex justify-center gap-2">
            <p>Already have an account?</p>
            <NavLink to="/login">Login</NavLink>
          </div>
          {errormsg && <p className=" bg-red-400">{errormsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
