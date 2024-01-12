import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
);

export const FileUploader = ({ filePondRef, field }) => {
  return (
    <FilePond
      ref={filePondRef}
      files={field.value}
      onupdatefiles={(fileItems) => {
        field.onChange(fileItems.map((fileItem) => fileItem.file));
      }}
      allowMultiple={true}
      allowReorder={true}
      allowDrop={false}
      allowImagePreview={false}
      maxFiles={3}
      credits={false}
      labelIdle='<span class="filepond--label-action">Haga click para seleccionar las imágenes</span> (3 imágenes como máximo)'
      acceptedFileTypes={["image/*"]}
    />
  );
};
