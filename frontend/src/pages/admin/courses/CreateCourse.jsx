import { Button, Input } from "antd";

const CreateCourse = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-700 mb-8 text-center">
        Create New Course
      </h1>
      <form className="flex gap-10">
        {/* Form thông tin khóa học */}
        <div className="grid grid-cols-2 gap-6 w-full">
          {/* Tên khóa học */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-800" htmlFor="name">
              Course Name<span className="text-red-500">*</span>:
            </label>
            <Input size="large" placeholder="Enter course name" />
          </div>

          {/* Thể loại */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-800" htmlFor="category">
              Category<span className="text-red-500">*</span>:
            </label>
            <Input size="large" placeholder="Enter category" />
          </div>

          {/* Cấp độ */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-800" htmlFor="level">
              Level<span className="text-red-500">*</span>:
            </label>
            <Input size="large" placeholder="Enter level" />
          </div>

          {/* Giá khóa học */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-800" htmlFor="price">
              Price<span className="text-red-500">*</span>:
            </label>
            <Input size="large" placeholder="Enter price" />
          </div>

          {/* Giá giảm */}
          <div className="flex flex-col gap-1">
            <label
              className="font-semibold text-gray-800"
              htmlFor="discountPrice"
            >
              Discount Price<span className="text-red-500">*</span>:
            </label>
            <Input size="large" placeholder="Enter discount price" />
          </div>

          {/* Mô tả khóa học */}
          <div className="flex flex-col gap-1 col-span-2">
            <label
              className="font-semibold text-gray-800"
              htmlFor="description"
            >
              Description<span className="text-red-500">*</span>:
            </label>
            <Input.TextArea
              size="large"
              rows={4}
              placeholder="Enter description"
            />
          </div>
        </div>

        {/* Phần ảnh và nút */}
        <div className="flex flex-col justify-between items-center">
          {/* Placeholder cho ảnh */}
          <div className="w-64 h-40 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Course Image</span>
          </div>
          {/* Nút hành động */}
          <div className="flex gap-4 mt-6">
            <Button type="primary" danger size="large">
              Cancel
            </Button>
            <Button type="primary" size="large">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
