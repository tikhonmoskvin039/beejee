import React, { useState } from "react";
import { Modal } from "antd";
import AddTaskForm from "../AddTaskForm/AddTaskForm";

const AddTaskModal = ({ state, setIsAddModalOpen }) => {
  const [isOpen, setIsOpen] = useState(state);

  return (
    <Modal
      footer={[]}
      title="Please, enter your data"
      open={isOpen}
      centered
      onCancel={() => {
        setIsOpen(false);
        setIsAddModalOpen(false);
      }}
    >
      <AddTaskForm setIsAddModalOpen={setIsAddModalOpen} />
    </Modal>
  );
};

export default AddTaskModal;
