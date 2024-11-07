import { Button } from "antd";
import { CiCirclePlus } from "react-icons/ci";

const Lessons = () => {
  return (
    <div className="flex flex-col items-center px-10">
      <h1 className="m-5 text-gray-700 font-semibold text-3xl">
        Lessons Khóa học
      </h1>

      <ul className="grid grid-cols-2 gap-6 w-full">
        {[...Array(6)].map((_, index) => (
          <li
            key={index}
            className="p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <span className="font-semibold text-gray-700">
              Bài {index + 1}: Tên của bài {index + 1}
            </span>
            <Button
              type="link"
              className="text-blue-500 hover:text-blue-700 mt-3"
            >
              View Details
            </Button>
          </li>
        ))}
      </ul>

      <div className="w-full flex justify-center mt-8">
        <Button
          className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700"
          size="large"
          icon={<CiCirclePlus size={20} />}
          type="primary"
        >
          Create Lesson
        </Button>
      </div>
    </div>
  );
};

export default Lessons;
