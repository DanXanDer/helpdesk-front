export const getActionInfo = (enabled) => {
  const actionText = enabled ? "Deshabilitar" : "Habilitar";
  const subText = enabled ? "deshabilitar" : "habilitar";
  const color = enabled ? "error" : "success";

  return {
    actionText,
    subText,
    color,
  };
};
