import { Button, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";

const CourseOrder = () => {
  const [courseOrders, setCourseOrders] = useState([]);
  useEffect(() => {
    const fetchCourseOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/registrations"
        );
        setCourseOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching course orders:", error);
      }
    };
    fetchCourseOrders();
  }, []);

  console.log(courseOrders);

  return (
    <div className="flex flex-col gap-5 px-4">
      <h1 className="text-3xl text-gray-800 font-semibold">Course Order</h1>
      <div className="flex items-center justify-between ">
        <form>
          <Input
            placeholder="Search..."
            size="large"
            className="w-64"
            prefix={<CiSearch size={20} />}
          />
        </form>
      </div>
      <table className="min-w-full border-collapse ">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              No.
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Name User
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Name Course
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {courseOrders.map((courseOrder, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="py-3 px-4 text-center">{index + 1}</td>
              <td className="py-3 px-4 text-center">
                {courseOrder.userId.name}
              </td>
              <td className="py-3 px-4 text-center">
                {courseOrder.courseId.name}
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`px-5 py-1 rounded-full 
                  ${
                    courseOrder.status === "pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : courseOrder.status === "approved"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {courseOrder.status}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {courseOrder.status === "pending" ? (
                  <div className="flex justify-center gap-3">
                    <Button
                      icon={<IoCheckmarkOutline size={20} />}
                      style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                      className="border-none"
                    ></Button>
                    <Button
                      icon={<IoCloseOutline size={20} />}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                      className="border-none"
                    ></Button>
                  </div>
                ) : courseOrder.status === "approved" ? (
                  <span className="text-green-700 font-semibold">Approved</span>
                ) : (
                  <span className="text-red-700 font-semibold">Cancelled</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseOrder;
