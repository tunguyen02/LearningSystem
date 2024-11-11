import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./layout/Admin";
import AdminCourses from "./pages/admin/Courses/Courses";
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

const App = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="course-order" element={<CourseOrder />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="users" element={<Users />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="courses/idkhoahoc/lessons" element={<Lessons />} />
        <Route
          path="courses/idkhoahoc/lessons/create"
          element={<CreateLesson />}
        />
      </Route>
      <Route path="/user" element={<User />}>
        <Route path="courses" element={<Courses />} />
        <Route path="courses/idCourses" element={<DetailsCourses />} />
        <Route path="courses/idCourses/learn" element={<CoursesLearn />} />
      </Route>
    </Routes>
  );
};

export default App;
