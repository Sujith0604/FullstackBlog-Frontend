import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return currentUser ? <Outlet /> : navigate("/login");
};

export default PrivateRoute;
