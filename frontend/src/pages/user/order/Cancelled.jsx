import { useEffect, useState } from "react";
import { Card, Typography, Input, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;
const Cancelled = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coursesCancelled, setCoursesCancelled] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const responseCoursesOrder = await axios.get(
          "http://localhost:8080/api/v1/courses/my-courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCoursesCancelled(responseCoursesOrder.data.data.cancelled);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }
    };

    fetchCourses();
  }, []);

  const navigate = useNavigate();

  const filteredCourses = coursesCancelled.filter((course) =>
    course?.courseId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <Title level={2} className="mb-5">
        Cancelled Courses
      </Title>
      <div className="mb-5">
        <Input.Search
          placeholder="Search by course name"
          allowClear
          onSearch={(value) => setSearchTerm(value)}
          onChange={(e) => setSearchTerm(e.target.value)}
          enterButton
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <Card
              onClick={() => navigate(`/user/courses/${course?.courseId?._id}`)}
              key={index}
              hoverable
              cover={
                <img
                  alt={course?.courseId?.name}
                  src={course?.courseId?.image}
                  className="w-full h-40 object-cover rounded-lg"
                />
              }
              className="shadow-lg"
            >
              <Title level={4}>{course?.courseId?.name}</Title>
              <Text className="text-sm text-gray-600">
                {course?.courseId?.category} - {course?.courseId?.level}
              </Text>
              <div className="mt-2">
                <Text strong className="text-lg">
                  $
                  {course?.courseId?.discountPrice
                    ? course?.courseId?.discountPrice
                    : course?.courseId?.price}
                </Text>
                {course?.courseId?.discountPrice && (
                  <Text className="ml-2 text-gray-500 line-through">
                    ${course?.courseId?.price}
                  </Text>
                )}
              </div>
              <Text className="text-sm text-gray-700 mt-2">
                {course?.courseId?.description}
              </Text>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center h-64">
            <Empty description="No courses available" />
          </div>
        )}
      </div>
    </div>
  );


};

export default Cancelled;