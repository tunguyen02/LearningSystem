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
            `http://localhost:3000/api/v1/courses/${id}`
          );
          setCourses(courseResponse.data.data);
    
          const lessonsResponse = await axios.get(
            `http://localhost:3000/api/v1/lessons/all?courseId=${id}`
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
            `http://localhost:3000/api/v1/reviews/${id}`
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
              `http://localhost:3000/api/v1/reviews`,
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
        <div>
            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <Card>
                        {currentVideo ? (
                            <ReactPlayer url={currentVideo.url} controls width="100%" />
                        ) : (
                            <Text>No video available</Text>
                        )}
                    </Card>
                    <Divider />
                    <Title level={4}>{currentLesson?.title}</Title>
                    <Text>{currentLesson?.description}</Text>
                </Col>
                <Col span={8}>
                    <List
                        header={<Title level={4}>Lessons</Title>}
                        bordered
                        dataSource={lessons}
                        renderItem={(lesson) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={lesson.title}
                                    description={lesson.description}
                                />
                                <List
                                    dataSource={lesson.videos}
                                    renderItem={(video) => (
                                        <List.Item
                                            onClick={() => handleVideoClick(lesson, video)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Avatar icon={<PlayCircleOutlined />} />
                                            <Text>{video.title}</Text>
                                        </List.Item>
                                    )}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={4}>Reviews</Title>
                    <List
                        dataSource={reviews}
                        renderItem={(review) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar>{review.user.name[0]}</Avatar>}
                                    title={review.user.name}
                                    description={
                                        <>
                                            <Rate disabled value={review.rating} />
                                            <Text>{review.comment}</Text>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                    <Divider />
                    <Title level={4}>Add a Review</Title>
                    <TextArea
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                    <Rate value={rate} onChange={(value) => setRate(value)} />
                    <Button type="primary" onClick={handleCommentSubmit}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
export default CoursesLearnLesson;  
