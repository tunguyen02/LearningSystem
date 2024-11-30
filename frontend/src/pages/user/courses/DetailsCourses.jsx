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
  Rate,
  message,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Collapse } from "antd";

const { Panel } = Collapse;

const { Title, Text } = Typography;
const { TextArea } = Input;

const DetailsCourses = () => {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [courses, setCourses] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [reviews, setReviews] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/reviews/${id}`
      );
      setReviews(response.data.data);
    } catch (e) {
      console.error("Failed to fetch comments:", e);
    }
  }, [id]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/courses/${id}`
        );
        setCourses(response.data.data);
        const responseLessons = await axios.get(
          `http://localhost:8080/api/v1/lessons/all?courseId=${id}`
        );
        setLessons(responseLessons.data.data);
        const responseConfirm = await axios.get(
          `http://localhost:8080/api/v1/courses/${id}/confirm`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsConfirm(responseConfirm.data.success);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }
    };

    fetchCourses();
    fetchComments();
  }, [fetchComments, id]);

  const handleCommentSubmit = async () => {
    if (comment.trim() && rate > 0) {
      try {
        await axios.post(
          `http://localhost:8080/api/v1/reviews`,
          {
            userId: user.id,
            courseId: id,
            comment,
            rating: rate,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComment("");
        setRate(0);
        message.success("Comment submitted successfully!");
        fetchComments();
      } catch (e) {
        console.error("Failed to submit comment:", e);
        message.error("Failed to submit comment. Please try again.");
      }
    }
  };

  return (
    <div className="p-5">
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Card title="Lessons" className="shadow-lg">
            <Collapse
              accordion
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              className="lesson-collapse"
            >
              {lessons.map((lesson) => (
                <Panel
                  header={`${lesson.order}. ${lesson.title}`}
                  key={lesson.id}
                >
                  <List
                    bordered
                    dataSource={lesson.videos || []}
                    renderItem={(video) => (
                      <List.Item>
                        <Text>{video.title}</Text>
                      </List.Item>
                    )}
                  />
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            cover={<img alt={courses?.name} src={courses?.image} />}
            className="shadow-lg"
          >
            <Title level={2}>{courses?.name}</Title>
            <Text strong>
              {courses?.category} - {courses?.level}
            </Text>
            {!isConfirm && (
              <div className="mt-2">
                <Text strong className="text-lg">
                  ${courses?.discountPrice || courses?.price}
                </Text>
                {courses?.discountPrice && (
                  <Text className="ml-2 text-gray-500 line-through">
                    ${courses?.price}
                  </Text>
                )}
              </div>
            )}
            <div>
              <Text className="text-sm text-gray-700 mt-2">
                {courses?.description}
              </Text>
            </div>

            <div className="mt-4">
              {isConfirm ? (
                <Button
                  onClick={() => navigate(`/user/courses/${id}/learn`)}
                  type="primary"
                  block
                  size="large"
                >
                  Start studying now!
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(`/user/courses/payment/${id}`)}
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  block
                  size="large"
                >
                  Buy Now
                </Button>
              )}
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

      <Divider
        orientation="left"
        className="course-divider my-5 font-semibold text-xl"
      >
        Comments
      </Divider>

      <List
        dataSource={reviews}
        renderItem={(comment) => (
          <List.Item className="p-3 border-b border-gray-200">
            <div>
              <div className="flex items-center mb-1">
                <Avatar src={comment.avatar} className="mr-3" />
                <div className="flex flex-col">
                  <Text strong className="block mr-2">
                    {comment.userId.name}
                  </Text>
                  <Rate
                    disabled
                    value={comment.rating}
                    style={{ fontSize: "10px" }}
                  />
                </div>
              </div>
              <Text>{comment.comment}</Text>
            </div>
          </List.Item>
        )}
      />

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
      <div className="mb-4">
        <Rate value={rate} onChange={(value) => setRate(value)} />
      </div>
      <Button
        type="primary"
        onClick={handleCommentSubmit}
        disabled={!comment.trim() || rate === 0}
        className="w-full"
      >
        Submit Comment
      </Button>
    </div>
  );
};

export default DetailsCourses;
