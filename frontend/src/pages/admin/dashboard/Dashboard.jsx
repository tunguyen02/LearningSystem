import { IoPersonAdd, IoCart, IoNotifications } from "react-icons/io5";

const Dashboard = () => {
  const stats = [
    { title: "Total Courses", value: 120 },
    { title: "Total Users", value: 350 },
    { title: "Pending Orders", value: 25 },
    { title: "Active Subscriptions", value: 50 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-xl font-medium text-gray-600">{item.title}</h3>
            <p className="text-3xl font-semibold text-blue-600 mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-600">
            Orders Over Time
          </h3>
          <div className="h-64 bg-gray-200 mt-4 flex items-center justify-center text-gray-500">
            <p>Chart Here</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-medium text-gray-600">Recent Activity</h3>
        <div className="mt-4">
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <IoPersonAdd size={20} className="text-green-500" />
                <p className="text-gray-600">
                  New Course: Full Stack Development
                </p>
              </div>
              <span className="text-sm text-gray-500">Just now</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <IoPersonAdd size={20} className="text-blue-500" />
                <p className="text-gray-600">User Signed Up: Lê Tú</p>
              </div>
              <span className="text-sm text-gray-500">5 minutes ago</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <IoCart size={20} className="text-yellow-500" />
                <p className="text-gray-600">
                  Course Order Pending: Full Stack
                </p>
              </div>
              <span className="text-sm text-gray-500">10 minutes ago</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <IoNotifications size={20} className="text-red-500" />
                <p className="text-gray-600">User Subscription: Nguyễn Tú</p>
              </div>
              <span className="text-sm text-gray-500">30 minutes ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
