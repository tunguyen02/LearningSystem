import { Button, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IoCreateOutline, IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/courses"
        );
        setCourses(response.data.data.courses);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col gap-4 px-2">
      <h1 className="text-3xl text-gray-600 font-semibold">Courses</h1>
      <div className="flex items-center justify-between">
        <form>
          <Input
            size="large"
            placeholder="Search..."
            className="w-64"
            prefix={<CiSearch size={20} />}
          />
        </form>
        <Button
          size="large"
          onClick={() => navigate("/admin/courses/create")}
          type="primary"
          icon={<CiCirclePlus size={20} />}
        >
          Create Course
        </Button>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="text-center">Image</th>
            <th className="text-center">No.</th>
            <th className="text-center">Name</th>
            <th className="text-center">Category</th>
            <th className="text-center">Level</th>
            <th className="text-center">Price</th>
            <th className="text-center">Discount Price</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="text-center flex justify-center">
                <img
                  className="w-32 h-20 rounded-md object-cover"
                  src={course.image}
                  alt=""
                />
              </td>
              <td className="text-center">{index + 1}</td>
              <td className="text-center max-w-[250px] truncate overflow-hidden whitespace-nowrap">
                {course.name}
              </td>
              <td className="text-center max-w-[250px] truncate overflow-hidden whitespace-nowrap">
                {course.category}
              </td>
              <td className="text-center">{course.level}</td>
              <td className="text-center">{course.price}</td>
              <td className="text-center">{course.discountPrice}</td>
              <td className="text-center">
                <Button
                  className="border-none"
                  icon={<IoEyeOutline size={20} />}
                />
                <Button
                  className="border-none"
                  icon={<IoCreateOutline size={20} />}
                />
                <Button
                  className="border-none"
                  icon={<IoTrashOutline size={20} />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
