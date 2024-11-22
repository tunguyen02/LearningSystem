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
  Collapse,
} from "antd";
import ReactPlayer from "react-player";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const CoursesLearnLesson = () => {
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
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
      const lessonData = lessonsResponse.data.data;
      setLessons(lessonData);

      if (lessonData.length > 0) {
        setCurrentLesson(lessonData[0]);
        setCurrentVideo(lessonData[0]?.videos[0] || null);
      }
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

  const handleVideoClick = (lesson, video) => {
    setCurrentLesson(lesson);
    setCurrentVideo(video);
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
        {/* Video Player và Nội dung bài học */}
        <Col span={16}>
          <Card className="rounded-lg shadow-lg p-4 pt-0">
            <div className="lesson-content">
              <Title level={3}>
                Lesson {currentLesson?.order}: {currentLesson?.title}
              </Title>
              <ReactPlayer
                url={currentVideo?.url}
                controls
                width="100%"
                height="400px"
              />
              <Title className="mt-3" level={4}>
                {currentVideo?.title}
              </Title>
              <Text>{currentLesson?.content}</Text>
            </div>

            {/* Comments Section */}
            <div className="comments-section mt-8">
              <Title level={4}>Comments</Title>

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

        {/* Lessons and Videos List */}
        <Col span={8}>
          <Card title="Lessons List" bordered className="rounded-lg shadow-lg">
            <Collapse>
              {lessons.map((lesson) => (
                <Panel
                  header={`Lesson ${lesson.order}: ${lesson.title}`}
                  key={lesson._id}
                >
                  <div className="flex flex-col gap-1">
                    {lesson.videos.map((video) => (
                      <div
                        key={video._id}
                        onClick={() => handleVideoClick(lesson, video)}
                        className="p-2 rounded-lg hover:bg-blue-50 transition cursor-pointer border"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span
                          className="text-base font-semibold"
                          style={{ marginRight: "8px" }}
                        >
                          {video.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          Click to watch
                        </span>
                      </div>
                    ))}
                  </div>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CoursesLearnLesson;
