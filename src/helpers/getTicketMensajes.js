import api from "../services/instance"
import { formatFecha } from "./formatFecha";

export const getTicketMensajes = async (idTicket) => {
  const { data } = await api.get(
    `/modulo-sistema/tickets/${idTicket}/mensajes`
  );
  const ticketMensajes = data.map((mensaje) => ({
    id: mensaje.idMensaje,
    fechaMensaje: formatFecha(mensaje.fecha),
    ...mensaje,
  }));

  return ticketMensajes;
};
