import { useEffect, useState } from "react";
import { Card, Typography, Input, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;
const Pending = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coursesPending, setCoursesPending] = useState([]);
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
        setCoursesPending(responseCoursesOrder.data.data.pending);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }
    };

    fetchCourses();
  }, []);

  const navigate = useNavigate();

  const filteredCourses = coursesPending.filter((course) =>
    course?.courseId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
        <div className="container mx-auto px-4">
            <Title level={2} className="text-center mt-12">
                Pending Courses
            </Title>
            <Input
                placeholder="Search course..."
                className="w-1/3 mx-auto mt-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredCourses.length === 0 ? (
                <Empty className="mt-12" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {filteredCourses.map((course) => (
                        <Card
                            key={course.id}
                            hoverable
                            cover={
                                <img
                                    alt={course.courseId.name}
                                    src={course.courseId.imageUrl}
                                />
                            }
                            onClick={() => navigate(`/courses/${course.courseId.id}`)}
                        >
                            <Card.Meta
                                title={course.courseId.name}
                                description={course.courseId.description}
                            />
                        </Card>
                    ))}
                </div>
            )}
        </div>  
    );

};

export default Pending;
