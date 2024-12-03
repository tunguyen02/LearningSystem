import { Button, Input, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisited, setIsVisited] = useState(false);
  const [dataDetails, setDataDetails] = useState({});

  const handleClickDetails = (data) => {
    setDataDetails(data);
    setIsVisited(true);
  };

  const closeModal = () => {
    setIsVisited(false);
    setDataDetails({});
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://learningsystem-xwsq.onrender.com/api/v1/users");
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (e) {
        console.error("Failed to fetch users:", e);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 px-2">
      <h1 className="text-3xl text-gray-600 font-semibold">Users</h1>
      <div className="flex items-center justify-between">
        <form>
          <Input
            size="large"
            placeholder="Search by name..."
            className="w-64"
            prefix={<CiSearch size={20} />}
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{user.name}</td>
              <td className="text-center">{user.email}</td>
              <td className="text-center">
                <Button
                  className="border-none"
                  icon={<IoEyeOutline size={20} />}
                  onClick={() => handleClickDetails(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={isVisited}
        onCancel={closeModal}
        footer={
          <Button
            size="large"
            onClick={closeModal}
            className="bg-blue-500 text-white"
          >
            Close
          </Button>
        }
        centered
        width={600}
      >
        <div className="rounded-lg">
          <h1 className="text-3xl text-gray-700 font-semibold">User Details</h1>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4">
              <h1 className="text-lg text-gray-600 font-semibold">Name:</h1>
              <p className="text-lg text-gray-700">{dataDetails.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-lg text-gray-600 font-semibold">Email:</h1>
              <p className="text-lg text-gray-700">{dataDetails.email}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
