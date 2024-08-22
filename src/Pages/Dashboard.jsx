import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPost from "../components/DashPost";

const Dashboard = () => {
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
    <div className=" flex flex-row">
      <div>
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPost />}
    </div>
  );
};

export default Dashboard;
