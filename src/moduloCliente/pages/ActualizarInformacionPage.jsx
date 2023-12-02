import { HelpDeskLayout } from "../../ui/layout";
import { FormClave, FormDatos } from "../components";

export const ActualizarInformacionPage = () => {
  return (
    <HelpDeskLayout>
      <FormDatos />
      <FormClave/>
    </HelpDeskLayout>
  );
};
