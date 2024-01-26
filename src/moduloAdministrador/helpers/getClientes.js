import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const getClientes = async () => {
  try {
    const { data } = await api.get("/modulo-administrador/clientes");
    const clientesFetch = data.clientes.map((cliente) => {
      const { idUsuario } = cliente;
      return {
        id: idUsuario,
        ...cliente,
      };
    });
    return clientesFetch;
  } catch (error) {
    showAlertMessage("error", "Error", "Ha ocurrido un error inesperado.");
  }
};
