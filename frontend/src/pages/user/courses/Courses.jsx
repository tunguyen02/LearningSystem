import { useState } from "react";
import { Card, Typography, Input } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const mockCourses = [
  {
    name: "Web Development for Beginners",
    category: "Programming",
    level: "Beginner",
    price: 99,
    discountPrice: 49,
    image: "https://via.placeholder.com/150",
    description:
      "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
  },
  {
    name: "Advanced React",
    category: "Programming",
    level: "Advanced",
    price: 199,
    discountPrice: 149,
    image: "https://via.placeholder.com/150",
    description: "Master React and build advanced applications.",
  },
  {
    name: "Data Science with Python",
    category: "Data Science",
    level: "Intermediate",
    price: 149,
    discountPrice: 99,
    image: "https://via.placeholder.com/150",
    description: "Learn data analysis, machine learning, and more with Python.",
  },
  {
    name: "UI/UX Design Fundamentals",
    category: "Design",
    level: "Beginner",
    price: 120,
    discountPrice: 99,
    image: "https://via.placeholder.com/150",
    description:
      "Get started with UI/UX design and create user-centered designs.",
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const filteredCourses = mockCourses.filter((course) =>
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
            onClick={() => navigate("/user/courses/idCourses")}
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

export default Courses;
