import { Typography } from "@mui/material";

export const RenderedEnabledCell = (value) => {
  const color = value === true ? "success.dark" : "error.dark";
  const text = value === true ? "Habilitado" : "Deshabilitado";
  return <Typography color={color}>{text}</Typography>;
};
