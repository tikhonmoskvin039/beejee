import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { instance } from "../../utils";
import DOMPurify from "dompurify";

const initialState = {
  tasks: [],
  isLoading: false,
};

export const allTasksApi = createAsyncThunk("/tasks", async () => {
  try {
    const res = await instance.get("http://localhost:3100/tasks");
    return res.data.tasks;
  } catch (err) {
    console.log("err", err);
  }
});

export const addTaskApi = createAsyncThunk("/tasks/addTask", async (e) => {
  const sanitizedName = DOMPurify.sanitize(e.name);
  const sanitizedEmail = DOMPurify.sanitize(e.email);
  const sanitizedText = DOMPurify.sanitize(e.text);
  const task = {
    name: sanitizedName,
    email: sanitizedEmail,
    text: sanitizedText,
  };
  const res = await instance.post("http://localhost:3100/tasks/addTask", {
    ...task,
  });
  message.success("Your task being add to the list, hope you enjoy =)");
  return res.data.task;
});

export const updateTaskApi = createAsyncThunk(
  "tasks/updateTask",
  async (editingRecord) => {
    try {
      if (typeof editingRecord === "number") {
        const res = await instance.put(
          `http://localhost:3100/tasks/updateTask/${editingRecord}`
        );
        if (res.status === 400) {
          return res.data.message;
        } else {
          res.data.task.isDone
            ? message.success(`Task number ${res.data.task.id} is DONE!`)
            : message.warning(`Task number ${res.data.task.id} is UNDONE!`);

          return res.data.task;
        }
      } else {
        const { id } = editingRecord;
        const res = await instance.put(
          `http://localhost:3100/tasks/updateTask/${id}`,
          {
            ...editingRecord,
          }
        );
        if (res.status === 400) {
          return res.data.message;
        } else {
          message.success(`Task number ${res.data.task?.id} is updated`);
          return res.data.task;
        }
      }
    } catch (err) {
      console.log("err", err);
      message.error("You are not authorized in app, please log in");
      throw err;
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allTasksApi.pending, (state) => {
      state.tasks = [];
      state.isLoading = true;
    });
    builder.addCase(allTasksApi.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.isLoading = true;
    });
    builder.addCase(allTasksApi.rejected, (state) => {
      state.tasks = [];
      state.isLoading = false;
    });
    builder.addCase(addTaskApi.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(updateTaskApi.fulfilled, (state, action) => {
      const { id, name, email, text, isChanged, isDone } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.name = name;
        task.email = email;
        task.text = text;
        task.isChanged = isChanged;
        task.isDone = isDone;
      }
    });
  },
});

export default tasksSlice.reducer;
