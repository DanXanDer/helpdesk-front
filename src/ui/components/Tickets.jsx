import { useEffect, useState } from "react";
import { getTickets, showAlertMessage } from "../../helpers";
import { DataGridTable, PageTitle, TableTabs } from "./";
import { useNavigate } from "react-router-dom";
import api from "../../services/instance";
import { useSecurityModelStore } from "../../hooks";

export const Tickets = ({ title, icon, tableColumns }) => {

    const { user: { id, role } } = useSecurityModelStore();

    const [ticketStatuses, setTicketStatuses] = useState([]);
    const [value, setValue] = useState(0);
    const [loadingRows, setLoadingRows] = useState(true);
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data: ticketStatuses } = await api.get("/tickets/statuses");
                setTicketStatuses(ticketStatuses);
                const apiUrl = role === "Client" ? `/tickets?idClient=${id}&status=OPEN` : "/tickets?status=OPEN";
                const tickets = await getTickets(apiUrl);
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
            const apiUrl = () => {
                let baseUrl = `/tickets?status=${ticketStatus}`;
                if (role === "Cliente") {
                    return baseUrl + `&idClient=${id}`;
                } else {
                    return ticketStatus === "OPEN" ? baseUrl : baseUrl + `&idWorker=${id}`;
                }
            };
            const tickets = await getTickets(apiUrl());
            setTickets(tickets);
            setValue(newValue);
            setTimeout(() => {
                setLoadingRows(false);
            }, 1000);
        } catch (error) {
            console.log(error);
            showAlertMessage("error", "Hubo un error inesperado. Intente nuevamente");
        }
    }

    return (
        <>
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
        </>
    )
}
