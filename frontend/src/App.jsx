import {Navigate,Route,Routes} from "react-router-dom";
import "./App.css";
import User from "./layout/User";
import Courses from "./pages/user/courses/Courses.jsx";
import DetailsCourses from "./pages/user/courses/DetailsCourses.jsx";
import CoursesLearn from "./pages/user/courses/CoursesLearn.jsx";
import Payment from "./pages/user/courses/Payment.jsx";

import Layout from "./pages/user/order/Layout";
import Approved from "./pages/user/order/Approved.jsx";
import Cancelled from "./pages/user/order/Cancelled.jsx";
import Pending from "./pages/user/order/Pending.jsx";

import PrivateRouter from "./pages/auth/PrivateRouter.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/user" element={<PrivateRouter ><User /> </PrivateRouter>}>
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:id" element={<DetailsCourses />} />
                <Route path="courses/:id/learn" element={<CoursesLearn />} />
                <Route path="courses/:id/payment" element={<Payment />} />
                <Route path="course-order" element={<Layout />}>
                    <Route path="" element={<Navigate to="approved" />} />
                    <Route path="approved" element={<Approved/>} />
                    <Route path="cancelled" element={<Cancelled/>} />
                    <Route path="pending" element={<Pending/>} />
                </Route>            
            </Route>

        </Routes>
    );
    };

export default App;