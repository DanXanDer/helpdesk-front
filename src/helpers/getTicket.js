import api from "../services/instance";
import { formatFecha } from "./formatFecha";
export const getTicket = async (id) => {
  const { data: ticket } = await api.get(`/tickets/${id}`);
  return {
    ...ticket,
    creationDate: formatFecha(ticket.creationDate),
    lastUpdate: formatFecha(ticket.lastUpdate),
  };
};
