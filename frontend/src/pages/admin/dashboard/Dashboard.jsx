import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  IoPersonAdd,
  IoCart,
  IoNotifications,
  IoSchool,
} from "react-icons/io5";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, coursesRes, ordersRes, recentActivities] =
          await Promise.all([
            axios.get("https://learningsystem-xwsq.onrender.com/api/v1/users"),
            axios.get("https://learningsystem-xwsq.onrender.com/api/v1/courses"),
            axios.get("https://learningsystem-xwsq.onrender.com/api/v1/registrations", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
            axios.get("https://learningsystem-xwsq.onrender.com/api/v1/courses/daily-stats", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
          ]);

        setDataNew(recentActivities.data.data);

        const totalUsers = usersRes.data.data.length;
        const totalCourses = coursesRes.data.data.courses.length;
        const totalPendingOrders = ordersRes.data.data.filter(
          (order) => order.status === "pending"
        ).length;

        setData([
          {
            title: "Total Courses",
            value: totalCourses,
            color: "#4299E1",
            icon: <IoSchool size={32} color="#4299E1" />,
          },
          {
            title: "Total Users",
            value: totalUsers,
            color: "#48BB78",
            icon: <IoPersonAdd size={32} color="#48BB78" />,
          },
          {
            title: "Pending Orders",
            value: totalPendingOrders,
            color: "#ECC94B",
            icon: <IoCart size={32} color="#ECC94B" />,
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Loading Dashboard...
        </h1>
        <p className="text-gray-600">
          Please wait while data is being fetched.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Error</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4`}
            style={{ backgroundColor: item.color + "20" }}
          >
            <div>{item.icon}</div>
            <div>
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p
                className="text-3xl font-semibold"
                style={{ color: item.color }}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Over Time */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-medium text-gray-600">Data Overview</h3>
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4299E1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium text-gray-600">Recent Activities</h3>
        <ul className="mt-4 space-y-3">
          <li className="flex items-center gap-4">
            <IoNotifications size={24} color="#4299E1" />
            <span>{dataNew?.newUsersCount} new users registered today</span>
          </li>
          <li className="flex items-center gap-4">
            <IoCart size={24} color="#48BB78" />
            <span>{dataNew?.newOrdersCount} new orders placed</span>
          </li>
          <li className="flex items-center gap-4">
            <IoSchool size={24} color="#ECC94B" />
            <span>{dataNew.newCoursesCount} new courses added</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
