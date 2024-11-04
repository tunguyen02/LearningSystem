import { Button, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

const Courses = () => {
  return (
    <div className="flex flex-col gap-4 px-2">
      <h1 className="text-3xl text-gray-600 font-semibold">Courses</h1>
      <div className="flex items-center justify-between">
        <form>
          <Input
            placeholder="Search..."
            className="w-64"
            prefix={<CiSearch size={20} />}
          />
        </form>
        <Button type="primary" icon={<CiCirclePlus size={20} />}>
          Create Course
        </Button>
      </div>
    </div>
  );
};

export default Courses;
