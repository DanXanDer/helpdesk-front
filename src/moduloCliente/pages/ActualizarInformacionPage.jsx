import { Box } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { FormClave, FormDatos } from "../components";

export const ActualizarInformacionPage = () => {
  return (
    <HelpDeskLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        height="100%"
        p={1}
      >
        <FormDatos />
        <FormClave />
      </Box>
    </HelpDeskLayout>
  );
};
