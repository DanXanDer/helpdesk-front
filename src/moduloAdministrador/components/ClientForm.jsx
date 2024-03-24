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

export const ClientForm = ({
  companies,
  control,
  errors,
  setValue,
  clearErrors,
}) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");

  const cleanBranchField = () => {
    setSelectedBranch("");
    setValue("branch", "");
  }

  const cleanAreaField = () => {
    setSelectedArea("");
    setValue("area", "");
  }

  const handleCompanyChange = async ({ target }) => {
    const { value } = target;
    setSelectedCompany(value);
    setValue("company", value);
    clearErrors("company");
    const { data: branches } = await api.get(`/company/${value}/branches?enabled=true`);
    setBranches(branches);
    cleanBranchField();
  };

  const handleBranchChange = async ({ target }) => {
    const { value } = target;
    setSelectedBranch(value);
    setValue("branch", value);
    clearErrors("branch");
    const { data: areas } = await api.get(`/branch/${value}/areas?enabled=true`);
    setAreas(areas);
    cleanAreaField();
  };

  const handleAreaChange = ({ target }) => {
    const { value } = target;
    setSelectedArea(value);
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
          <InputLabel id="select-company-label" error={!!errors.company}>
            Selecciona la empresa
          </InputLabel>
          <Controller
            name="company"
            defaultValue={selectedCompany}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={handleCompanyChange}
                labelId="select-company-label"
                id="select-company"
                value={selectedCompany}
                label="Selecciona la empresa"
                error={!!errors.company}
              >
                {companies.map(({ idCompany, name }) => (
                  <MenuItem key={idCompany} value={idCompany}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
            rules={{
              required: "La empresa es requerida",
            }}
          />
          {errors?.company ? (
            <FormHelperText error>{errors?.company?.message}</FormHelperText>
          ) : null}
          <FormHelperText></FormHelperText>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={selectedBranch !== "" ? 5.8 : 12}
        display={selectedCompany !== "" ? "flex" : "none"}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-branch-label" error={!!errors.branch}>
            Selecciona la sede
          </InputLabel>
          <Controller
            name="branch"
            defaultValue={selectedBranch}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={handleBranchChange}
                labelId="select-branch-label"
                id="select-branch"
                value={selectedBranch}
                label="Selecciona la sede"
                error={!!errors.branch}
              >
                {branches.map(({ idBranch, name }) => (
                  <MenuItem key={idBranch} value={idBranch}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
            rules={{
              required: "La sede es requerida",
            }}
          />
          {errors?.branch ? (
            <FormHelperText error>{errors?.branch?.message}</FormHelperText>
          ) : null}
          <FormHelperText></FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={5.8} display={selectedBranch !== "" ? "flex" : "none"}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-area-label" error={!!errors.area}>
            Selecciona el area
          </InputLabel>
          <Controller
            name="area"
            defaultValue={selectedArea}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onChange={handleAreaChange}
                labelId="select-area-label"
                id="select-area"
                value={selectedArea}
                label="Selecciona el area"
                error={!!errors.area}
              >
                {areas.map(({ idArea, name }) => (
                  <MenuItem key={idArea} value={idArea}>
                    {name}
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
