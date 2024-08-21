import axios from "../utils/axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../slices/userSlice";
import OAuth from "../components/OAuth";

const Login = () => {
  const emaiRef = useRef();
  const passwordRef = useRef();

  const { error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emaiRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    try {
      dispatch(signInStart());
      if (!email || !password) {
        dispatch(signInFailure("Please fill all the fields"));
        return;
      }
      const res = await axios.post("/user/login", {
        email,
        password,
      });
      const data = res.data;

      if (!res.statusText === "OK") {
        dispatch(signInFailure("Invalid email or password"));
        return;
      }

      dispatch(signInSuccess(data));
      emaiRef.current.value = "";
      passwordRef.current.value = "";
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" bg-blue-300 w-[100%] s flex flex-col md:flex-row items-center justify-around ">
      <div className="md:w-[50%] px-4 flex flex-col gap-5">
        <h1 className=" text-5xl font-bold">Blog website</h1>
        <p className=" text-xl font-thin">
          This is sample website to add new blog an explore it.
        </p>
      </div>
      <div className=" flex items-center justify-center md:w-[50%] px-2">
        <div className="bg-white flex flex-col gap-5 p-4 rounded-md">
          <div className=" flex flex-col gap-5">
            <div className=" font-bold text-xl">LOGO</div>
            <div className=" flex flex-col gap-2">
              <h2 className=" text-xl font-semibold">Welcome back!</h2>
              <p>Please enter your email and password to login.</p>
            </div>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
              {loading ? "Loading..." : "Login"}
            </button>
            <OAuth />
          </form>

          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center gap-2">
            <p>Dont have an account?</p>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
