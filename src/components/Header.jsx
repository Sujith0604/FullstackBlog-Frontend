import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { logoutSuccess } from "../slices/userSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post("/user/logout");
      console.log(res);
      const data = await res.data;
      if (!res.statusText === "OK") {
        console.log("Error logging out");
      }
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  const components = () => {
    return (
      <ul className="flex flex-col gap-5 px-5 py-5 font-semibold transition-all ease-in duration-500">
        <NavLink to="/">
          <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer">
            HOME
          </li>
        </NavLink>

        <NavLink to="/blog">
          <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer">
            BLOG
          </li>
        </NavLink>

        <NavLink to="/addblog">
          <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer transition">
            CREATE
          </li>
        </NavLink>
        <NavLink to="/myblog">
          <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer">
            MY-BLOGS
          </li>
        </NavLink>
        {currentUser ? (
          <>
            <NavLink to="/dashboard">
              <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer transition">
                DASHBOARD
              </li>
            </NavLink>
            <img
              className=" h-[50px] rounded-full "
              src={currentUser.profileImage}
            />
            <NavLink to={"/dashboard?tab=profile"}>Profile</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login">
            <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer transition">
              LOGIN
            </li>
          </NavLink>
        )}
      </ul>
    );
  };

  return (
    <header className="z-10 fixed w-[100%] bg-slate-200">
      <nav className=" flex h-[100px] items-center justify-between px-5">
        <section className=" font-bold text-xl">
          <NavLink to="/">BLOG WESITE</NavLink>
        </section>
        <section className="hidden md:flex">
          <ul className=" flex gap-5 font-semibold">
            <NavLink to="/">
              <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer transition">
                HOME
              </li>
            </NavLink>
            <NavLink to="/blog">
              <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer transition">
                BLOG
              </li>
            </NavLink>

            <NavLink to="/addblog">
              <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer transition">
                CREATE
              </li>
            </NavLink>

            {currentUser ? (
              <>
                <NavLink to="/dashboard">
                  <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer transition">
                    DASHBOARD
                  </li>
                </NavLink>
                <img
                  className=" h-[50px] rounded-full "
                  src={currentUser.profileImage}
                />
                <NavLink to={"/dashboard?tab=profile"}>Profile</NavLink>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <NavLink to="/login">
                <li className="text-gray-800 hover:text-blue-400 duration-500 hover:cursor-pointer transition">
                  LOGIN
                </li>
              </NavLink>
            )}
          </ul>
        </section>
        <section className="md:hidden transition">
          {isOpen ? (
            <button onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
          ) : (
            <button onClick={() => setIsOpen(true)}>
              <MenuIcon />
            </button>
          )}
        </section>
      </nav>
      <section className=" md:hidden">{isOpen && components()}</section>
    </header>
  );
};

export default Header;
