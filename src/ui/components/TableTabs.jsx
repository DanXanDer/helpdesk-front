import { Box, Tab, Tabs } from "@mui/material";

export const TableTabs = ({ tabsLabels, value, handleChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="basic tabs example"
      >
        {tabsLabels.map((tabLabel, index) => (
          <Tab label={tabLabel} key={index} />
        ))}
      </Tabs>
    </Box>
  );
};
