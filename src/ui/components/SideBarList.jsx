import { List } from "@mui/material";
import { SideBarListItem } from "./SideBarListItem";
import { useModuloSeguridadStore } from "../../hooks";

export const SideBarList = () => {
  const { user } = useModuloSeguridadStore();

  return (
    <List>
      {user.authorities.map(({ idPrivilege, ...authority }) => {
        return (
          <SideBarListItem
            key={idPrivilege}
            idPrivilege={idPrivilege}
            {...authority}
          />
        );
      })}
    </List>
  );
};
