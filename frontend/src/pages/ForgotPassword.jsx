import React from "react";
import Layout from "../components/Layout/Layout";

import { Form, Input, message } from "antd";
import "../styles/LoginStyles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const location = useLocation();
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", values);
      if (res.data.success) {
        // localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <Layout title={"MernApp | Forgot Password"}>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="text-center">Reset Paaword</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Answer" name="answer">
            <Input type="text" required />
          </Form.Item>

          <Form.Item label="New Password" name="newPassword">
            <Input type="password" required />
          </Form.Item>

          <button className="btn btn-primary">Login</button>
        </Form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
