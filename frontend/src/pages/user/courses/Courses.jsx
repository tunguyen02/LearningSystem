import { useEffect, useState } from "react";
import { Card, Typography, Input, Slider, Select, Button } from "antd";
import axios from "axios";
import { FilterOutlined } from "@ant-design/icons";

const { Title } = Typography;
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
        const response = await axios.get("http://localhost:3000/api/v1/courses");
        const fetchedCourses = response.data.data.courses;
        setCourses(fetchedCourses);
        setFilteredCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/categories");
        const fetchedCategories = response.data.data.categories;
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = courses;

      if (filters.searchTerm) {
        filtered = filtered.filter(course =>
          course.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }

      if (filters.selectedCategory) {
        filtered = filtered.filter(course =>
          course.category === filters.selectedCategory
        );
      }

      filtered = filtered.filter(course =>
        course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]
      );

      setFilteredCourses(filtered);
    };

    applyFilters();
  }, [filters, courses]);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setFilters({ ...filters, selectedCategory: value });
  };

  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  return (
    <div>
      <Title level={2}>Courses</Title>
      <Input
        placeholder="Search courses"
        value={filters.searchTerm}
        onChange={handleSearchChange}
      />
      <Select
        placeholder="Select category"
        value={filters.selectedCategory}
        onChange={handleCategoryChange}
        style={{ width: 200, margin: '0 10px' }}
      >
        {categories.map(category => (
          <Option key={category.id} value={category.name}>
            {category.name}
          </Option>
        ))}
      </Select>
      <Slider
        range
        defaultValue={priceRange}
        max={500}
        onChange={handlePriceChange}
        style={{ width: 200, margin: '0 10px' }}
      />
      <Button icon={<FilterOutlined />} onClick={() => setFilters({ ...filters })}>
        Apply Filters
      </Button>
      <div style={{ marginTop: 20 }}>
        {filteredCourses.map(course => (
          <Card key={course.id} title={course.title} style={{ marginBottom: 20 }}>
            <p>{course.description}</p>
            <p>Category: {course.category}</p>
            <p>Price: ${course.price}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;