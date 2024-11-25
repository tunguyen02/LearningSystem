import { Card,Button,Typography,List,Divider,Row,Col,Tag,Avatar,Input,Rate,message,} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate ,useParams } from "react-router-dom";
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
          `http://localhost:3000/api/v1/reviews/${id}`
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
              `http://localhost:3000/api/v1/courses/${id}`
            );
            setCourses(response.data.data);
            const responseLessons = await axios.get(
              `http://localhost:3000/api/v1/lessons/all?courseId=${id}`
            );
            setLessons(responseLessons.data.data);
            const responseConfirm = await axios.get(
              `http://localhost:3000/api/v1/courses/${id}/confirm`,
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
        }
      };
    return (
        <div>
            {courses && (
                <Card
                    title={courses.title}
                    extra={
                        <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => navigate(`/checkout/${id}`)}
                        >
                            Enroll Now
                        </Button>
                    }
                >
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Avatar shape="square" size={200} src={courses.image} />
                        </Col>
                        <Col span={16}>
                            <Title level={2}>{courses.title}</Title>
                            <Text>{courses.description}</Text>
                            <Divider />
                            <Text strong>Instructor: {courses.instructor}</Text>
                            <Divider />
                            <Text strong>Price: ${courses.price}</Text>
                            <Divider />
                            <Rate disabled defaultValue={courses.rating} />
                        </Col>
                    </Row>
                </Card>
            )}

            <Divider />

            <Collapse>
                {lessons.map((lesson) => (
                    <Panel header={lesson.title} key={lesson.id}>
                        <p>{lesson.content}</p>
                    </Panel>
                ))}
            </Collapse>

            <Divider />

            <List
                header={<div>Reviews</div>}
                itemLayout="horizontal"
                dataSource={reviews}
                renderItem={(review) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={review.user.avatar} />}
                            title={review.user.name}
                            description={review.comment}
                        />
                        <Rate disabled defaultValue={review.rating} />
                    </List.Item>
                )}
            />

            <Divider />

            {isConfirm && (
                <div>
                    <Title level={4}>Leave a Review</Title>
                    <TextArea
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                    <Rate onChange={(value) => setRate(value)} value={rate} />
                    <Button type="primary" onClick={handleCommentSubmit}>
                        Submit
                    </Button>
                </div>
            )}
        </div>
    )
    
};

export default DetailsCourses;