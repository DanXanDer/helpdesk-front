import { showAlertMessage } from "../../helpers";
import api from "../../services/instance";

export const getWorkers = async () => {
  try {
    const { data: workers } = await api.get("/workers");
    const workersWithId = workers.map(({user}) => {
      return {
        id: user.id,
        ...user,
      };
    });
    return workersWithId;
  } catch (error) {
    showAlertMessage("error", "Error", "Ha ocurrido un error inesperado.");
  }
};
