import { Typography } from "@mui/material";

export const RenderedEnabledCell = (value) => {
  const backgroundColor = value === true ? "#4caf50" : "#f44336"; // Colores de fondo
  const text = value === true ? "Habilitado" : "Deshabilitado";

  const textStyle = {
    color: "white",
    backgroundColor: backgroundColor,
    padding: "4px 8px",
    borderRadius: "4px",
    display: "inline-block"
  };

  return <Typography style={textStyle}>{text}</Typography>;
};
