import { Card, Typography, Button, Row, Col, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

const { Title, Text } = Typography;

const Payment = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [courses, setCourses] = useState({});
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const handlePaymentSuccess = () => {
    setIsPaid(true);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://learningsystem-xwsq.onrender.com/api/v1/courses/${id}`
        );
        setCourses(response.data.data);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      }
    };
    fetchCourses();
  }, [id]);

  const handleConfirmPayment = async () => {
    try {
      await axios.post(
        "https://learningsystem-xwsq.onrender.com/api/v1/registrations",
        {
          courseId: id,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handlePaymentSuccess();
      message.success("Payment successful!");
    } catch (error) {
      console.error("Failed to confirm payment:", error.response.data);
      message.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Row gutter={24} justify="center">
        <Col xs={24} md={14} lg={12}>
          {isPaid ? (
            <div className="flex flex-col justify-center items-center h-full">
              <ExclamationCircleOutlined
                style={{ fontSize: "150px", color: "gold" }}
              />
              <Text className="text-2xl text-center mt-4">
                Please wait for admin confirmation.
              </Text>
            </div>
          ) : (
            <Card bordered={false} style={{ textAlign: "center" }}>
              <Title level={3} className="text-gray-800 mb-6">
                Complete Your Payment
              </Title>
              <Text className="text-gray-600">
                Scan the QR code below to complete your payment.
              </Text>

              <div className="flex justify-center mb-6 mt-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjDgJ2_IPIakHB-MhJVzd79x6OAP6w4VEgNQ&s"
                  alt="QR Code"
                  className="rounded-lg shadow-md w-64 h-64"
                />
              </div>

              <div className="text-gray-700">
                <Text strong className="block text-lg">
                  Amount:{" "}
                  <span className="text-xl text-green-600">
                    ${courses.discountPrice}
                  </span>
                </Text>
                <Text strong className="block text-sm">
                  Order ID: <span className="text-gray-600">#123456</span>
                </Text>
                <Text strong className="block text-sm">
                  Please leave the transfer content as: {user.name} and{" "}
                  {courses.name}
                </Text>
              </div>

              <Button
                type="primary"
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600"
                onClick={handleConfirmPayment}
              >
                Confirm Payment
              </Button>

              {isPaid && (
                <Text className="text-green-600 mt-4 block">
                  Payment Successful! Thank you for your purchase.
                </Text>
              )}
            </Card>
          )}
        </Col>

        <Col xs={24} md={10} lg={8}>
          <Card
            cover={
              <img
                alt={courses.name}
                src={courses.image || "https://via.placeholder.com/300"}
                className="h-64 object-cover"
              />
            }
            className="overflow-hidden"
          >
            <div className="p-4">
              <Title level={4} className="text-gray-800 mb-1">
                {courses.name || "Course Name"}
              </Title>
              <Text className="text-sm text-gray-500 mb-4 block">
                {courses.category} - {courses.level}
              </Text>

              <div className="flex items-center justify-between mt-2">
                <Text strong className="text-xl text-blue-500">
                  ${courses.discountPrice || courses.price || 0}
                </Text>
                {courses.discountPrice && (
                  <Text delete className="text-gray-400 text-sm">
                    ${courses.price}
                  </Text>
                )}
              </div>
              <Text className="text-sm text-gray-600 mt-2">
                {courses.description || "Course description goes here..."}
              </Text>

              {/* Course Tags */}
              <div className="mt-5">
                <Tag color="blue">Top Rated</Tag>
                <Tag color="green">Beginner Friendly</Tag>
                {courses.popularity && <Tag color="gold">Popular</Tag>}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;