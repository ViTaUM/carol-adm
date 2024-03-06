import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Box,
  Alert,
} from "@mui/material";
import Logo from "./logo.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  localStorage.removeItem("user");

  const handleLogin = (e) => {
    e.preventDefault();

    // Limpa erros anteriores
    setError("");

    // Verifica se os campos são válidos
    if (!username.trim() || !password.trim()) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (password !== "123456") {
      setError("Senha incorreta! Tente novamente.");
      return;
    }

    // Aqui você pode adicionar mais validações conforme necessário
    // Por exemplo, verificar o comprimento da senha
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, password }));

    if (
      username === "Carol" ||
      username === "carol" ||
      username === "Bia" ||
      username === "bia"
    ) {
      navigate("/dashbord");
    } else {
      navigate("/home");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: "1px solid #e0e0e0", // Adiciona uma borda ao redor do container
        borderRadius: "8px", // Arredonda as bordas do container
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)", // Adiciona uma leve sombra ao redor do container
        marginTop: 8,
        padding: "20px", // Adiciona um pouco de espaço interno para não colar os elementos na borda
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={Logo} // Substitua "/caminho/para/sua/imagem.jpg" pelo caminho correto da sua imagem
          alt="Studio Carol Dance"
          style={{ maxWidth: "100%", height: "auto", marginBottom: 20 }} // Ajustes de estilo podem ser feitos conforme necessário
        />
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuário"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              style: { color: "white" }, // Ajusta a cor do label para branco
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" // Ajusta a cor do botão para a cor primária (opcional)
            sx={{
              mt: 3,
              mb: 1,
              backgroundColor: "#C2185B", // Cor semelhante ao logo
              "&:hover": {
                backgroundColor: "#AD1457", // Um pouco mais escuro que a cor base para o efeito hover
              },
            }}
          >
            Entrar
          </Button>
          {/* <Button
            fullWidth
            variant="contained" // Altera o estilo do botão para outlined para diferenciar do botão de entrar
            onClick={() => navigate("/cadastro")} // Certifique-se de ter a rota '/cadastro' definida nas suas rotas
            color="primary" // Ajusta a cor do botão para secundária (opcional)
            sx={{
              mb: 2,
              backgroundColor: "#C2185B", // Cor semelhante ao logo
              "&:hover": {
                backgroundColor: "#AD1457", // Um pouco mais escuro que a cor base para o efeito hover
              },
            }}
          >
            Cadastrar-se
          </Button> */}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
