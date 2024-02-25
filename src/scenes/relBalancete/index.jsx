import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockTransactions2 } from "../../data/mockData";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const RelBalancete = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalPago, setTotalPago] = useState(0);
  const [totalPendente, setTotalPendente] = useState(0);
  const [filterModel, setFilterModel] = useState({});

  function applyFilters(data, filterModel) {
    // Se não houver filtros, retorna todos os dados.
    if (!filterModel.items || filterModel.items.length === 0) {
      return data;
    }
  
    return data.filter(row => 
      filterModel.items.every(filterItem => {
        const itemValue = String(row[filterItem.columnField]).toLowerCase();
        const filterValue = String(filterItem.value).toLowerCase();
        return itemValue.includes(filterValue); // Simples "contém" para este exemplo.
      })
    );
  }

  // Função atualizada para calcular ambos os totais
  const calculateTotals = (data) => {
    const totalPago = data
      .filter((item) => item.status === "PAGO")
      .reduce((acc, { valor }) => acc + parseFloat(valor.replace(",", ".")), 0);

    const totalPendente = data
      .filter((item) => item.status === "PENDENTE")
      .reduce((acc, { valor }) => acc + parseFloat(valor.replace(",", ".")), 0);

    setTotalPago(totalPago.toFixed(2));
    setTotalPendente(totalPendente.toFixed(2));
  };

  useEffect(() => {
    // Aplica os filtros baseados no modelo de filtro atual e recalcula os totais.
    const filteredData = applyFilters(mockTransactions2, filterModel);
    calculateTotals(filteredData);
  }, [filterModel, mockTransactions2]);

  const columns = [
    {
      field: "user",
      headerName: "Nome da Aluna",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "activity",
      headerName: "Atividade",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "mes",
      headerName: "Mês",
      flex: 1,
    },
    {
      field: "vencimento",
      headerName: "Vencimento",
      flex: 1,
      cellClassName: "email-column--cell",
    },
    {
      field: "valor",
      headerName: "Valor",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          R${params.row.valor}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) =>
        params.row.status === "PAGO" ? (
          <CheckCircleOutlineIcon
            style={{ color: theme.palette.success.main }}
          />
        ) : (
          <HighlightOffIcon style={{ color: theme.palette.error.main }} />
        ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Balancete"
        subtitle="Relatórios de informações contábeis da conta em movimento na empresa."
      />

      <Box
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`R$ ${totalPago}`}
            subtitle="Valor Total Pago"
            progress="0.60"
            icon={
              <CheckCircleOutlineIcon
                sx={{ color: theme.palette.success.main, fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`R$ ${totalPendente}`}
            subtitle="Valor Total Pendente"
            progress="0.40"
            icon={
              <HighlightOffIcon
                sx={{ color: theme.palette.error.main, fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockTransactions2}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
        />
      </Box>
    </Box>
  );
};

export default RelBalancete;
