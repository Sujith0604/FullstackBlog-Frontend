import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "./Pages/LoadingPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const Register = lazy(() => import("./Authentication/Register"));
const Login = lazy(() => import("./Authentication/Login"));
const UpdateBlog = lazy(() => import("./Pages/updateBlog"));
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

          <Route element={<AdminRoute />}>
            <Route path="/addblog" element={<AddBlog />} />
          </Route>
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/updateblog/:id" element={<UpdateBlog />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
