import { showConfirmationMessage } from "../../helpers";
import api from "../../services/instance";
import { getClients } from "./getClients";
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
  const users = role === "Trabajador" ? await getWorkers() : await getClients();
    /* role === "Trabajador" ? await getWorkers() : await getClients(); */
  handleUpdateUsers(users);
};
