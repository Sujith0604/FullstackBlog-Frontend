import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

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
    </div>
  );
};

export default Dashboard;
