const columnOptions = {
  headerAlign: "left",
  align: "left",
};

export const TableColumnsHistorialMensajes = () => {
  const columns = [
    {
      field: "emisor",
      headerName: "Emisor",
      width: 350,
      ...columnOptions,
    },
    {
      field: "receptor",
      headerName: "Receptor",
      width: 350,
      ...columnOptions,
    },
    {
      field: "mensaje",
      headerName: "Mensaje",
      width: 350,
      ...columnOptions,
    },
    {
      field: "fechaMensaje",
      headerName: "Fecha",
      width: 350,
      ...columnOptions,
    },
  ];

  return columns;
};
