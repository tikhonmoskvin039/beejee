import React, { useState } from "react";
import { Modal } from "antd";
import AuthForm from "../AuthForm/AuthForm";

const AuthModal = ({ state, setIsModalOpen }) => {
  const [isOpen, setIsOpen] = useState(state);

  return (
    <Modal
      footer={[]}
      title="Please, enter your credentials"
      open={isOpen}
      centered
      onCancel={() => {
        setIsOpen(false);
        setIsModalOpen(false);
      }}
    >
      <AuthForm setIsModalOpen={setIsModalOpen} />
    </Modal>
  );
};

export default AuthModal;
