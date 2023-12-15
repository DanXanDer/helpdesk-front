import axios from "axios";

export const getImagenes = async (
  rutasImagenes,
  apiURL,
  idReporteIncidente
) => {
  try {
    const promesasImagenes = rutasImagenes.map(async ({ nombreImagen }) => {
      const response = await axios.post(
        `${apiURL}/reporte-incidente-imagen`,
        {
          idReporteIncidente,
          rutaImagen: nombreImagen,
        },
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data]);
      return URL.createObjectURL(blob);
    });
    const imagenesObtenidas = await Promise.all(promesasImagenes);
    const imagenesParaGallery = imagenesObtenidas.map((url, index) => ({
      original: url,
      thumbnail: url,
    }));
    return imagenesParaGallery;
  } catch (error) {
    console.log(error);
  }
};
