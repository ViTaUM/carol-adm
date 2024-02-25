import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import InputMask from "react-input-mask";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header
        title="CRIAR USUÁRIO"
        subtitle="Usuário para acessar o sistema administrativo."
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sobrenome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="E-mail"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                name="contact"
                label="WhatsApp"
                variant="filled"
                fullWidth
                error={touched.contact && Boolean(errors.contact)}
                helperText={touched.contact && errors.contact}
                InputProps={{
                  inputComponent: ({ inputRef, ...other }) => (
                    <InputMask
                      mask="(99) 99999-9999"
                      value={values.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...other}
                    >
                      {(inputProps) => (
                        <input ref={inputRef} {...inputProps} type="tel" />
                      )}
                    </InputMask>
                  ),
                }}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CPF"
                onBlur={handleBlur}
                value={values.cpf}
                name="cpf"
                error={!!touched.cpf && !!errors.cpf}
                helperText={touched.cpf && errors.cpf}
                sx={{ gridColumn: "span 4" }}
                InputProps={{
                  inputComponent: ({ inputRef, ...other }) => (
                    <InputMask
                      mask="999.999.999-99"
                      value={values.cpf}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...other}
                    >
                      {(inputProps) => (
                        <input ref={inputRef} {...inputProps} type="text" />
                      )}
                    </InputMask>
                  ),
                }}
              />
              <TextField
                name="nascimento"
                label="Data de Nascimento"
                variant="filled"
                fullWidth
                error={touched.nascimento && Boolean(errors.nascimento)}
                helperText={touched.nascimento && errors.nascimento}
                InputProps={{
                  inputComponent: ({ inputRef, ...other }) => (
                    <InputMask
                      mask="99/99/9999"
                      value={values.nascimento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      {...other}
                    >
                      {(inputProps) => (
                        <input ref={inputRef} {...inputProps} type="tel" />
                      )}
                    </InputMask>
                  ),
                }}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                name="profile"
                label="Perfil"
                select
                fullWidth
                variant="filled"
                value={values.profile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.profile && Boolean(errors.profile)}
                helperText={touched.profile && errors.profile}
                sx={{ gridColumn: "span 4" }} // Ajuste conforme necessário
              >
                <MenuItem value="Professor">Professor</MenuItem>
                <MenuItem value="Administrativo">Administrativo</MenuItem>
                <MenuItem value="Cliente">Cliente</MenuItem>
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Criar Usuario
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("O campo é obrigatório"),
  lastName: yup.string().required("O campo é obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O campo é obrigatório"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Número de telefone inválido")
    .required("O campo é obrigatório"),
  cpf: yup.string().required("O campo é obrigatório"),
  nascimento: yup.string().required("O campo é obrigatório"),
  profile: yup.string().required("O campo é obrigatório"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  cpf: "",
  nascimento: "",
  profile: "",
};

export default Form;
