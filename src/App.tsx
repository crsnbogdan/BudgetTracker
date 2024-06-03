import React, { useContext, useState, useEffect } from "react";
import styles from "./App.module.css";
import { AppContext } from "./Context/ContextProvider.tsx";
import ExpenseList from "./Components/Containers/ExpenseList/ExpenseList.tsx";
import BudgetGraphs from "./Components/Containers/BudgetGraphs/BudgetGraphs.tsx";
import BudgetChart from "./Components/Containers/BudgetChart/BudgetChart.tsx";
import RecurringExpenseList from "./Components/Containers/RecurringExpenseList/RecurringExpenseList.tsx";
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
import { Expense } from "./Types/index.ts";

function App() {
  const { showBudgetModalFunc, showExpenseModalFunc, removeMultipleExpenses } =
    useContext(AppContext);

  const [multiSelectMode, setMultiSelectMode] = useState<boolean>(false);
  const [selectedExpenses, setSelectedExpenses] = useState<[] | Expense[]>([]);
  const [visualizationType, setVisualizationType] = useState<
    "graphs" | "chart"
  >("graphs");
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

  const toggleMultiSelectMode = () => {
    setMultiSelectMode((prevMode) => !prevMode);
    setSelectedExpenses([]);
  };

  const handleSelectExpenses = (expenses: Expense[]) => {
    setSelectedExpenses(expenses);
  };

  const handleRemoveSelectedExpenses = () => {
    const ids = selectedExpenses.map((expense) => expense.id);
    console.log(ids);
    removeMultipleExpenses(ids);
    setSelectedExpenses([]);
    setMultiSelectMode(false);
  };

  const handleVisualizationChange = (str: "graphs" | "chart") => {
    setVisualizationType(str);
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
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
                onChange={(e) => {
                  if (
                    e.target.value === "graphs" ||
                    e.target.value === "chart"
                  ) {
                    handleVisualizationChange(e.target.value);
                  }
                }}
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
              onClick={() => showBudgetModalFunc(true)}
              className={styles.editBudgetButton}
            >
              Edit Budget
            </Button>
            <Button
              onClick={() => showExpenseModalFunc(true)}
              className={styles.addExpenseButton}
            >
              Add Expense
            </Button>
          </div>
        </div>
        <ExpenseList
          onSelectExpenses={handleSelectExpenses}
          multiSelectMode={multiSelectMode}
        />
      </main>
    </div>
  );
}

export default App;
