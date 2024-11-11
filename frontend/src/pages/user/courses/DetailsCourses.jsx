import {
  Card,
  Button,
  Typography,
  List,
  Divider,
  Row,
  Col,
  Tag,
  Avatar,
  Input,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;
const { TextArea } = Input;

const mockCourse = {
  comments: [
    {
      user: "John Doe",
      content:
        "This course is amazing! It helped me deepen my understanding of React.",
      avatar: "https://via.placeholder.com/40",
    },
    {
      user: "Jane Smith",
      content:
        "Great content, but would love more examples on state management.",
      avatar: "https://via.placeholder.com/40",
    },
    {
      user: "Alice Brown",
      content:
        "Fantastic course! Looking forward to more advanced React tutorials.",
      avatar: "https://via.placeholder.com/40",
    },
  ],
};

const DetailsCourses = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(mockCourse.comments);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/courses/${id}`
        );
        setCourses(response.data.data);
        const responseLessons = await axios.get(
          `http://localhost:8080/api/v1/lessons?courseId=${id}`
        );
        setLessons(responseLessons.data.data);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }
    };
    fetchCourses();
  }, [id]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        user: "New User",
        content: comment,
        avatar: "https://via.placeholder.com/40",
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  return (
    <div className="p-5">
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Card title="Lessons" className="shadow-lg">
            <List
              bordered
              dataSource={lessons}
              renderItem={(lesson) => (
                <List.Item>
                  <Text>
                    {lesson.order}. {lesson.title} -{" "}
                    <Text type="secondary">(Demo)</Text>
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={<img alt={courses.name} src={courses.image} />}
            className="shadow-lg"
          >
            <Title level={2}>{courses.name}</Title>
            <Text strong>
              {courses.category} - {courses.level}
            </Text>
            <div className="mt-2">
              <Text strong className="text-lg">
                ${courses.discountPrice || courses.price}
              </Text>
              {courses.discountPrice && (
                <Text className="ml-2 text-gray-500 line-through">
                  ${courses.price}
                </Text>
              )}
            </div>
            <Text className="text-sm text-gray-700 mt-2">
              {courses.description}
            </Text>

            <div className="mt-4">
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                block
                size="large"
              >
                Buy Now
              </Button>
            </div>

            {/* Course Tags */}
            <div className="mt-5 space-x-2">
              <Tag color="blue">Top Rated</Tag>
              <Tag color="green">Beginner Friendly</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Course Features and What You Will Learn */}
      <Divider
        orientation="left"
        className="course-divider my-5 font-semibold text-xl"
      >
        Course Features
      </Divider>

      {/* What you will learn */}
      <Text className="text-lg font-semibold">What you will learn:</Text>
      <List
        bordered
        dataSource={[
          "Learn how to use React in advanced ways",
          "Understand React Hooks and Context API",
          "Master React patterns and state management techniques",
          "Build large scale applications with React",
        ]}
        renderItem={(item) => (
          <List.Item className="p-3 border-b border-gray-200">
            <Text>{item}</Text>
          </List.Item>
        )}
      />

      {/* Why this course */}
      <Text className="text-lg font-semibold mt-4">Why this course?</Text>
      <List
        bordered
        dataSource={[
          "Advanced content taught by industry experts",
          "Comprehensive lessons with demos and real-world projects",
          "Access to the community for support and collaboration",
        ]}
        renderItem={(item) => (
          <List.Item className="p-3 border-b border-gray-200">
            <Text>{item}</Text>
          </List.Item>
        )}
      />

      {/* Comments Section */}
      <Divider
        orientation="left"
        className="course-divider my-5 font-semibold text-xl"
      >
        Comments
      </Divider>

      <List
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item className="p-3 border-b border-gray-200">
            <div className="flex items-center">
              <Avatar src={comment.avatar} className="mr-3" />
              <div>
                <Text strong className="block">
                  {comment.user}
                </Text>
                <Text>{comment.content}</Text>
              </div>
            </div>
          </List.Item>
        )}
      />

      {/* Input for writing comments */}
      <Divider orientation="left" className="mt-5 font-semibold text-xl">
        Write a Comment
      </Divider>
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="Write your comment here..."
        className="mb-4 border rounded-lg p-2"
      />
      <Button
        type="primary"
        onClick={handleCommentSubmit}
        disabled={!comment.trim()}
        className="w-full"
      >
        Submit Comment
      </Button>
    </div>
  );
};

export default DetailsCourses;
