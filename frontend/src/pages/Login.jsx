import React from "react";
import { Form, Input, message } from "antd";
import "../styles/LoginStyles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const location = useLocation();
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/auth/login", values);
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
    <Layout title={"MernApp | Login"}>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="text-center">Login Form</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <Link to="/register" className="m-2">
            Not a user ? Register here
          </Link>
          <button className="btn btn-primary">Login</button>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
