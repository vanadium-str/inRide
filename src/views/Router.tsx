import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { setUserId } from "../store/userData/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  userAdminSelector,
  userIdSelector,
} from "../store/userData/userDataSelectors";
import SignIn from "./auth/SignIn";
import { registration } from "../utils/constants";
import Registration from "./auth/Registration";

function Router() {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const admin = useSelector(userAdminSelector);

  useEffect(() => {
    dispatch(setUserId(window.localStorage.getItem("userId")));
    console.log(userId);
  }, []);

  return (
    <Routes>
      <Route path={`/`} element={<SignIn />} />
      <Route path={`/${registration}`} element={<Registration />} />
    </Routes>
  );
}

export default Router;
