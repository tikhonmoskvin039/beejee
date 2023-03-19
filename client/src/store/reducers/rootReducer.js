import { combineReducers } from "redux";
import authSlice from "./authSlice";
import tasksSlice from "./tasksSlice";

export const rootReducer = combineReducers({
  profile: authSlice,
  tasks: tasksSlice,
});
