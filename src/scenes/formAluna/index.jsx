import { useState } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import InputMask from "react-input-mask";

const FormAluna = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header
        title="ADICIONAR ALUNA(O)"
        subtitle="Cadastrar aluna(o) no sistema."
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
                label="CPF"
                onBlur={handleBlur}
                value={values.cpf}
                name="cpf"
                error={!!touched.cpf && !!errors.cpf}
                helperText={touched.cpf && errors.cpf}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                name="atividade"
                label="Atividade"
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
                <MenuItem value="Moderna">Dança Moderna</MenuItem>
                <MenuItem value="JAZZ">JAZZ</MenuItem>
                <MenuItem value="BALLET">BALLET</MenuItem>
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" gap={1}>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setShowAdditionalFields(!showAdditionalFields)}
              >
                Adicionar Responsável
              </Button>
              <Button type="submit" color="secondary" variant="contained" disable="disable">
                Adicionar Aluna(o)
              </Button>
            </Box>
            <br />
            {showAdditionalFields && (
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  name="parente"
                  label="Parentesco"
                  select
                  fullWidth
                  variant="filled"
                  value={values.parente}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.parente && Boolean(errors.parente)}
                  helperText={touched.parente && errors.parente}
                  sx={{ gridColumn: "span 4" }} // Ajuste conforme necessário
                >
                  <MenuItem value="Avozinha">Avó</MenuItem>
                  <MenuItem value="Avozinho">Avô</MenuItem>
                  <MenuItem value="MAE">Mãe</MenuItem>
                  <MenuItem value="PAI">Pai</MenuItem>
                  <MenuItem value="TIA">Tia</MenuItem>
                  <MenuItem value="TIO">Tio</MenuItem>
                </TextField>
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
                  label="CPF"
                  onBlur={handleBlur}
                  value={values.cpf}
                  name="cpf"
                  error={!!touched.cpf && !!errors.cpf}
                  helperText={touched.cpf && errors.cpf}
                  sx={{ gridColumn: "span 2" }}
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
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("O campo é obrigatório"),
  lastName: yup.string().required("O campo é obrigatório"),
  cpf: yup.string().required("O campo é obrigatório"),
  nascimento: yup.string().required("O campo é obrigatório"),
  atividade: yup.string().required("O campo é obrigatório"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  cpf: "",
  nascimento: "",
  atividade: "",
};

export default FormAluna;
