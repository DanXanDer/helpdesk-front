export const getActiveRoute = (authorities) => {
  const currentPath = window.location.pathname;
  const currentRoute = currentPath.split("/")[1];
  if (currentRoute === "bienvenida") return null;
  const { idPrivilege } = authorities.find(({ url }) => url === currentRoute);
  return idPrivilege;
};
