import React, { useState } from "react";
import { Button } from "antd";
import AuthModal from "../AuthModal/AuthModal";
import { useDispatch } from "react-redux";
import { logOutApi } from "../../store/reducers/authSlice";
import "./myButton.css";
import AddTaskModal from "../AddTaskModal/AddTaskModal";

const MyButton = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const dispatch = useDispatch();

  if (type === "add") {
    return (
      <div className="btn-container">
        <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
          Add Task
        </Button>
        {isAddModalOpen && (
          <AddTaskModal state={true} setIsAddModalOpen={setIsAddModalOpen} />
        )}
      </div>
    );
  }
  return (
    <div className="btn-container">
      {type ? (
        <Button danger onClick={() => dispatch(logOutApi())}>
          Log out
        </Button>
      ) : (
        <Button onClick={() => setIsModalOpen(true)}>Log in</Button>
      )}

      {isModalOpen && (
        <AuthModal state={true} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default MyButton;
