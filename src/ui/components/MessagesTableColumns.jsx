const columnOptions = {
    headerAlign: "left",
    align: "left",
    width: 160,
};

export const MessagesTableColumns = () => {
    const columns = [
        {
            field: "sender",
            headerName: "Emisor",
            flex: 1.1,
            ...columnOptions
        },
        {
            field: "receiver",
            headerName: "Receptor",
            flex: 1.1,
            ...columnOptions,
        },
        {
            field: "message",
            headerName: "Mensaje",
            flex: 1.1,
            ...columnOptions,
        },
        {
            field: "sentDate",
            headerName: "Fecha de envío",
            flex: 1.1,
            ...columnOptions,
        }
    ];
    return columns;
}
