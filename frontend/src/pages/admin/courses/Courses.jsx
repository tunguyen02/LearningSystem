import { Button, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IoCreateOutline, IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
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
          <tr className="border-b border-gray-300">
            <td className="text-center flex justify-center">
              <img
                className="w-32 h-20 rounded-md object-cover"
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
              />
            </td>
            <td className="text-center">1</td>
            <td className="text-center">Full Stack</td>
            <td className="text-center">Category</td>
            <td className="text-center">Level</td>
            <td className="text-center">Price</td>
            <td className="text-center">Discount Price</td>
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
            <td className="text-center flex justify-center">
              <img
                className="w-32 h-20 rounded-md object-cover"
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt=""
              />
            </td>
            <td className="text-center">1</td>
            <td className="text-center">Full Stack</td>
            <td className="text-center">Category</td>
            <td className="text-center">Level</td>
            <td className="text-center">Price</td>
            <td className="text-center">Discount Price</td>
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

export default Courses;
