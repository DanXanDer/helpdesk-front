import api from "../services/instance";
import { formatFecha } from "./formatFecha";

export const getTickets = async (apiUrl) => {
  const { data } = await api.get(apiUrl);
  return data.map((ticket) => {
    return {
      ...ticket,
      creationDate: formatFecha(ticket.creationDate),
      lastUpdate: formatFecha(ticket.lastUpdate),
    };
  });
};
