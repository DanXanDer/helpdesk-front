import { showConfirmationMessage } from "../../helpers";
import api from "../../services/instance";
import { getClientes } from "./getClientes";
import { getWorkers } from "./getWorkers";

export const handleUserStatusChange = async (
  text,
  subText,
  row,
  handleUpdateUsers
) => {
  const { id, username, role } = row;
  const isConfirmed = await showConfirmationMessage(
    text,
    `¿Está seguro de ${subText} el usuario ${username}?`,
    "warning"
  );
  if (!isConfirmed) return;

  await api.patch(`/users/${id}/update`, {
    enabled: !row.enabled
  });
  const users = await getWorkers();
    /* role === "Trabajador" ? await getWorkers() : await getClientes(); */
  handleUpdateUsers(users);
};
