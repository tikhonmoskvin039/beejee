import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { instance } from "../../utils";

const initialState = {
  name: "",
  isFailed: false,
  error: null,
};

export const authApi = createAsyncThunk("/auth/signin", async (e) => {
  try {
    const data = {
      login: e.login,
      password: e.password,
    };
    const res = await instance.post("http://localhost:3100/auth/signin", {
      ...data,
    });
    if (res.status === 200) {
      message.success(`Welcome, ${res.data.login}!!!`);
      return res.data.login;
    } else if (res.status === 400) {
      return res.data.message;
    }
  } catch (err) {
    console.log("err", err);
    message.error("Invalid password or username");
    throw err;
  }
});

export const checkAuthApi = createAsyncThunk("/auth/isAuth", async (e) => {
  try {
    const res = await instance.get("http://localhost:3100/auth/isAuth");
    return res.data.user?.login;
  } catch (err) {
    console.log("err", err);
  }
});

export const logOutApi = createAsyncThunk("/auth", async (e) => {
  try {
    const res = await instance.get("http://localhost:3100/auth/");
    message.warning(`You are logged out, bye bye!`);
    return res.data.user?.login;
  } catch (err) {
    console.log("err", err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authApi.pending, (state) => {
      state.name = "";
      state.isFailed = null;
    });
    builder.addCase(authApi.fulfilled, (state, action) => {
      state.name = action.payload;
      state.isFailed = null;
      state.error = null;
    });
    builder.addCase(authApi.rejected, (state, action) => {
      state.name = "";
      state.isFailed = true;
      state.error = "Invalid password or username";
    });
    builder.addCase(checkAuthApi.fulfilled, (state, action) => {
      state.name = action.payload;
      state.isFailed = false;
    });
    builder.addCase(logOutApi.fulfilled, (state) => {
      state.name = "";
      state.isFailed = null;
    });
  },
});

export default authSlice.reducer;
