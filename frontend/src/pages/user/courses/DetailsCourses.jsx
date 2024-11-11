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
import { useState } from "react";

const { Title, Text } = Typography;
const { TextArea } = Input;

const mockCourse = {
  name: "Advanced React",
  category: "Programming",
  level: "Advanced",
  price: 199,
  discountPrice: 149,
  image: "https://via.placeholder.com/500x300",
  description: "Master React and build advanced applications.",
  lessons: [
    { order: 1, title: "Lesson 1: Introduction to Advanced React" },
    { order: 2, title: "Lesson 2: React Hooks Deep Dive" },
    { order: 3, title: "Lesson 3: Advanced Patterns in React" },
    { order: 4, title: "Lesson 4: State Management in React" },
    { order: 5, title: "Lesson 5: React Performance Optimization" },
  ],
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
        {/* Left Section - Lessons */}
        <Col xs={24} md={16}>
          <Card title="Lessons" className="shadow-lg">
            <List
              bordered
              dataSource={mockCourse.lessons}
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

        {/* Right Section - Course Info */}
        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={<img alt={mockCourse.name} src={mockCourse.image} />}
            className="shadow-lg"
          >
            <Title level={2}>{mockCourse.name}</Title>
            <Text strong>
              {mockCourse.category} - {mockCourse.level}
            </Text>
            <div className="mt-2">
              <Text strong className="text-lg">
                ${mockCourse.discountPrice || mockCourse.price}
              </Text>
              {mockCourse.discountPrice && (
                <Text className="ml-2 text-gray-500 line-through">
                  ${mockCourse.price}
                </Text>
              )}
            </div>
            <Text className="text-sm text-gray-700 mt-2">
              {mockCourse.description}
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
