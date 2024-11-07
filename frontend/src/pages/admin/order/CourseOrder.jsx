import { Button, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5"; // Thêm icon cho chấp nhận và không chấp nhận

const CourseOrder = () => {
  return (
    <div className="flex flex-col gap-4 px-2">
      <h1 className="text-3xl text-gray-600 font-semibold">Course Order</h1>
      <div className="flex items-center justify-between">
        <form>
          <Input
            placeholder="Search..."
            size="large"
            className="w-64"
            prefix={<CiSearch size={20} />}
          />
        </form>
      </div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">ID Course</th>
            <th className="text-center">Name User</th>
            <th className="text-center">Name Course</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="text-center">1</td>
            <td className="text-center">2213205</td>
            <td className="text-center">Lê Tú</td>
            <td className="text-center">Full Stack</td>
            <td className="text-center">
              <span className="px-5 py-1 bg-yellow-200 text-yellow-700 rounded-full">
                Pending
              </span>
            </td>

            <td className="text-center flex justify-center gap-2">
              <Button
                className="border-none"
                icon={<IoCheckmarkOutline size={20} />}
                style={{ backgroundColor: "#4CAF50", color: "#fff" }}
              />
              <Button
                className="border-none"
                icon={<IoCloseOutline size={20} />}
                style={{ backgroundColor: "#f44336", color: "#fff" }}
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center">2</td>
            <td className="text-center">2222222</td>
            <td className="text-center">Lê Minh Tú</td>
            <td className="text-center">Full Stack</td>
            <td className="text-center">
              <span className="px-5 py-1 bg-green-200 text-green-700 rounded-full">
                Approved
              </span>
            </td>
            <td className="text-center flex justify-center gap-2">
              <Button
                disabled
                className="border-none"
                icon={<IoCheckmarkOutline size={20} />}
                style={{ backgroundColor: "#4CAF50", color: "#fff" }}
              />
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center">3</td>
            <td className="text-center">3333333</td>
            <td className="text-center">Nguyễn Tú</td>
            <td className="text-center">Frontend Development</td>
            <td className="text-center">
              <span className="px-5 py-1 bg-red-200 text-red-700 rounded-full">
                Cancelled
              </span>
            </td>
            <td className="text-center flex justify-center gap-2">
              <Button
                disabled
                className="border-none"
                icon={<IoCloseOutline size={20} />}
                style={{ backgroundColor: "#f44336", color: "#fff" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CourseOrder;
