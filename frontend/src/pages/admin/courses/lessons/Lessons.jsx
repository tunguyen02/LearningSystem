import { Button, message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";

const Lessons = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourse(response.data.data);

        const responseLessons = await axios.get(
          `http://localhost:8080/api/v1/lessons/all?courseId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLessons(responseLessons.data.data);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch course details");
      }
    };
    fetchCourse();
  }, [id]);

  const handleViewDetails = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedLesson(null);
  };

  const handleDeleteLesson = (lesson) => {
    setLessonToDelete(lesson);
    setDeleteModalVisible(true);
  };

  const confirmDeleteLesson = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/lessons/${lessonToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success("Lesson deleted successfully");
      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson._id !== lessonToDelete._id)
      );
      setDeleteModalVisible(false);
      setLessonToDelete(null);
    } catch (error) {
      console.error(error);
      message.error("Failed to delete lesson");
    }
  };

  return (
    <div className="flex flex-col items-center px-6 md:px-10">
      <h1 className="mt-5 mb-8 text-gray-800 font-semibold text-3xl md:text-4xl">
        Lessons for Course: {course?.name}
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {lessons.length ? (
          lessons.map((lesson) => (
            <li
              key={lesson._id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Lesson {lesson.order}: {lesson.title}
              </h2>
              <div className="flex justify-around">
                <Button
                  type="link"
                  className="text-green-500 hover:!text-green-700 mt-3"
                  onClick={() => handleViewDetails(lesson)}
                >
                  View Details
                </Button>
                <Button
                  type="link"
                  className="text-blue-500 hover:!text-blue-700 mt-3"
                  onClick={() =>
                    navigate(
                      `/admin/courses/${id}/lessons/update/${lesson._id}`
                    )
                  }
                >
                  Edit Lesson
                </Button>
                <Button
                  type="link"
                  danger
                  className="text-red-500 hover:!text-red-700 mt-3"
                  onClick={() => handleDeleteLesson(lesson)}
                >
                  Delete Lesson
                </Button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No lessons available</p>
        )}
      </ul>

      <div className="w-full flex justify-center mt-10">
        <Button
          className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          size="large"
          icon={<CiCirclePlus size={20} />}
          type="primary"
          onClick={() => navigate(`/admin/courses/${id}/lessons/create`)}
        >
          Create New Lesson
        </Button>
      </div>

      <Modal
        title={
          <h2 className="text-2xl font-semibold text-blue-600">
            Lesson Details: {selectedLesson?.title}
          </h2>
        }
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedLesson ? (
          <div className="space-y-4">
            <p className="text-lg">
              <strong className="text-gray-700">Order:</strong>{" "}
              {selectedLesson.order}
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Title:</strong>{" "}
              {selectedLesson.title}
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Content:</strong>{" "}
              {selectedLesson.content}
            </p>
            <div className="text-lg">
              <strong className="text-gray-700">Videos:</strong>
              <ul className="list-disc list-inside mt-2 space-y-2">
                {selectedLesson.videos.map((video, index) => (
                  <li key={index} className="pl-2">
                    <span className="text-blue-500 font-medium">
                      {video.title ? `${video.title}: ` : ""}
                    </span>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {video.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={confirmDeleteLesson}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this lesson?</p>
      </Modal>
    </div>
  );
};

export default Lessons;
