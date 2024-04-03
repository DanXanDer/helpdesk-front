import { useDispatch, useSelector } from "react-redux";
import {
  setUserLogin,
  setUserLogout,
} from "../store/securityModelSlice";

export const useSecurityModelStore = () => {
  const { user, status } = useSelector((state) => state.securityModelSlice);

  const dispatch = useDispatch();

  const handleUserLogin = (data) => {
    dispatch(setUserLogin(data));
  };

  const handleUserLogout = () => {
    dispatch(setUserLogout());
  };

  return {
    //Properties
    user,
    status,

    //Methods
    handleUserLogin,
    handleUserLogout,
  };
};
