import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  localStorage.removeItem("user");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ username }));
  
    // Verifica se o nome do usuário é "Carol" e redireciona conforme necessário
    if (username === "Carol" || username === "carol") {
      navigate("/dashbord"); // Para usuários "Carol", vá para o dashboard
    } else {
      navigate("/home"); // Para outros usuários, vá para a home
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Studio Carol Dance
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => navigate('/cadastro')} // Certifique-se de ter a rota '/cadastro' definida nas suas rotas
          >
            Cadastrar-se
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
