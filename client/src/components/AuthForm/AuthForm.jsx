import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { authApi } from "../../store/reducers/authSlice";

const AuthForm = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();

  return (
    <Form
      onFinish={(e) => {
        dispatch(authApi(e));
        setIsModalOpen(false);
      }}
    >
      <Form.Item
        name="login"
        label="User name"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Enter your user name, field is required",
          },
        ]}
      >
        <Input placeholder="Enter your user name" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Enter your password, field is required",
            min: 3,
          },
        ]}
      >
        <Input.Password type="password" placeholder="Enter your password" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Enter
      </Button>
    </Form>
  );
};

export default AuthForm;
