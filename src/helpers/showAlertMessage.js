import Swal from "sweetalert2";

export const showAlertMessage = (icon, title, text) => {
  return Swal.fire({
    icon,
    title,
    text
  });
};
