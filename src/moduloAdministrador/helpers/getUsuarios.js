import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const getUsuarios = async () => {
  try {
    const { data } = await api.get("/gestion-sistema/usuarios");
    const usuariosFetch = data.usuarios.map((usuario) => {
      const {
        idUsuario,
        nombreUsuario,
        nombres,
        apellidos,
        correo,
        tipo,
        estado,
      } = usuario;
      return {
        id: idUsuario,
        nombreUsuario,
        nombres,
        apellidos,
        correo,
        tipo,
        estado,
      };
    });
    return {
      usuarios: usuariosFetch,
    };
  } catch (error) {
    const { mensaje } = error.response.data.error;
    showAlertMessage("error", "Error", mensaje);
  }
};
