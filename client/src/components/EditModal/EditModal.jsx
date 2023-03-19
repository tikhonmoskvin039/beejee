import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, message, Modal, Space } from "antd";
import { updateTaskApi } from "../../store/reducers/tasksSlice";

const EditModal = ({
  isEditing,
  resetEditing,
  editingRecord,
  setEditingRecord,
}) => {
  const dispatch = useDispatch();

  return (
    <Modal title="Edit task" centered footer={[]} open={isEditing}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form
          onFinish={() => {
            dispatch(updateTaskApi(editingRecord));
            resetEditing();
          }}
        >
          <Input
            name="name"
            value={editingRecord?.name}
            onChange={(e) =>
              setEditingRecord((pre) => {
                return { ...pre, name: e.target.value };
              })
            }
          />
          <Input
            name="email"
            value={editingRecord?.email}
            onChange={(e) =>
              setEditingRecord((pre) => {
                return { ...pre, email: e.target.value };
              })
            }
          />
          <Input
            name="text"
            value={editingRecord?.text}
            onChange={(e) =>
              setEditingRecord((pre) => {
                return { ...pre, text: e.target.value };
              })
            }
          />
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => {
                resetEditing();
                message.warning(
                  `Task number ${editingRecord?.id} is not updated`
                );
              }}
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Space>
        </Form>
      </Space>
    </Modal>
  );
};

export default EditModal;
