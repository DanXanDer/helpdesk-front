import { HelpDeskLayout } from "../../ui/layout";
import api from "../../services/instance";
import { useEffect, useState } from "react";
import { DataGridTable, PageTitle, TableTabs } from "../../ui/components";
import { formatFecha } from "../../helpers";
import { AllTicketsTableColumns } from "../components/AllTicketsTableColumns";
import { Report } from "@mui/icons-material";

const tabsLabels = [
  "Todos",
  "En atención",
  "Por confirmar atención",
  "Atendidos",
  "No conformes",
];

export const AllTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketsPorEstado, setTicketsPorEstado] = useState([]);
  const [value, setValue] = useState(0);
  const [loadingRows, setLoadingRows] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/modulo-administrador/tickets");
      const ticketsWithId = data.tickets.map((ticket) => ({
        client: ticket.nombresCliente + " " + ticket.apellidosCliente,
        trabajador: ticket.nombresTrabajador + " " + ticket.apellidosTrabajador,
        ticketFechaFormateada: formatFecha(ticket.ticketFecha),
        reporteFechaFormateada: formatFecha(ticket.reporteFecha),
        id: ticket.idTicket,
        ...ticket,
      }));
      setTickets(ticketsWithId);
      setTicketsPorEstado(ticketsWithId);
      setTimeout(() => {
        setLoadingRows(false);
      }, 300);
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setLoadingRows(true);
    const estadosFiltrados = {
      1: "En atención",
      2: "Por confirmar atención",
      3: "Atendido",
      4: "No conforme",
    };
    const estadoFiltrado = estadosFiltrados[newValue];
    const ticketsTable = estadoFiltrado
      ? tickets.filter((ticket) => ticket.enabled === estadoFiltrado)
      : tickets;
    setTicketsPorEstado(ticketsTable);
    setValue(newValue);
    setTimeout(() => {
      setLoadingRows(false);
    }, 300);
  };

  return (
    <HelpDeskLayout>
      <TableTabs
        tabsLabels={tabsLabels}
        value={value}
        handleChange={handleChange}
      />
      <DataGridTable
        height="80%"
        tableColumns={AllTicketsTableColumns}
        rows={ticketsPorEstado}
        loadingRows={loadingRows}
      />
    </HelpDeskLayout>
  );
};
