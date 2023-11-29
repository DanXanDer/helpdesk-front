import { useDispatch, useSelector } from "react-redux";
import { setUsuarioLogin } from "../store/moduloSeguridadSlice";

export const useModuloSeguridadStore = () => {
  const { usuario } = useSelector((state) => state.moduloSeguridadSlice);

  const dispatch = useDispatch();

  const handleUsuarioLogin = (data) => {
    dispatch(setUsuarioLogin(data));
  };

  return {
    //Properties
    usuario,

    //Methods
    handleUsuarioLogin,
  };
};
