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
          `http://localhost:3000/api/v1/courses/${id}`
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
        "http://localhost:3000/api/v1/registrations",
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
    <div className="flex justify-center mt-12">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Course Payment</h2>
            <p className="font-semibold">Course Name:</p>
            <p className="mb-2">{courses.name}</p>
            <p className="font-semibold">Course Description:</p>
            <p className="mb-2">{courses.description}</p>
            <p className="font-semibold">Price:</p>
            <p className="mb-4">${courses.price}</p>
            {isPaid ? (
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">
                    Paid
                </span>
            ) : (
                <button
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={handleConfirmPayment}
                >
                    Confirm Payment
                </button>
            )}
        </div>
    </div>
);

};

export default Payment;