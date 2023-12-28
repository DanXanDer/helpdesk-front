import Swal from "sweetalert2";

export const showConfirmationMessage = async (title, text, icon) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
  });
  const { isConfirmed } = result;
  return isConfirmed;
};
