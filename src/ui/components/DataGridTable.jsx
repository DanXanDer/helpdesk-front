import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LoadingRowsOverlay, CustomNoRowsOverlay } from "./";

export const DataGridTable = ({
  height,
  columnsTable,
  paramValue,
  rows,
  loadingRows,
}) => {
  return (
    <Box sx={{ height: height }}>
      <DataGrid
        autoPageSize
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columnsTable(paramValue)}
        rows={rows}
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: loadingRows ? LoadingRowsOverlay : CustomNoRowsOverlay,
          noResultsOverlay: CustomNoRowsOverlay,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </Box>
  );
};
