import api from "../services/instance";
export const getImages = async (urls, id) => {
  const imagesPromises = urls.map(async ({ url }) => {
    const response = await api.get(`/tickets/${id}/image?url=${url}`, {
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data]);
    return URL.createObjectURL(blob);
  });
  const fetchedImages = await Promise.all(imagesPromises);
  const galleryImages = fetchedImages.map((url, index) => ({
    original: url,
    thumbnail: url,
  }));
  return galleryImages;
};
