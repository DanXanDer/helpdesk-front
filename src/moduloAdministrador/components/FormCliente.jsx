import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import api from "../../services/instance";

export const FormCliente = ({
  empresas,
  control,
  errors,
  setValue,
  clearErrors,
}) => {
  const [selectEmpresa, setSelectEmpresa] = useState("");
  const [sedes, setSedes] = useState([]);
  const [selectSede, setSelectSede] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectArea, setSelectArea] = useState("");

  const handleSeleccionEmpresa = async ({ target }) => {
    const { value } = target;
    setSelectEmpresa(value);
    setValue("empresa", value);
    clearErrors("empresa");
    const { data } = await api.get(`/gestion-sistema/sedes?idEmpresa=${value}`);
    setSedes(data.sedes);
    setSelectSede("");
    setSelectArea("");
    setValue("sede", "");
    setValue("area", "");
    setAreas([]);
  };

  const handleSeleccionSede = async ({ target }) => {
    const { value } = target;
    setSelectSede(value);
    setValue("sede", value);
    clearErrors("sede");
    const { data } = await api.get(`/gestion-sistema/areas?idSede=${value}`);
    setAreas(data.areas);
    setSelectArea("");
    setValue("area", "");
  };

  const handleSeleccionArea = ({ target }) => {
    const { value } = target;
    setSelectArea(value);
    setValue("area", value);
    clearErrors("area");
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12} md={5.8}>
        <Controller
          defaultValue=""
          name="anydesk"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingrese el número de AnyDesk"
              margin="normal"
              fullWidth
              error={!!errors.anydesk}
              helperText={errors?.anydesk?.message}
            />
          )}
          rules={{
            required: "El número de AnyDesk es requerido",
            pattern: {
              value: /^[0-9]*$/,
              message: "El número de AnyDesk solo puede contener números",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={5.8}>
        <Controller
          defaultValue=""
          name="teamviewer"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ingrese el número de TeamViewer"
              margin="normal"
              fullWidth
              error={!!errors.teamviewer}
              helperText={errors?.teamviewer?.message}
            />
          )}
          rules={{
            required: "El número de TeamViewer es requerido",
            pattern: {
              value: /^[0-9]*$/,
              message: "El número de TeamViewer solo puede contener números",
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-empresa-label" error={!!errors.empresa}>
            Selecciona la empresa
          </InputLabel>
          <Controller
            name="empresa"
            defaultValue={selectEmpresa}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={handleSeleccionEmpresa}
                labelId="select-empresa-label"
                id="select-empresa"
                value={selectEmpresa}
                label="Selecciona la empresa"
                error={!!errors.empresa}
              >
                {empresas.map(({ idEmpresa, nombreEmpresa }) => (
                  <MenuItem key={idEmpresa} value={idEmpresa}>
                    {nombreEmpresa}
                  </MenuItem>
                ))}
              </Select>
            )}
            rules={{
              required: "La empresa es requerida",
            }}
          />
          {errors?.empresa ? (
            <FormHelperText error>{errors?.empresa?.message}</FormHelperText>
          ) : null}
          <FormHelperText></FormHelperText>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={selectSede !== "" ? 5.8 : 12}
        display={selectEmpresa !== "" ? "flex" : "none"}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-sede-label" error={!!errors.sede}>
            Selecciona la sede
          </InputLabel>
          <Controller
            name="sede"
            defaultValue={selectSede}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={handleSeleccionSede}
                labelId="select-sede-label"
                id="select-sede"
                value={selectSede}
                label="Selecciona la sede"
                error={!!errors.sede}
              >
                {sedes.map(({ idSede, nombreSede }) => (
                  <MenuItem key={idSede} value={idSede}>
                    {nombreSede}
                  </MenuItem>
                ))}
              </Select>
            )}
            rules={{
              required: "La sede es requerida",
            }}
          />
          {errors?.sede ? (
            <FormHelperText error>{errors?.sede?.message}</FormHelperText>
          ) : null}
          <FormHelperText></FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={5.8} display={selectSede !== "" ? "flex" : "none"}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-area-label" error={!!errors.area}>
            Selecciona el area
          </InputLabel>
          <Controller
            name="area"
            defaultValue={selectArea}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={handleSeleccionArea}
                labelId="select-area-label"
                id="select-area"
                value={selectArea}
                label="Selecciona el area"
                error={!!errors.area}
              >
                {areas.map(({ idArea, nombreArea }) => (
                  <MenuItem key={idArea} value={idArea}>
                    {nombreArea}
                  </MenuItem>
                ))}
              </Select>
            )}
            rules={{
              required: "El area es requerida",
            }}
          />
          {errors?.area ? (
            <FormHelperText error>{errors?.area?.message}</FormHelperText>
          ) : null}
          <FormHelperText></FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
};
