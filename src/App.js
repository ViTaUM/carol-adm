import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import SidebarHome from "./scenes/global/SidebarHome";
import Dashboard from "./scenes/dashboard";
import Home from "./scenes/home";
import RelAlunas from "./scenes/team";
import RelBalancete from "./scenes/relBalancete";
import RelUser from "./scenes/relUser";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import FormAtividade from "./scenes/formAtividade";
import FormUser from "./scenes/formUser";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Cadastro from "./components/Cadastro";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation(); // Hook para obter a localização atual

  // Verifica se o usuário está logado
  const isUserLoggedIn = () => !!localStorage.getItem('user');

  // Função para decidir qual sidebar renderizar
  const renderSidebar = () => {
    // Não renderiza o sidebar na rota '/' ou se o usuário não estiver logado
    if (!isUserLoggedIn() || location.pathname === "/" || location.pathname === "/cadastro") {
      return null;
    }
    
    // Renderiza o SidebarHome para a rota '/home' e o Sidebar para as demais rotas
    return location.pathname === "/home" ? <SidebarHome isSidebar={isSidebar} /> : <Sidebar isSidebar={isSidebar} />;
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {renderSidebar()}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/dashbord" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/relAlunas" element={<ProtectedRoute><RelAlunas /></ProtectedRoute>} />
              <Route path="/relUser" element={<ProtectedRoute><RelUser /></ProtectedRoute>} />
              <Route path="/relBalancete" element={<ProtectedRoute><RelBalancete /></ProtectedRoute>} />
              <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
              <Route path="/formUser" element={<ProtectedRoute><FormUser /></ProtectedRoute>} />
              <Route path="/formAtividade" element={<ProtectedRoute><FormAtividade /></ProtectedRoute>} />
              <Route path="/bar" element={<ProtectedRoute><Bar /></ProtectedRoute>} />
              <Route path="/pie" element={<ProtectedRoute><Pie /></ProtectedRoute>} />
              <Route path="/line" element={<ProtectedRoute><Line /></ProtectedRoute>} />
              <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/geography" element={<ProtectedRoute><Geography /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
