import { Button, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { IoCreateOutline, IoEyeOutline, IoTrashOutline } from "react-icons/io5";

const Users = () => {
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
          <tr className="border-b border-gray-300">
            <td className="text-center">1</td>
            <td className="text-center">Lê Minh Tú</td>
            <td className="text-center">leminhtu13082003@gmail.com</td>
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
          <tr className="border-b border-gray-300">
            <td className="text-center">1</td>
            <td className="text-center">Full Stack</td>
            <td className="text-center">leminhtu13082003@gmail.com</td>
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
        </tbody>
      </table>
    </div>
  );
};

export default Users;
