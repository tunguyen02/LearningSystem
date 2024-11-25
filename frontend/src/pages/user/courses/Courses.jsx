import { useEffect, useState } from "react";
import { Card, Typography, Input, Slider, Select, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FilterOutlined,
  DollarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange] = useState([0, 500]);

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedCategory: "",
    priceRange: [0, 500],
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/courses"
        );
        const fetchedCourses = response.data.data.courses;
        setCourses(fetchedCourses);
        setFilteredCourses(fetchedCourses);

        const uniqueCategories = [
          ...new Set(fetchedCourses.map((course) => course.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/categories"
        );
        const fetchedCategories = response.data.data.categories;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCourses();
    fetchCategories();
  }, []);

  const applyFilters = () => {
    const results = Courses.filter((course) => {
      const matchesSearchTerm = course.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const matchesCategory =
        filters.selectedCategory === "" ||
        course.category === filters.selectedCategory;
      const matchesPrice = course.discountPrice
        ? course.discountPrice >= filters.priceRange[0] &&
          course.discountPrice <= filters.priceRange[1]
        : course.price >= filters.priceRange[0] &&
          course.price <= filters.priceRange[1];
      return matchesSearchTerm && matchesCategory && matchesPrice;
    });

    setFilteredCourses(results);
  };

  const navigate = useNavigate();  
  
  return (
    <div className="flex p-5 gap-5">
      {/* Left Sidebar - Filters */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
        <Title level={4} className="mb-4 flex items-center gap-2">
          <FilterOutlined /> Filter Courses
        </Title>
        <div className="mb-5">
          <Input.Search
            placeholder="Search by name"
            allowClear
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
          />
        </div>
        <div className="mb-5">
          <Title level={5} className="flex items-center gap-2">
            <AppstoreOutlined /> Category
          </Title>
          <Select
            style={{ width: "100%" }}
            allowClear
            placeholder="Select a category"
            value={filters.selectedCategory || undefined}
            onChange={(value) =>
              setFilters({ ...filters, selectedCategory: value || "" })
            }
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-5">
          <Title level={5} className="flex items-center gap-2">
            <DollarOutlined /> Price Range
          </Title>
          <Slider
            range
            min={0}
            max={500}
            defaultValue={priceRange}
            value={filters.priceRange}
            onChange={(value) => setFilters({ ...filters, priceRange: value })}
          />
          <div className="flex justify-between text-sm">
            <Text>${filters.priceRange[0]}</Text>
            <Text>${filters.priceRange[1]}</Text>
          </div>
        </div>
        <Button type="primary" block className="mt-4" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>

      {/* Right Content - Courses */}
      <div className="w-3/4">
        <Title level={2} className="mb-5">
          Our Courses
        </Title>
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
        {filteredCourses.length === 0 && (
          <Text className="text-center text-gray-500 mt-5">
            No courses found matching your filters.
          </Text>
        )}
      </div>
    </div>
  );
};

export default Courses;
