import { useEffect, useState } from "react";
import { HelpDeskLayout } from "../../ui/layout";
import { formatFecha } from "../../helpers";
import { TableColumnsTickets } from "../components/TableColumnsTickets";
import { DataGridTable } from "../../ui/components";
import api from "../../services/instance";
import { TableTabs } from "../../ui/components/TableTabs";

const tabsLabels = [
  "Todos",
  "En atención",
  "Por confirmar atención",
  "Atendidos",
  "No conformes",
];

export const MisTicketsPage = () => {
  const [ticketsAsignados, setTicketsAsignados] = useState([]);
  const [value, setValue] = useState(0);
  const [loadingRows, setLoadingRows] = useState(true);
  const [ticketsAsignadosPorEstado, setTicketsAsignadosPorEstado] = useState(
    []
  );

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/modulo-trabajador/tickets");
      console.log(data);
      const dataWithId = data.map((ticket) => ({
        cliente: ticket.nombresCliente + " " + ticket.apellidosCliente,
        fechaFormateada: formatFecha(ticket.fecha),
        id: ticket.idTicket,
        ...ticket,
      }));
      setTicketsAsignados(dataWithId);
      setTicketsAsignadosPorEstado(dataWithId);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
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
    const ticketsAsignadosTable = estadoFiltrado
      ? ticketsAsignados.filter((ticket) => ticket.estado === estadoFiltrado)
      : ticketsAsignados;
    setTicketsAsignadosPorEstado(ticketsAsignadosTable);
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
        columnsTable={TableColumnsTickets}
        rows={ticketsAsignadosPorEstado}
        loadingRows={loadingRows}
      />
    </HelpDeskLayout>
  );
};
