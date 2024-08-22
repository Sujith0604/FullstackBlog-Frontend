import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tabUrl = query.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);
  return (
    <div>
      <aside className=" md:w-[200px] bg-green-500 min-h-screen">
        <ul>
          <li>
            <NavLink to={"/dashboard?tab=profile"}>
              {tab === "profile" ? (
                <p className=" bg-slate-400">
                  Profile{" "}
                  {currentUser.isAdmin ? <span>Admin</span> : <span>User</span>}
                </p>
              ) : (
                <p>Profile</p>
              )}
            </NavLink>
          </li>
          {currentUser.isAdmin && (
            <li>
              <NavLink to={"/dashboard?tab=posts"}>Post</NavLink>
            </li>
          )}
          <li>Logout</li>
        </ul>
      </aside>
    </div>
  );
};

export default DashSidebar;
