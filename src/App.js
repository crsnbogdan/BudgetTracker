import React, { useContext, useState } from "react";
import "./App.css";
import { AppContext } from "./Context/ContextProvider";
import ExpenseList from "./Components/Containers/ExpenseList/ExpenseList";
import BudgetGraphs from "./Components/Containers/BudgetGraphs/BudgetGraphs";
import BudgetChart from "./Components/Containers/BudgetChart/BudgetChart";
import Button from "./Components/UI/Button/Button";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const {
    state,
    showEditExpenseModal,
    setSelectedExpense,
    showBudgetModal,
    showExpenseModal,
    removeMultipleExpenses,
  } = useContext(AppContext);

  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [visualizationType, setVisualizationType] = useState("graphs");

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    showEditExpenseModal(true);
  };

  const toggleMultiSelectMode = () => {
    setMultiSelectMode((prevMode) => !prevMode);
    setSelectedExpenses([]);
  };

  const handleSelectExpenses = (expenses) => {
    setSelectedExpenses(expenses);
  };

  const handleRemoveSelectedExpenses = () => {
    const ids = selectedExpenses.map((expense) => expense.id);
    removeMultipleExpenses(ids);
    setSelectedExpenses([]);
    setMultiSelectMode(false);
  };

  const handleVisualizationChange = (event) => {
    setVisualizationType(event.target.value);
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
            <FormControl variant="outlined" className="visualization-select">
              <InputLabel className="inputLabel">Visualization</InputLabel>
              <Select
                value={visualizationType}
                onChange={handleVisualizationChange}
                label="Visualization"
                className="outlinedInputRoot"
                MenuProps={{
                  PaperProps: {
                    style: {
                      backgroundColor: "#1e1e3a",
                      color: "#ffffff",
                    },
                  },
                }}
              >
                <MenuItem value="graphs">Graphs</MenuItem>
                <MenuItem value="chart">Chart</MenuItem>
              </Select>
            </FormControl>
            {visualizationType === "graphs" ? (
              <BudgetGraphs />
            ) : (
              <BudgetChart />
            )}
          </div>
        </div>
        <Box className="control-section">
          <div className="control-section_contained">
            <Button
              className="select-multiple-button"
              icon={
                multiSelectMode ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )
              }
              onClick={toggleMultiSelectMode}
            />
            {multiSelectMode && (
              <Button
                onClick={handleRemoveSelectedExpenses}
                className="removebtn-multiple"
                isDelete
                icon={<DeleteIcon />}
              />
            )}
          </div>

          <div className="control-section_contained">
            <Button
              onClick={() => showBudgetModal(true)}
              className="edit-budget-button"
            >
              Edit Budget
            </Button>
            <Button
              onClick={() => showExpenseModal(true)}
              className="add-expense-button"
            >
              Add Expense
            </Button>
          </div>
        </Box>
        <ExpenseList
          onEditExpense={handleEditExpense}
          onSelectExpenses={handleSelectExpenses}
          multiSelectMode={multiSelectMode}
        />
      </main>
    </div>
  );
}

export default App;
