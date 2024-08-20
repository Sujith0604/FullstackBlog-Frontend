import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "./Pages/LoadingPage";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Myblogs = lazy(() => import("./Pages/Myblogs"));
const Register = lazy(() => import("./Authentication/Register"));
const Login = lazy(() => import("./Authentication/Login"));
const UpdateBlog = lazy(() => import("./Pages/updateBlog"));
const Blog = lazy(() => import("./Pages/Blog"));
const AddBlog = lazy(() => import("./Pages/AddBlog"));
const AppLayout = lazy(() => import("./AppLayout"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const Home = lazy(() => import("./Pages/Home"));

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/myblog" element={<Myblogs />} />
          <Route path="/updateblog/:id" element={<UpdateBlog />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
