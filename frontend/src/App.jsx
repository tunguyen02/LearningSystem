import {Navigate,Route,Routes} from "react-router-dom";
import "./App.css";
import User from "./layout/User";
import Courses from "./pages/user/courses/Courses.jsx";
import DetailsCourses from "./pages/user/courses/DetailsCourses.jsx";
import CoursesLearn from "./pages/user/courses/CoursesLearn.jsx";
import Payment from "./pages/user/courses/Payment.jsx";
const App = () => {
    return (
        <Routes>
            <Route path="/user" element={<User />}>
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:id" element={<DetailsCourses />} />
                <Route path="courses/:id/learn" element={<CoursesLearn />} />
                <Route path="courses/:id/payment" element={<Payment />} />
            </Route>

            <Route path="/" element={<Navigate to="/user" />} />
        </Routes>
    );
    };

export default App;