import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppLayout = () => {
  return (
    <div className=" flex flex-col gap-10">
      <Header />
      <main className="mt-[100px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
