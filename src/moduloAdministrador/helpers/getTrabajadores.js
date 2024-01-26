import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const getTrabajadores = async () => {
  try {
    const { data } = await api.get("/modulo-administrador/trabajadores");
    const trabajadoresFetch = data.trabajadores.map((usuario) => {
      const { idUsuario } = usuario;
      return {
        id: idUsuario,
        ...usuario,
      };
    });
    return trabajadoresFetch;
  } catch (error) {
    showAlertMessage("error", "Error", "Ha ocurrido un error inesperado.");
  }
};
