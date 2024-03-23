import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const getClients = async () => {
  try {
    const { data: clients } = await api.get("/clients");
    const clientsWithId = clients.map(({ user, ...client }) => {
      return {
        id: user.id,
        ...user,
        ...client,
      };
    });
    return clientsWithId;
  } catch (error) {
    showAlertMessage("error", "Error", "Ha ocurrido un error inesperado.");
  }
};
