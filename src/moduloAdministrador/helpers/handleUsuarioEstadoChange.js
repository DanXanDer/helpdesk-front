import { showConfirmationMessage } from "../../helpers";
import api from "../../services/instance";
import { getClientes } from "./getClientes";
import { getTrabajadores } from "./getTrabajadores";

export const handleUsuarioEstadoChange = async (
  tipoUsuario,
  text,
  subText,
  nombreUsuario,
  row,
  handleUpdateUsuarios
) => {
  const isConfirmed = await showConfirmationMessage(
    text,
    `¿Está seguro de ${subText} el user ${nombreUsuario}?`,
    "warning"
  );
  if (!isConfirmed) return;
  const { estado, id: idUsuario } = row;
  const nuevoEstado = estado === 1 ? 0 : 1;
  const formData = { idUsuario, estado: nuevoEstado };
  await api.post("/modulo-administrador/usuarios/cambiar-estado", formData);
  const usuarios =
    tipoUsuario === "trabajador"
      ? await getTrabajadores()
      : await getClientes();
  handleUpdateUsuarios(usuarios);
};
