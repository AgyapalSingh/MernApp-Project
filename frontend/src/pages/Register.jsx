import React from "react";
import { Form, Input, message } from "antd";
import "../styles/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const Register = () => {
  const navigate = useNavigate();
  // form Handler
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/auth/register", values);
      if (res.data.success) {
        message.success("Registered Successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout title={"MernApp | Register"}>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="text-center">Register Form</h1>
          <Form.Item label="First Name" name="firstName">
            <Input type="text" required />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName">
            <Input type="text" required />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber">
            <Input type="number" required />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input type="text" required />
          </Form.Item>

          <Link to="/login" className="m-2">
            Already user ? Login here
          </Link>
          <button className="btn btn-primary">Register</button>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
