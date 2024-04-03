import { Button, Grid } from "@mui/material"

export const EnableStatusButton = ({ color, enabled, handleFunction }) => {
    return (
        <Grid item>
            <Button
                color={color}
                onClick={handleFunction}
            >
                {enabled ? "Deshabilitar" : "Habilitar"}
            </Button>
        </Grid>
    )
}


