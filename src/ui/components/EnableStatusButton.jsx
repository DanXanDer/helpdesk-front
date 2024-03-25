import { Block, CheckCircle } from "@mui/icons-material"
import { Grid, IconButton } from "@mui/material"

export const EnableStatusButton = ({color, enabled, handleFunction}) => {
    return (
        <Grid item>
            <IconButton
                color={color}
                onClick={handleFunction}
                sx={{ mr: true }}
            >
                {enabled === true ? <Block /> : <CheckCircle />}
            </IconButton>
        </Grid>
    )
}
