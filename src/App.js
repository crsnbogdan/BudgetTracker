import React, { useContext } from "react";
import "./App.css";
import { AppContext } from "./Context/ContextProvider";
import ExpenseList from "./Components/ExpenseList/ExpenseList";
import BudgetGraphs from "./Components/BudgetGraphs/BudgetGraphs";
import { Box, Typography, styled, IconButton } from "@mui/material";

const StyledButton = styled(Box)({
  backgroundColor: "#5a67d8",
  color: "#ffffff",
  padding: "12px 16px",
  fontSize: "14px",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#434190",
  },
});
function App() {
  const {
    state,
    showEditExpenseModal,
    setSelectedExpense,
    showBudgetModal,
    showExpenseModal,
  } = useContext(AppContext);

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    showEditExpenseModal(true);
  };

  return (
    <div className="app">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <div className="top-section">
          <div className="expense-visualization">
            <h2>Visualization</h2>
          </div>

          <div className="budget-tracking">
            <BudgetGraphs />
          </div>
        </div>
        <Box className="control-section">
          <StyledButton onClick={() => showBudgetModal(true)}>
            Edit Budget
          </StyledButton>
          <StyledButton onClick={() => showExpenseModal(true)}>
            Add Expense
          </StyledButton>
        </Box>
        <ExpenseList onEditExpense={handleEditExpense} />
      </main>
    </div>
  );
}

export default App;
