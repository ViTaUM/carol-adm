import {
  Box,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions3 } from "../../data/mockData";
import Header from "../../components/Header";
import PaymentIcon from "@mui/icons-material/Payment"; // Usando como PIX
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Usando como Boleto
import CreditCardIcon from "@mui/icons-material/CreditCard"; // Cartão de Crédito

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Obter a data atual
  const agora = new Date();
  const data_atual = agora.getDate().toString().padStart(2, '0') + '/' + 
                     (agora.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                     agora.getFullYear().toString();

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Home"
          subtitle={`Bem vindo Mariana! Data: ${data_atual}`}
        />
      </Box>
      <TableContainer
        component={Paper}
        style={{ backgroundColor: colors.primary[400] }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>Nome da Aluna</TableCell>
              <TableCell>Atividade</TableCell>
              <TableCell>Mensalidade</TableCell>
              <TableCell>Vencimento</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Pagar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTransactions3.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>{transaction.activity}</TableCell>
                <TableCell>{transaction.mes}</TableCell>
                <TableCell>{transaction.vencimento}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  {transaction.status !== "PAGO" ? ( // Verifica se o status é diferente de "PAGO"
                    <>
                      <PaymentIcon
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      />{" "}
                      {/* PIX */}
                      <AccountBalanceIcon
                        style={{ marginRight: "5px", cursor: "pointer" }}
                      />{" "}
                      {/* Boleto */}
                      <CreditCardIcon style={{ cursor: "pointer" }} />{" "}
                      {/* Cartão de Crédito */}
                    </>
                  ) : (
                    <Typography>—</Typography> // Ou qualquer outra representação para "Nada a pagar"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
