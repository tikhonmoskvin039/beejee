import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table } from "antd";
import { allTasksApi, updateTaskApi } from "../../store/reducers/tasksSlice";
import { EditOutlined } from "@ant-design/icons";
import EditModal from "../EditModal/EditModal";

const Tasks = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((store) => store.tasks?.tasks);
  const admin = useSelector((state) => state.profile?.name);

  useEffect(() => {
    setLoading(true);
    dispatch(allTasksApi());
    setLoading(false);
  }, [dispatch]);

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      render: (data, record) => {
        return record.isDone ? <del>{data}</del> : data;
      },
      sorter: (record1, record2) => {
        return record1.name.toLowerCase() > record2.name.toLowerCase() ? 1 : -1;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (data, record) => {
        return record.isDone ? <del>{data}</del> : data;
      },
      sorter: (record1, record2) => {
        return record1.email.toLowerCase() > record2.email.toLowerCase()
          ? 1
          : -1;
      },
    },
    {
      title: "Text",
      dataIndex: "text",
      render: (data, record) => {
        return record.isDone ? <del>{data}</del> : data;
      },
      sorter: (record1, record2) => {
        return record1.text.toLowerCase() > record2.text.toLowerCase() ? 1 : -1;
      },
    },
    {
      title: "Status",
      dataIndex: "isDone",
      render: (data, record) => {
        return admin ? (
          <Input
            type="checkbox"
            checked={record.isDone}
            onChange={() => dispatch(updateTaskApi(record.id))}
          />
        ) : (
          <Input
            type="checkbox"
            checked={record.isDone}
            disabled
          />
        );
      },
      sorter: (record1, record2) => {
        return record1.isDone > record2.isDone ? 1 : -1;
      },
    },
    {
      title: "Edited by admin",
      dataIndex: admin ? null : "isChanged",
      render: (data) => {
        return admin ? (
          <Button onClick={() => onEditData(data)}>
            <EditOutlined />
          </Button>
        ) : data === true ? (
          <Input type="checkbox" checked disabled />
        ) : (
          <Input type="checkbox" disabled />
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (time) => {
        return <p>{time.replaceAll(/[A-z]/gm, " ").trim().slice(0, -4)}</p>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (time) => {
        return <p>{time.replaceAll(/[A-z]/gm, " ").trim().slice(0, -4)}</p>;
      },
    },
  ];

  const onEditData = (data) => {
    setIsEditing(true);
    setEditingRecord({ ...data });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingRecord(null);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          pageSize: 3,
        }}
      />
      <EditModal
        isEditing={isEditing}
        resetEditing={resetEditing}
        editingRecord={editingRecord}
        setEditingRecord={setEditingRecord}
      />
    </>
  );
};

export default Tasks;
