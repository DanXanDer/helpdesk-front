import { LocalDateTime } from "@js-joda/core";

export const formatFecha = (fecha) => {
  const formattedDate = LocalDateTime.parse(fecha);
  return (
    formattedDate.toLocalDate() +
    " - " +
    formattedDate.hour() +
    ":" +
    formattedDate.minute() +
    ":" +
    formattedDate.second()
  );
};
