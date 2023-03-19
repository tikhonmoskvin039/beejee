import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import MyButton from "./components/MyButton/MyButton";
import Tasks from "./components/Tasks/Tasks";
import { checkAuthApi } from "./store/reducers/authSlice";

function App() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.profile?.name);

  useEffect(() => {
    dispatch(checkAuthApi());
  }, [dispatch, admin]);

  return (
    <div className="container">
      {admin ? <MyButton type={admin} /> : <MyButton type={""} />}
      <MyButton type={"add"} />
      <Tasks />
    </div>
  );
}

export default App;
