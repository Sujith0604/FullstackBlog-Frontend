import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppLayout = () => {
  return (
    <div className=" flex flex-col ">
      <Header />
      <main className="mt-[100px] min-h-screen flex ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
