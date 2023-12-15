import { Divider, Toolbar } from "@mui/material";
import { SideBarList } from "./SideBarList";

export const SideBarContent = () => {
  return (
    <div>
      <Toolbar />
      <Divider />
      <SideBarList />
    </div>
  );
};
