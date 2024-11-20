import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./layout/Admin";
import AdminCourses from "./pages/admin/courses/Courses";
import "./App.css";
import Users from "./pages/admin/users/Users";
import CreateCourse from "./pages/admin/courses/CreateCourse";
import Lessons from "./pages/admin/courses/lessons/Lessons";
import CreateLesson from "./pages/admin/courses/lessons/CreateLesson";
import CourseOrder from "./pages/admin/order/CourseOrder";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import User from "./layout/User";
import Courses from "./pages/user/courses/Courses";
import DetailsCourses from "./pages/user/courses/DetailsCourses";
import CoursesLearn from "./pages/user/courses/CoursesLearn";
import Payment from "./pages/user/courses/Payment";
import PrivateRouter from "./pages/auth/PrivateRouter";
import UpdateCourse from "./pages/admin/courses/UpdateCourse";
import Layout from "./pages/user/order/Layout";
import Approved from "./pages/user/order/Approved";
import Cancelled from "./pages/user/order/Cancelled";
import Pending from "./pages/user/order/Pending";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <PrivateRouter>
            <Admin />
          </PrivateRouter>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="course-order" element={<CourseOrder />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="users" element={<Users />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="courses/update/:id" element={<UpdateCourse />} />
        <Route path="courses/:id/lessons" element={<Lessons />} />
        <Route path="courses/:id/lessons/create" element={<CreateLesson />} />
      </Route>
      <Route
        path="/user"
        element={
          <PrivateRouter>
            <User />
          </PrivateRouter>
        }
      >
        <Route path="courses" element={<Courses />} />
        <Route path="course-order" element={<Layout />}>
          <Route path="" element={<Navigate to="approved" />} />
          <Route path="approved" element={<Approved />} />
          <Route path="cancelled" element={<Cancelled />} />
          <Route path="pending" element={<Pending />} />
        </Route>
        <Route path="courses/:id" element={<DetailsCourses />} />
        <Route path="courses/payment/:id" element={<Payment />} />
        <Route path="courses/:id/learn" element={<CoursesLearn />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;
