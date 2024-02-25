import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [formValues, setFormValues] = useState({
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    whatsapp: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {
      nomeCompleto: !formValues.nomeCompleto,
      cpf: !formValues.cpf,
      dataNascimento: !formValues.dataNascimento,
      email: !validateEmail(formValues.email),
      whatsapp: !formValues.whatsapp,
    };

    setError(newError);

    if (!Object.values(newError).some((hasError) => hasError)) {
      setSubmitted(true);
      setTimeout(() => {
        navigate("/"); // Redireciona para a página de login
      }, 4000);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Cadastrar Usuario
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nomeCompleto"
            label="Nome Completo"
            name="nomeCompleto"
            value={formValues.nomeCompleto}
            onChange={handleChange}
            error={error && !formValues.nomeCompleto}
          />
          <InputMask
            mask="999.999.999-99"
            value={formValues.cpf}
            onChange={handleChange}
            disabled={false}
            maskChar=" "
          >
            {() => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
                error={error && !formValues.cpf}
              />
            )}
          </InputMask>
          <TextField
            margin="normal"
            required
            fullWidth
            id="dataNascimento"
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formValues.dataNascimento}
            onChange={handleChange}
            error={error && !formValues.dataNascimento}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            error={error && !formValues.email}
            helperText={error.email ? "Insira um e-mail válido." : ""}
          />
          <InputMask
            mask="(99) 9 9999-9999"
            value={formValues.whatsapp}
            onChange={handleChange}
            disabled={false}
            maskChar=" "
          >
            {() => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="whatsapp"
                label="WhatsApp"
                name="whatsapp"
                error={error && !formValues.whatsapp}
              />
            )}
          </InputMask>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => navigate('/')}
          >
            Voltar
          </Button>
          {submitted && (
            <Alert severity="success">Cadastro realizado com sucesso!</Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Cadastro;
