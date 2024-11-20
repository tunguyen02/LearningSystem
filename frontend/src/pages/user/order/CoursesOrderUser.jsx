import { useEffect, useState } from "react";
import { Card, Typography, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;
const CoursesOrderUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/courses"
        );
        setCourses(response.data.data.courses);
        const responseCoursesOrder = await axios.get(
          "http://localhost:8080/api/v1/courses/my-courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(responseCoursesOrder.data.data);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }
    };

    fetchCourses();
  }, []);

  const navigate = useNavigate();

  const filteredCourses = Courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <Title level={2} className="mb-5">
        Our Courses
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
        {filteredCourses.map((course, index) => (
          <Card
            onClick={() => navigate(`/user/courses/${course._id}`)}
            key={index}
            hoverable
            cover={
              <img
                alt={course.name}
                src={course.image}
                className="w-full h-40 object-cover rounded-lg"
              />
            }
            className="shadow-lg"
          >
            <Title level={4}>{course.name}</Title>
            <Text className="text-sm text-gray-600">
              {course.category} - {course.level}
            </Text>
            <div className="mt-2">
              <Text strong className="text-lg">
                ${course.discountPrice ? course.discountPrice : course.price}
              </Text>
              {course.discountPrice && (
                <Text className="ml-2 text-gray-500 line-through">
                  ${course.price}
                </Text>
              )}
            </div>
            <Text className="text-sm text-gray-700 mt-2">
              {course.description}
            </Text>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesOrderUser;
