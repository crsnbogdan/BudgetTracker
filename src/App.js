import React, { useContext, useState, useEffect } from "react";
import styles from "./App.module.css";
import { AppContext } from "./Context/ContextProvider";
import ExpenseList from "./Components/Containers/ExpenseList/ExpenseList";
import BudgetGraphs from "./Components/Containers/BudgetGraphs/BudgetGraphs";
import BudgetChart from "./Components/Containers/BudgetChart/BudgetChart";
import RecurringExpenseList from "./Components/Containers/RecurringExpenseList/RecurringExpenseList";
import Button from "./Components/UI/Button/Button.tsx";
import {
  Select,
  MenuItem,
  FormControl,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import "./variables.css";

function App() {
  const {
    showEditExpenseModal,
    setSelectedExpense,
    showBudgetModal,
    showExpenseModal,
    removeMultipleExpenses,
  } = useContext(AppContext);

  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [visualizationType, setVisualizationType] = useState("graphs");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

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

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 style={{ paddingLeft: "7px" }}>Expense Tracker</h1>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleTheme} />}
          label="Dark Mode"
        />
      </header>
      <main className={styles.main}>
        <div className={styles.topSection}>
          <div className={styles.recurringExpenses}>
            <RecurringExpenseList />
          </div>
          <div className={styles.budgetTracking}>
            <FormControl
              variant="outlined"
              className={styles.visualizationSelect}
            >
              <Select
                value={visualizationType}
                onChange={handleVisualizationChange}
                label="Visualization"
              >
                <MenuItem value="graphs">Graphs</MenuItem>
                <MenuItem value="chart">Chart</MenuItem>
              </Select>
            </FormControl>
            {visualizationType === "graphs" && <BudgetGraphs />}
            {visualizationType === "chart" && <BudgetChart />}
          </div>
        </div>
        <div className={styles.controlSection}>
          <div className={styles.controlSectionContained}>
            <Button
              className={styles.selectMultipleButton}
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
                className={styles.removebtnMultiple}
                isDelete
                icon={<DeleteIcon />}
              />
            )}
          </div>

          <div className={styles.controlSectionContained}>
            <Button
              onClick={() => showBudgetModal(true)}
              className={styles.editBudgetButton}
            >
              Edit Budget
            </Button>
            <Button
              onClick={() => showExpenseModal(true)}
              className={styles.addExpenseButton}
            >
              Add Expense
            </Button>
          </div>
        </div>
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
