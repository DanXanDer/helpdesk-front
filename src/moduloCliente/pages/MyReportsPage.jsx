import { HelpDeskLayout } from "../../ui/layout";
import { DataGridTable, PageTitle } from "../../ui/components";
import { useEffect, useState } from "react";
import { getTickets, showAlertMessage } from "../../helpers";
import { MyReportsTableColumns } from "../components";
import api from "../../services/instance";
import { TableTabs } from "../../ui/components/TableTabs";
import { Report } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const MyReportsPage = () => {

  const navigate = useNavigate();
  const [ticketStatuses, setTicketStatuses] = useState([]);
  const [value, setValue] = useState(0);
  const [loadingRows, setLoadingRows] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data: ticketStatuses } = await api.get("/tickets/statuses");
        setTicketStatuses(ticketStatuses);
        const tickets = await getTickets("OPEN");
        setTickets(tickets);
        setTimeout(() => {
          setLoadingRows(false);
        }, 1000);
      } catch (error) {
        navigate("/error");
      }
    })();
  }, [])

  const handleChange = async (event, newValue) => {
    try {
      setLoadingRows(true);
      const ticketStatus = ticketStatuses[newValue].name;
      const tickets = await getTickets(ticketStatus);
      setTickets(tickets);
      setValue(newValue);
      setTimeout(() => {
        setLoadingRows(false);
      }, 1000);
    } catch (error) {
      showAlertMessage("error", "Hubo un error inesperado. Intente nuevamente");
    }
  }

  return (
    <>
      <HelpDeskLayout>
        <PageTitle icon={<Report />} title="Mis incidentes reportados" />
        <TableTabs
          tabsLabels={ticketStatuses.map(({ status }) => status)}
          value={value}
          handleChange={handleChange}
        />
        <DataGridTable
          height="85%"
          tableColumns={MyReportsTableColumns}
          handleFunction={() => { }}
          rows={tickets}
          loadingRows={loadingRows}
        />
      </HelpDeskLayout>
    </>
  );
};
