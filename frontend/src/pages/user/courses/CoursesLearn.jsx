import { useCallback, useEffect, useState } from "react";
import {
  Card,
  List,
  Typography,
  Row,
  Col,
  Button,
  Avatar,
  Divider,
  Input,
  Rate,
  message,
} from "antd";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CoursesLearnLesson = () => {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [courses, setCourses] = useState(null);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const { id } = useParams();

  const fetchLessonsAndCourse = useCallback(async () => {
    try {
      const courseResponse = await axios.get(
        `http://localhost:8080/api/v1/courses/${id}`
      );
      setCourses(courseResponse.data.data);

      const lessonsResponse = await axios.get(
        `http://localhost:8080/api/v1/lessons/all?courseId=${id}`
      );
      setLessons(lessonsResponse.data.data);
      setCurrentLesson(lessonsResponse.data.data[0] || null);
    } catch (error) {
      console.error("Failed to fetch lessons or course:", error);
      message.error("Failed to load lessons or course.");
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/reviews/${id}`
      );
      setReviews(response.data.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchLessonsAndCourse();
    fetchComments();
  }, [fetchLessonsAndCourse, fetchComments]);

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

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
    } else {
      message.warning("Please provide a valid comment and rating.");
    }
  };

  return (
    <div className="courses-learn-container bg-gray-50 p-8">
      <div className="course-header mb-6">
        <Title level={2}>Course Name: {courses?.name}</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card className="rounded-lg shadow-lg p-4 pt-0">
            <div className="lesson-content">
              <Title level={3}>
                Lesson {currentLesson?.order}: {currentLesson?.title}
              </Title>
              <ReactPlayer
                url={currentLesson?.videos[0]?.url}
                controls
                width="100%"
                height="400px"
              />
              <Title className="mt-3" level={4}>
                {currentLesson?.videos[0]?.title}
              </Title>{" "}
              <Text>{currentLesson?.content}</Text>
            </div>

            <div className="comments-section mt-8">
              <Title level={4}>Comments</Title>

              {/* Comments List */}
              <List
                dataSource={reviews}
                renderItem={(review) => (
                  <List.Item className="p-3 border-b border-gray-200">
                    <div>
                      <div className="flex items-center mb-1">
                        <Avatar src={review.avatar} className="mr-3" />
                        <div className="flex flex-col">
                          <Text strong className="block mr-2">
                            {review.userId.name}
                          </Text>
                          <Rate
                            disabled
                            value={review.rating}
                            style={{ fontSize: "10px" }}
                          />
                        </div>
                      </div>
                      <Text>{review.comment}</Text>
                    </div>
                  </List.Item>
                )}
              />

              <Divider
                orientation="left"
                className="mt-5 font-semibold text-xl"
              >
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
          </Card>
        </Col>

        {/* Lessons List */}
        <Col span={8}>
          <Card title="Lessons List" bordered className="rounded-lg shadow-lg">
            <List
              dataSource={lessons || []}
              renderItem={(lesson) => (
                <List.Item key={lesson?._id}>
                  <Button
                    type="link"
                    onClick={() => handleLessonClick(lesson)}
                    className="text-left w-full hover:bg-blue-100 rounded-lg transition duration-200"
                  >
                    Lesson {lesson?.order}: {lesson?.title}
                  </Button>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CoursesLearnLesson;
