import { ConfirmationNumber } from "@mui/icons-material";
import { Tickets } from "../../ui/components";
import { HelpDeskLayout } from "../../ui/layout";
import { TicketsTableColumns } from "../components"

export const TicketsPage = () => {

  const title = "Lista de tickets";

  return (
    <HelpDeskLayout>
      <Tickets
        {...{
          title,
          icon: <ConfirmationNumber />,
          tableColumns: TicketsTableColumns 
        }}
      />
    </HelpDeskLayout>
  )
}
