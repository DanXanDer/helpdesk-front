import { Typography } from "@mui/material";

export const RenderedTicketStatusCell = (backgroundColor, text) => {
    const textStyle = {
        color: "white",
        backgroundColor: backgroundColor,
        padding: "4px 8px",
        borderRadius: "4px",
        display: "inline-block"
    };
    return <Typography style={textStyle}>{text}</Typography>;
}
