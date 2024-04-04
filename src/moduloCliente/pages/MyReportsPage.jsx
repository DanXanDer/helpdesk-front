import { Tickets } from "../../ui/components";
import { HelpDeskLayout } from "../../ui/layout";
import { MyReportsTableColumns } from "../components";
import { Report } from "@mui/icons-material";

export const MyReportsPage = () => {

  const title = "Mis incidentes reportados";

  return (
    <HelpDeskLayout>
      <Tickets
        {...{
          title,
          icon: <Report />,
          tableColumns: MyReportsTableColumns
        }}
      />
    </HelpDeskLayout>
  );
};
