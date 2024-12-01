import { useEffect, useState } from "react";
import { Card, Typography, Input, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBook } from "react-icons/fa";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://learningsystem-xwsq.onrender.com/api/v1/courses"
        );
        setCourses(response.data.data.courses);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorizedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {});

  return (
    <Layout>
      {/* Header */}
      <Header className="header">
        <div className="header-content">
          <Title level={1} className="text-white">
            <span className="text-white">Welcome to Learning</span>
          </Title>
          <Text className="text-white text-lg">
            Explore a variety of courses to boost your skills!
          </Text>
          <Input.Search
            className="search-bar mt-4"
            placeholder="Search for courses..."
            allowClear
            size="large"
            onSearch={(value) => setSearchTerm(value)}
            onChange={(e) => setSearchTerm(e.target.value)}
            enterButton="Search"
          />
        </div>
      </Header>

      <Content className="p-5">
        {/* Top Categories Section */}
        <div className="top-categories mb-8 mt-2">
          <Title level={2} className="mb-4">
            Top Categories
          </Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Object.entries(categorizedCourses).map(([category, courses]) => (
              <div
                key={category}
                className="category-card p-4 border border-gray-300 rounded-lg shadow-md flex flex-col items-center justify-center"
              >
                <div className="category-icon text-4xl mb-3 text-indigo-600">
                  <FaBook />
                </div>
                <div className="category-name text-center text-lg font-semibold capitalize mb-2">
                  {category}
                </div>
                <div className="category-count text-center text-sm text-gray-600">
                  {courses.length} {courses.length === 1 ? "course" : "courses"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses by Category Section */}
        <Title level={2} className="mb-4">
          Courses
        </Title>
        {Object.entries(categorizedCourses).map(([category, courses]) => (
          <div key={category} id={category} className="category-section mb-10">
            <Title level={3} className="mb-4 capitalize">
              {category}
            </Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {courses.slice(0, 3).map((course) => (
                <Card
                  onClick={() => navigate(`/user/courses/${course._id}`)}
                  key={course._id}
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
                      $
                      {course.discountPrice
                        ? course.discountPrice
                        : course.price}
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
        ))}
      </Content>
    </Layout>
  );
};

export default Home;
