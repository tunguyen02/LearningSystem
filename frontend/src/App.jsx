import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Admin from "./layout/Admin";
import Courses from "./pages/admin/Courses/Courses";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="courses" element={<Courses />} />
      </Route>
    </Routes>
  );
};

export default App;
