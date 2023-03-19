import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { addTaskApi } from "../../store/reducers/tasksSlice";

const AddTaskForm = ({ setIsAddModalOpen }) => {
  const dispatch = useDispatch();

  return (
    <Form
      onFinish={(e) => {
        dispatch(addTaskApi(e));
        setIsAddModalOpen(false);
      }}
    >
      <Form.Item
        name="name"
        label="User name"
        rules={[
          {
            required: true,
            message: "Enter your name, field is required",
          },
        ]}
      >
        <Input placeholder="Enter your user name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Enter your email, field is required" },
        ]}
      >
        <Input type="email" placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        name="text"
        label="Text"
        rules={[
          {
            required: true,
            message: "Enter your task text, field is required",
          },
        ]}
      >
        <Input.TextArea type="text" placeholder="Enter your task text" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form>
  );
};

export default AddTaskForm;
