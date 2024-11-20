import { useEffect, useState } from "react";
import { Card, Typography, Input, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBook } from "react-icons/fa";

const { Title, Text } = Typography;
const { Header, Footer, Content } = Layout;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/courses"
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

      {/* Footer */}
      <Footer className="bg-gray-200 py-8 text-gray-800">
        <div className="container mx-auto flex flex-wrap justify-between space-y-8 sm:space-y-0 sm:flex-row">
          <div className="flex-1 space-y-4 sm:mr-12">
            <h2 className="text-3xl font-bold text-sky-400">Byway</h2>
            <p className="text-sm text-gray-600">
              LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
              This is one of the best WordPress LMS Plugins which can be used to
              easily create & sell courses online.
            </p>
          </div>

          <div className="flex-1 flex flex-col sm:mr-12">
            <h4 className="font-bold text-lg text-gray-800 mb-4">GET HELP</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-sky-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sky-400">
                  Latest Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sky-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="flex-1 flex flex-col sm:mr-12">
            <h4 className="font-bold text-lg text-gray-800 mb-4">PROGRAMS</h4>
            <ul className="space-y-2">
              {Object.entries(categorizedCourses).map(([category]) => (
                <li key={category}>
                  <a href="#" className="text-gray-600 hover:text-sky-400">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-800 mb-4">CONTACT US</h4>
            <p className="text-gray-600">
              23 New Design Str, Lorem Ipsum10 Hudson Yards, USA
            </p>
            <p className="text-gray-600">Tel: + (123) 2500-567-8988</p>
            <p className="text-gray-600">Email: support@lms.com</p>
            <div className="flex space-x-3 mt-4">
              <span className="bg-sky-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                F
              </span>
              <span className="bg-sky-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                P
              </span>
              <span className="bg-sky-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                X
              </span>
              <span className="bg-sky-400 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                I
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 mt-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Learning. All rights reserved.
          </p>
        </div>
      </Footer>
    </Layout>
  );
};

export default Home;
