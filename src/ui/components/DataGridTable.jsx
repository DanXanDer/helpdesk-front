import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LoadingRowsOverlay, CustomNoRowsOverlay } from "./";

export const DataGridTable = ({
  height,
  tableColumns,
  rows,
  loadingRows,
  params
}) => {
  return (
    <Box sx={{ height: height }} >
      <DataGrid
        autoPageSize
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={tableColumns(params)}
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
