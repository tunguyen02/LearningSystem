import { Button, Input, Upload, Image, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Course name is required"),
  category: yup.string().required("Category is required"),
  level: yup.string().required("Level is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  discountPrice: yup
    .number()
    .typeError("Discount price must be a number")
    .required("Discount price is required"),
  description: yup.string().required("Description is required"),
});

const CreateCourse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [imageFile, setImageFile] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("level", data.level);
      formData.append("price", data.price);
      formData.append("discountPrice", data.discountPrice);
      formData.append("description", data.description);
      formData.append("image", imageFile);

      const response = await axios.post(
        "https://learningsystem-xwsq.onrender.com/api/v1/courses",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      message.success("Successfully created course!");

      navigate(`/admin/courses/${response.data.data._id}/lessons`);
    } catch (e) {
      console.error(e);
      message.error(e.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status !== "uploading") {
      setImageFile(info.file);
      setIsImageUploaded(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-700 mb-8 text-center">
        Create New Course
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-10">
        <div className="grid grid-cols-2 gap-6 w-full">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-800">
                  Course Name<span className="text-red-500">*</span>:
                </label>
                <Input
                  {...field}
                  size="large"
                  placeholder="Enter course name"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-800">
                  Category<span className="text-red-500">*</span>:
                </label>
                <Input {...field} size="large" placeholder="Enter category" />
                {errors.category && (
                  <span className="text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="level"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-800">
                  Level<span className="text-red-500">*</span>:
                </label>
                <Input {...field} size="large" placeholder="Enter level" />
                {errors.level && (
                  <span className="text-red-500">{errors.level.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="price"
            type="number"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-800">
                  Price<span className="text-red-500">*</span>:
                </label>
                <Input {...field} size="large" placeholder="Enter price" />
                {errors.price && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="discountPrice"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-gray-800">
                  Discount Price<span className="text-red-500">*</span>:
                </label>
                <Input
                  type="number"
                  {...field}
                  size="large"
                  placeholder="Enter discount price"
                />
                {errors.discountPrice && (
                  <span className="text-red-500">
                    {errors.discountPrice.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1 col-span-2">
                <label className="font-semibold text-gray-800">
                  Description<span className="text-red-500">*</span>:
                </label>
                <Input.TextArea
                  {...field}
                  size="large"
                  rows={4}
                  placeholder="Enter description"
                />
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <div className="flex flex-col justify-between items-center">
          {isImageUploaded ? (
            <div className="flex flex-col items-center">
              <Image
                width={256}
                height={160}
                src={URL.createObjectURL(imageFile)}
                alt="Course Image"
              />
              <Upload
                className="cursor-pointer"
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleImageChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />} className="mt-4">
                  Change Image
                </Button>
              </Upload>
            </div>
          ) : (
            <Upload
              className="cursor-pointer"
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleImageChange}
              showUploadList={false}
            >
              <div className="w-64 h-40 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100">
                <UploadOutlined style={{ fontSize: "100px", color: "gray" }} />
              </div>
            </Upload>
          )}
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}

          <div className="flex gap-4 mt-6">
            <Button
              onClick={() => navigate("/admin/courses")}
              type="primary"
              danger
              size="large"
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              size="large"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
