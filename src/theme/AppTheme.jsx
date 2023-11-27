import { ThemeProvider } from "@emotion/react"
import { muiTheme } from "./muiTheme"
import { CssBaseline } from "@mui/material"

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={muiTheme} >
        <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}
