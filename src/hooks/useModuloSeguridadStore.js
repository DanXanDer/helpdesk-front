import { useDispatch, useSelector } from "react-redux";
import {
  setUserLogin,
  setUserLogout,
} from "../store/moduloSeguridadSlice";

export const useModuloSeguridadStore = () => {
  const { user, status } = useSelector((state) => state.moduloSeguridadSlice);

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
