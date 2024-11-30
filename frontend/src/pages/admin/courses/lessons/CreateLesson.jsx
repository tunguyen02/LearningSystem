import { Button, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

// Validation schema with Yup
const schema = Yup.object().shape({
  order: Yup.number()
    .required("Order is required")
    .positive("Order must be positive"),
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  videos: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Video title is required"),
        url: Yup.string().required("Video URL is required").url("Invalid URL"),
      })
    )
    .min(1, "At least one video is required"),
});

const CreateLesson = () => {
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      courseId: id,
      order: null,
      title: "",
      content: "",
      videos: [{ title: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const dataSubmit = {
        courseId: id,
        order: data.order,
        title: data.title,
        content: data.content,
        videos: data.videos,
      };
      await axios.post(
        "http://localhost:8080/api/v1/lessons/create",
        dataSubmit,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Lesson created successfully");
      reset();
    } catch (err) {
      console.error(err);
      message.error("Failed to create lesson");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center md:text-4xl">
        Create New Lesson
      </h1>
      <form
        className="grid grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Course ID */}
        <div className="flex flex-col gap-1">
          <label htmlFor="courseId" className="text-gray-700 font-medium">
            Course ID
          </label>
          <Input
            value={id}
            disabled
            type="text"
            id="courseId"
            name="courseId"
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
          <Controller
            name="order"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                id="order"
                placeholder="Enter Order"
                size="large"
                required
              />
            )}
          />
          {errors.order && (
            <p className="text-red-500 text-sm">{errors.order.message}</p>
          )}
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-gray-700 font-medium">
            Lesson Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                id="title"
                placeholder="Enter Lesson Title"
                size="large"
                required
              />
            )}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col col-span-2">
          <label htmlFor="content" className="text-gray-700 font-medium">
            Content
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                id="content"
                placeholder="Enter Lesson Content"
                size="large"
                rows="4"
                required
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        {/* Videos */}
        <div className="col-span-2">
          <label className="text-gray-700 font-medium">Videos</label>
          {fields.map((video, index) => (
            <div key={video.id} className="flex gap-4 mb-4">
              <Controller
                name={`videos[${index}].title`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Video Title"
                    size="large"
                    required
                  />
                )}
              />
              <Controller
                name={`videos[${index}].url`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Video URL"
                    size="large"
                    required
                  />
                )}
              />
              <Button danger type="dashed" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          {errors.videos && (
            <p className="text-red-500 text-sm">
              {errors.videos.message || "Invalid video input"}
            </p>
          )}
          <Button
            type="dashed"
            onClick={() => append({ title: "", url: "" })}
            className="w-full"
          >
            Add Video
          </Button>
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <div className="flex gap-10">
            <Button
              onClick={() => navigate(`/admin/courses/${id}/lessons`)}
              size="large"
              className="w-full"
            >
              Back
            </Button>
            <Button
              size="large"
              type="primary"
              className="w-full"
              htmlType="submit"
            >
              Create Lesson
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLesson;
