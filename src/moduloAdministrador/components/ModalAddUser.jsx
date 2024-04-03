import { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import api from "../../services/instance";
import { showAlertMessage, showConfirmationMessage } from "../../helpers";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { Add, PersonAdd, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { ModalTitle } from "../../ui/components";
import { ClientForm } from "./ClientForm";
import { useNavigate } from "react-router-dom";

export const ModalAddUser = () => {

    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [roles, setRoles] = useState();
    const [selectedRole, setSelectedRole] = useState("");
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        clearErrors,
        unregister,
        watch,
        getValues,
        reset
    } = useForm();

    const handleClose = () => {
        setOpen(false);
    }

    const handleClickOpen = async () => {
        try {
            const { data: roles } = await api.get("/roles");
            setRoles(roles);
            setOpen(true);
        } catch (error) {
            showAlertMessage("error", "Error", "Ha ocurrido un error inesperado");
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowRePassword = () => {
        setShowRePassword(!showRePassword);
    };

    const passwordMatch =
        watch("password") !== watch("rePassword") && getValues("rePassword") ? true : false;

    const handleRoleChange = async ({ target }) => {
        const { value } = target;
        setSelectedRole(value);
        setValue("role", value);
        clearErrors("role");
        if (value === 3) {
            try {
                const { data: companies } = await api.get("/company?enabled=true");
                setCompanies(companies);
            } catch (error) {
                showAlertMessage("error", "Error", "Ha ocurrido un error inesperado");
            }
        } else {
            unregister("company");
            unregister("branch");
            unregister("area");
            unregister("anydesk");
            unregister("teamviewer");
            setCompanies([]);
        }
    };

    const onSubmit = async (formData) => {
        const isConfirmed = await showConfirmationMessage(
            "Crear usuario",
            "¿Está seguro de continuar?",
            "warning"
        );
        if (!isConfirmed) return;
        const { role, username, password, rePassword, name, lastname, email } = formData;
        let formDataToSent = {
            user: {
                role: {
                    idRole: role
                },
                username,
                password,
                rePassword,
                name,
                lastname,
                email
            }
        }
        if (role == 3) {
            const { area, anydesk, teamviewer } = formData;
            formDataToSent = {
                ...formDataToSent,
                area: {
                    idArea: area
                },
                anydesk,
                teamviewer
            }
        }
        const roleName = roles.find(({ idRole }) => idRole === formData.role).authority;
        const endpointPath = roleName === "Trabajador" ? "/workers" : "/clients";
        try {
            await api.post(endpointPath, formDataToSent);
            showAlertMessage(
                "success",
                "Usuario creado",
                "El usuario se creó correctamente"
            );
            reset();
            setOpen(false);
        } catch ({ response }) {
            const { message } = response.data;
            showAlertMessage("error", "Error", message);
        }
    }

    return (
        <Box>
            <Button
                onClick={handleClickOpen}
                type="button"
                variant="contained"
                startIcon={<Add />}
            >
                Usuario
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <ModalTitle icon={<PersonAdd />} title="Registrar usuario" />
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        noValidate
                        method="POST"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container justifyContent="space-between">
                            <Grid item xs={12}>
                                <Controller
                                    defaultValue=""
                                    name="username"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Ingresa nombre de usuario"
                                            margin="normal"
                                            fullWidth
                                            autoComplete="username"
                                            autoFocus
                                            error={!!errors.username}
                                            helperText={errors?.username?.message}
                                        />
                                    )}
                                    rules={{
                                        required: "El usuario es requerido",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={5.8}>
                                <FormControl variant="outlined" fullWidth margin="normal">
                                    <InputLabel
                                        htmlFor="outlined-adornment-password"
                                        error={!!errors.password}
                                    >
                                        Ingresa la clave
                                    </InputLabel>
                                    <OutlinedInput
                                        defaultValue=""
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        error={!!errors.password}
                                        label="Ingresa la clave"
                                        {...register("password", {
                                            required: "La clave es requerida",
                                            minLength: {
                                                value: 8,
                                                message: "La clave debe tener al menos 8 caracteres",
                                            },
                                        })}
                                    />
                                    {errors?.password && (
                                        <FormHelperText error>{errors?.password?.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={5.8}>
                                <FormControl variant="outlined" fullWidth margin="normal">
                                    <InputLabel
                                        htmlFor="outlined-adornment-rePassword"
                                        error={!!errors.rePassword || passwordMatch}
                                    >
                                        Confirma la clave
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-rePassword"
                                        type={showRePassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowRePassword} edge="end">
                                                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        error={!!errors.rePassword || passwordMatch}
                                        label="Confirma la clave"
                                        {...register("rePassword", {
                                            required: "La confirmación de la clave es requerida",
                                            minLength: {
                                                value: 8,
                                                message: "La clave debe tener al menos 8 caracteres",
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: "La clave debe tener máximo 16 caracteres",
                                            },
                                        })}
                                    />
                                    {errors?.rePassword ? (
                                        <FormHelperText error>
                                            {errors?.rePassword?.message}
                                        </FormHelperText>
                                    ) : passwordMatch ? (
                                        <FormHelperText error>Las claves no coinciden</FormHelperText>
                                    ) : null}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    defaultValue=""
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Ingrese nombre"
                                            margin="normal"
                                            fullWidth
                                            autoComplete="name"
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                        />
                                    )}
                                    rules={{
                                        required: "El nombre es requerido",
                                        pattern: {
                                            value: /^[a-zA-Z\s]*$/,
                                            message: "El nombre solo puede contener letras",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    defaultValue=""
                                    name="lastname"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Ingresa apellidos"
                                            margin="normal"
                                            fullWidth
                                            autoComplete="lastname"
                                            error={!!errors.lastname}
                                            helperText={errors?.lastname?.message}
                                        />
                                    )}
                                    rules={{
                                        required: "Apellidos son requeridos",
                                        pattern: {
                                            value: /^[a-zA-Z\s]*$/,
                                            message: "Apellidos solo pueden contener letras",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    defaultValue=""
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Ingresa correo electrónico"
                                            margin="normal"
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={errors?.email?.message}
                                        />
                                    )}
                                    rules={{
                                        required: "El correo electrónico es requerido",
                                        pattern: {
                                            value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                            message: "El correo electrónico no es válido",
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="select-role-label" error={!!errors.role}>
                                        Rol de usuario
                                    </InputLabel>
                                    <Controller
                                        name="role"
                                        control={control}
                                        defaultValue={selectedRole}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                onChange={handleRoleChange}
                                                labelId="select-role-label"
                                                id="select-role"
                                                label="Rol de usuario"
                                                error={!!errors.role}
                                            >
                                                {
                                                    roles?.map(({ idRole, authority }) => (
                                                        <MenuItem key={idRole} value={idRole}>
                                                            {authority}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                        rules={{
                                            required: "El rol del usuario es requerido",
                                        }}
                                    />
                                    {errors?.role ? (
                                        <FormHelperText error>{errors?.role?.message}</FormHelperText>
                                    ) : null}
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {selectedRole === 3 ? (
                            <ClientForm
                                companies={companies}
                                errors={errors}
                                control={control}
                                setValue={setValue}
                                clearErrors={clearErrors}
                            />
                        ) : null}
                        <DialogActions>
                            <Button variant="contained" startIcon={<Save />} type="submit" >Guardar</Button>
                        </DialogActions>
                    </Box>

                </DialogContent>
            </Dialog>
        </Box >
    )
}
