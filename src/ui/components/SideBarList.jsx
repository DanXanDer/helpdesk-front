import { List } from "@mui/material";
import React from "react";
import { SideBarListItem } from "./SideBarListItem";
import { useModuloSeguridadStore } from "../../hooks";

export const SideBarList = () => {
  const { usuario } = useModuloSeguridadStore();

  return (
    <List>
      {usuario.privilegios.map(({ idPrivilegio, ...privilegio }) => {
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
