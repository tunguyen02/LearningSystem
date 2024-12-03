import { Button, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";

const CourseOrder = () => {
  const [courseOrders, setCourseOrders] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchCourse, setSearchCourse] = useState("");

  const fetchCourseOrders = async () => {
    try {
      const response = await axios.get(
        "https://learningsystem-xwsq.onrender.com/api/v1/registrations",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCourseOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching course orders:", error);
    }
  };

  useEffect(() => {
    fetchCourseOrders();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `https://learningsystem-xwsq.onrender.com/api/v1/registrations/${id}`,
        {
          status: "approved",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Registration approved successfully");
      fetchCourseOrders();
    } catch (error) {
      console.error("Error approving course order:", error);
      message.error("Registration approval failed");
    }
  };

  const handleCancelled = async (id) => {
    try {
      await axios.put(
        `https://learningsystem-xwsq.onrender.com/api/v1/registrations/${id}`,
        {
          status: "cancelled",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Registration cancelled successfully");
      fetchCourseOrders();
    } catch (error) {
      console.error("Error approving course order:", error);
      message.error("Registration cancellation failed");
    }
  };

  const filteredCourseOrders = courseOrders.filter((courseOrder) => {
    const userName = courseOrder?.userId?.name.toLowerCase() || "";
    const courseName = courseOrder?.courseId?.name.toLowerCase() || "";
    return (
      userName.includes(searchUser.toLowerCase()) &&
      courseName.includes(searchCourse.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-5 px-4">
      <h1 className="text-3xl text-gray-800 font-semibold">Course Order</h1>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by User Name..."
          size="large"
          className="w-64"
          prefix={<CiSearch size={20} />}
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />

        <Input
          placeholder="Search by Course Name..."
          size="large"
          className="w-64"
          prefix={<CiSearch size={20} />}
          value={searchCourse}
          onChange={(e) => setSearchCourse(e.target.value)}
        />
      </div>
      <table className="min-w-full border-collapse">
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
          {filteredCourseOrders.map((courseOrder, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="py-3 px-4 text-center">{index + 1}</td>
              <td className="py-3 px-4 text-center">
                {courseOrder?.userId?.name}
              </td>
              <td className="py-3 px-4 text-center">
                {courseOrder?.courseId?.name}
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`px-5 py-1 rounded-full 
                  ${courseOrder?.status === "pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : courseOrder?.status === "approved"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                >
                  {courseOrder?.status}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                {courseOrder?.status === "pending" ? (
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => handleApprove(courseOrder?._id)}
                      icon={<IoCheckmarkOutline size={20} />}
                      style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                      className="border-none"
                    ></Button>
                    <Button
                      onClick={() => handleCancelled(courseOrder?._id)}
                      icon={<IoCloseOutline size={20} />}
                      style={{ backgroundColor: "#f44336", color: "#fff" }}
                      className="border-none"
                    ></Button>
                  </div>
                ) : courseOrder?.status === "approved" ? (
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
