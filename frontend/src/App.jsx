import {Navigate,Route,Routes} from "react-router-dom";
import "./App.css";
import User from "./layout/User";
import Courses from "./pages/user/courses/Courses.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/user" element={<User />}>
                <Route path="courses" element={<Courses />} />
            </Route>

            <Route path="/" element={<Navigate to="/user" />} />
        </Routes>
    );
    };

export default App;