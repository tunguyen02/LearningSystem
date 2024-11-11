import { useState } from "react";
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
} from "antd";
import ReactPlayer from "react-player";

const { Title, Text } = Typography;
const { TextArea } = Input;

const lessonsData = [
  {
    id: 1,
    title: "Lesson 1: Introduction",
    content:
      "This is the first lesson where we introduce the fundamentals of React.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Lesson 2: Advanced Concepts",
    content:
      "This lesson covers more advanced concepts in React, like hooks and context.",
    videoUrl: "https://www.youtube.com/watch?v=JYdHkQ1FiLw",
  },
  {
    id: 3,
    title: "Lesson 3: Final Thoughts",
    content:
      "In this final lesson, we wrap up the course and discuss real-world applications.",
    videoUrl: "https://www.youtube.com/watch?v=0y2btjlcpvY",
  },
];

const initialCommentsData = [
  {
    id: 1,
    user: "John Doe",
    content:
      "This lesson was really helpful! Thanks for the great explanation.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    user: "Jane Smith",
    content:
      "I struggled with hooks, but this lesson clarified a lot of things for me.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    user: "Mark Johnson",
    content:
      "Amazing course, I learned so much! Can you make a course on Redux?",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    user: "Emily Davis",
    content:
      "Great final thoughts! I feel more confident now to apply React in real projects.",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const CoursesLearnLesson = () => {
  const [currentLesson, setCurrentLesson] = useState(lessonsData[0]);
  const [comments, setComments] = useState(initialCommentsData);
  const [newComment, setNewComment] = useState("");

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: "Anonymous User",
        content: newComment,
        avatar: "https://i.pravatar.cc/150?img=5",
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="courses-learn-container bg-gray-50 p-8">
      <div className="course-header mb-6">
        <Title level={2}>Course Name: React Basics</Title>
      </div>

      <Row gutter={[16, 16]}>
        {/* Video Section */}
        <Col span={16}>
          <Card className="rounded-lg shadow-lg p-4">
            <ReactPlayer
              url={currentLesson.videoUrl}
              controls
              width="100%"
              height="400px"
            />
            <div className="lesson-content mt-6">
              <Title level={3}>{currentLesson.title}</Title>
              <Text>{currentLesson.content}</Text>
            </div>
            <div className="comments-section mt-8">
              <Title level={4}>Comments</Title>

              {/* Comments List */}
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

              {/* Comment Input */}
              <Divider
                orientation="left"
                className="mt-5 font-semibold text-xl"
              >
                Write a Comment
              </Divider>
              <TextArea
                value={newComment}
                onChange={handleCommentChange}
                rows={4}
                placeholder="Write your comment here..."
                className="mb-4 border rounded-lg p-2"
              />
              <Button
                type="primary"
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
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
              dataSource={lessonsData}
              renderItem={(lesson) => (
                <List.Item key={lesson.id}>
                  <Button
                    type="link"
                    onClick={() => handleLessonClick(lesson)}
                    className="text-left w-full hover:bg-blue-100 rounded-lg transition duration-200"
                  >
                    {lesson.title}
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
