import { useEffect, useState } from "react";
import { HelpDeskLayout } from "../../ui/layout";
import { axiosGetRequest } from "../../helpers";
import { getApiUrl } from "../helpers";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { TableColumnsTickets } from "../components/TableColumnsTickets";
import { CustomNoRowsOverlay } from "../../ui/components";

export const MisTicketsPage = () => {
  const [ticketsAsignados, setTicketsAsignados] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axiosGetRequest(`${getApiUrl()}/tickets`);
      const dataWithId = data.map((ticket) => ({
        ...ticket,
        id: ticket.idTicket,
      }));
      setTicketsAsignados(dataWithId);
    })();
  }, []);

  return (
    <HelpDeskLayout>
      <Box sx={{ height: 700 }}>
        <DataGrid
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={TableColumnsTickets()}
          rows={ticketsAsignados}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
            noResultsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </HelpDeskLayout>
  );
};
