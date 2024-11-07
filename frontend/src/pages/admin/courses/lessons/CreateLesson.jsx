import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const CreateLesson = () => {
  const [formValues, setFormValues] = useState({
    courseId: "",
    order: "",
    title: "",
    content: "",
    videoTitle: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form values:", formValues);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create New Lesson
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Course ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="courseId" className="text-gray-700 font-medium">
            Course ID
          </label>
          <Input
            type="text"
            id="courseId"
            name="courseId"
            value={formValues.courseId}
            onChange={handleChange}
            placeholder="Enter Course ID"
            size="large"
            required
          />
        </div>

        {/* Order */}
        <div className="flex flex-col gap-1">
          <label htmlFor="order" className="text-gray-700 font-medium">
            Order
          </label>
          <Input
            type="number"
            id="order"
            name="order"
            value={formValues.order}
            onChange={handleChange}
            placeholder="Enter Order"
            size="large"
            required
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-gray-700 font-medium">
            Lesson Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            placeholder="Enter Lesson Title"
            size="large"
            required
          />
        </div>

        {/* Content */}
        <div className="flex flex-col col-span-2">
          <label htmlFor="content" className="text-gray-700 font-medium">
            Content
          </label>
          <TextArea
            id="content"
            name="content"
            value={formValues.content}
            onChange={handleChange}
            placeholder="Enter Lesson Content"
            size="large"
            rows="4"
            required
          ></TextArea>
        </div>

        {/* Video Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="videoTitle" className="text-gray-700 font-medium">
            Video Title
          </label>
          <Input
            type="text"
            id="videoTitle"
            name="videoTitle"
            value={formValues.videoTitle}
            onChange={handleChange}
            placeholder="Enter Video Title"
            size="large"
            required
          />
        </div>

        {/* Video URL */}
        <div className="flex flex-col gap-1">
          <label htmlFor="videoUrl" className="text-gray-700 font-medium">
            Video URL
          </label>
          <Input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formValues.videoUrl}
            onChange={handleChange}
            placeholder="Enter Video URL"
            size="large"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <Button size="large" type="primary" className="w-full">
            Create Lesson
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateLesson;
