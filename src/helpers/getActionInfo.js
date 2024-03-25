export const getActionInfo = (enabled) => {
  const isEnabled = enabled === true;
  const actionText = isEnabled ? "Deshabilitar" : "Habilitar";
  const subText = isEnabled ? "deshabilitar" : "habilitar";
  const color = isEnabled ? "error" : "success";
  return {
    isEnabled,
    actionText,
    subText,
    color,
  };
};
