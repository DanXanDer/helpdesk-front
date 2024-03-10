import { List } from "@mui/material";
import { SideBarListItem } from "./SideBarListItem";
import { useModuloSeguridadStore } from "../../hooks";

export const SideBarList = () => {
  const { user } = useModuloSeguridadStore();

  return (
    <List>
      {user.privilegios.map(({ idPrivilegio, ...privilegio }) => {
        return (
          <SideBarListItem
            key={idPrivilegio}
            idPrivilegio={idPrivilegio}
            {...privilegio}
          />
        );
      })}
    </List>
  );
};
