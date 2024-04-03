import { List } from "@mui/material";
import { SideBarListItem } from "./SideBarListItem";
import { useSecurityModelStore } from "../../hooks";

export const SideBarList = () => {
  const { user } = useSecurityModelStore();

  return (
    <List>
      {user.authorities
        .slice()
        .sort((a, b) => a.idPrivilege - b.idPrivilege)
        .map(({ idPrivilege, ...authority }) => {
          return (
            <SideBarListItem
              key={idPrivilege}
              idPrivilege={idPrivilege}
              {...authority}
            />
          );
        })
      }
    </List>
  );
};
