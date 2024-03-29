import { useDispatch, useSelector } from "react-redux";
import {
  setUsuarioLogin,
  setUsuarioLogout,
} from "../store/moduloSeguridadSlice";

export const useModuloSeguridadStore = () => {
  const { usuario, status } = useSelector((state) => state.moduloSeguridadSlice);

  const dispatch = useDispatch();

  const handleUsuarioLogin = (data) => {
    dispatch(setUsuarioLogin(data));
  };

  const handleUsuarioLogout = () => {
    dispatch(setUsuarioLogout());
  };

  return {
    //Properties
    usuario,
    status,

    //Methods
    handleUsuarioLogin,
    handleUsuarioLogout,
  };
};
