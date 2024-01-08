import { Box, Divider } from "@mui/material";
import { HelpDeskLayout } from "../../ui/layout";
import { FormClave, FormDatos } from "../components";

export const ActualizarInformacionPage = () => {
  return (
    <HelpDeskLayout>
      <Box
        display="flex"
        justifyContent="space-around"
        flexDirection="column"
        height="100%"
      >
        <FormDatos />
        <Divider />
        <FormClave />
      </Box>
    </HelpDeskLayout>
  );
};
