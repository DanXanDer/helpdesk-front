import { useState } from "react";
import { getTickets, showAlertMessage } from "../../helpers";
import { HelpDeskLayout } from "../layout";
import { DataGridTable, PageTitle, TableTabs } from "./";

export const Tickets = ({ apiUrl, title, icon, tableColumns }) => {

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
            const tickets = await getTickets(`${apiUrl}?status=${ticketStatus}`);
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
                <PageTitle {...{ title, icon }} />
                <TableTabs
                    tabsLabels={ticketStatuses.map(({ status }) => status)}
                    value={value}
                    handleChange={handleChange}
                />
                <DataGridTable
                    height="85%"
                    tableColumns={tableColumns}
                    handleFunction={() => { }}
                    rows={tickets}
                    loadingRows={loadingRows}
                />
            </HelpDeskLayout>
        </>
    )
}
