import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const getTrabajadores = async () => {
  try {
    const { data } = await api.get("/modulo-administrador/trabajadores");
    const trabajadoresFetch = data.trabajadores.map((user) => {
      const { idUsuario } = user;
      return {
        id: idUsuario,
        ...user,
      };
    });
    return trabajadoresFetch;
  } catch (error) {
    showAlertMessage("error", "Error", "Ha ocurrido un error inesperado.");
  }
};
