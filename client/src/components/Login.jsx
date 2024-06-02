import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserAuth } from "../../redux/slices/systemSlices";
import { Form, Input, Button, Typography, Layout, message, Space } from "antd";

const { Title, Text } = Typography;
const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/login",
        values,
        { withCredentials: true }
      );

      if (data?.success) {
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        dispatch(setUserAuth(data.data));

        if (data.data.firstLogin) {
          navigate("/change-password");
        } else {
          switch (data.data.role) {
            case "Worker":
              navigate("/daily-report-update");
              break;
            case "Admin":
              navigate("/admin/reports");
              break;
            case "User":
              navigate("/user/reports");
              break;
            case "Manager":
              navigate("/manager/reports");
              break;
            default:
              navigate("/");
          }
        }
      } else {
        message.error("Invalid email or password.");
      }
    } catch (error) {
      message.error("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Content
        style={{
          maxWidth: 480,
          width: "100%",
          padding: 24,
          background: "#fff",
          borderRadius: 8,
        }}
      >
        <Space
          direction="vertical"
          style={{ width: "100%", textAlign: "center" }}
        >
          <img
            src="/LOGO_.png"
            alt="Company Logo"
            style={{ width: 100, marginBottom: 24 }}
          />
          {/* <Title level={2} style={{ marginBottom: 16 }}>
            Welcome!
          </Title> */}
          <Text type="secondary" style={{ marginBottom: 24 }}>
            Please login to your account
          </Text>
        </Space>
        <Form name="login" layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="name"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
