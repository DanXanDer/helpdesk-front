import { useNavigate, useParams } from "react-router-dom";
import { HelpDeskLayout } from "../../ui/layout/HelpDeskLayout";
import { Grid } from "@mui/material";
import { getImages, getTicket } from "../../helpers";
import { useEffect, useState } from "react";
import {
  DataGridTable, TicketDetails, MessagesTableColumns,
} from "../../ui/components";

export const MyReportDetailsPage = () => {

  const [ticket, setTicket] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const ticket = await getTicket(id);
        const galleryImages = await getImages(ticket.images, id);
        setTicket(ticket);
        setGalleryImages(galleryImages);
        setTimeout(() => {
          setLoadingRows(false);
        }, 1000);
      } catch (error) {
        navigate("/error");
      }
    })();
  }, [])

  return (
    <HelpDeskLayout>
      <Grid container>
        <Grid item xs={12}>
          <TicketDetails {...{ ticket, galleryImages }} />
        </Grid>
        <Grid item xs={12}>
          {
            ticket?.messages && (
              <DataGridTable
                height="50vh"
                tableColumns={MessagesTableColumns}
                rows={ticket.messages}
                loadingRows={loadingRows}
              />
            )
          }
        </Grid>
      </Grid>
    </HelpDeskLayout>
  );
};
