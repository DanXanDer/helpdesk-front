import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getImages, getTicket } from "../../helpers";
import { TicketDetails } from "../../ui/components/TicketDetails";
import { HelpDeskLayout } from "../../ui/layout/HelpDeskLayout";
import { Grid } from "@mui/material";
import { DataGridTable, MessagesTableColumns } from "../../ui/components";
import { ClientInfo } from "../components/ClientInfo";

export const TicketDetailsPage = () => {

  const [ticket, setTicket] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingRows, setLoadingRows] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

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
    <>
      <HelpDeskLayout>
        <Grid container justifyContent="space-between" >
          <Grid item xs={12} lg={8}>
            <Grid container gap={1}>
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
          </Grid>
          <Grid item xs={12} lg={3.8}>
            {
              ticket?.idClient && (
                <ClientInfo idClient={ticket.idClient} />
              )
            }
          </Grid>
        </Grid>
      </HelpDeskLayout>
    </>
  )
}
