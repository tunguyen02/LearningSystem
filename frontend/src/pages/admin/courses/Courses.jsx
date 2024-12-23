import { Button, Input, message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://learningsystem-xwsq.onrender.com/api/v1/courses");
      setCourses(response.data.data.courses);
      setFilteredCourses(response.data.data.courses);
    } catch (e) {
      console.error("Failed to fetch courses:", e);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://learningsystem-xwsq.onrender.com/api/v1/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCourses();
      message.success("Course deleted successfully!");
    } catch (e) {
      console.error("Failed to delete course:", e);
      message.error("Failed to delete course!");
    }
  };

  const showDeleteConfirm = (id) => {
    setCourseIdToDelete(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (courseIdToDelete) {
      handleDelete(courseIdToDelete);
      setIsModalVisible(false);
      setCourseIdToDelete(null);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCourseIdToDelete(null);
  };

  return (
    <div className="flex flex-col gap-4 px-2">
      <h1 className="text-3xl text-gray-600 font-semibold">Courses</h1>
      <div className="flex items-center justify-between">
        <form>
          <Input
            size="large"
            placeholder="Search by name..."
            className="w-64"
            prefix={<CiSearch size={20} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredCourses.map((course, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="text-center flex justify-center">
                <img
                  className="w-32 h-20 rounded-md object-cover"
                  src={course.image}
                  alt=""
                />
              </td>
              <td className="text-center">{index + 1}</td>
              <td className="text-center max-w-[250px] truncate overflow-hidden whitespace-nowrap">
                {course.name}
              </td>
              <td className="text-center max-w-[250px] truncate overflow-hidden whitespace-nowrap">
                {course.category}
              </td>
              <td className="text-center">{course.level}</td>
              <td className="text-center">{course.price}</td>
              <td className="text-center">{course.discountPrice}</td>
              <td className="text-center">
                <Button
                  className="border-none"
                  icon={<IoCreateOutline size={20} />}
                  onClick={() =>
                    navigate(`/admin/courses/update/${course._id}`)
                  }
                />
                <Button
                  className="border-none"
                  icon={<IoTrashOutline size={20} />}
                  onClick={() => showDeleteConfirm(course._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for confirmation */}
      <Modal
        title="Delete Course"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this course?</p>
      </Modal>
    </div>
  );
};

export default Courses;
