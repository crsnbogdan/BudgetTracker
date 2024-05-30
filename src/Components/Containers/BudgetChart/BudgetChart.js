import React, { useContext } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import Legend from "../../UI/Legend/Legend";
import styles from "./BudgetChart.module.css";
import { getFrequencyMultiplier } from "../../../Context/ContextProvider";

const BudgetChart = () => {
  const { state } = useContext(AppContext);

  const calculateBudgetData = () => {
    let totalUsed = 0;
    const categoryTotals = {};

    Object.values(state.categories).forEach((category) => {
      categoryTotals[category.id] = 0;
    });

    Object.values(state.expenses).forEach((year) => {
      Object.values(year).forEach((monthExpenses) => {
        monthExpenses.forEach((expense) => {
          categoryTotals[expense.category] += expense.price || 0;
          totalUsed += expense.price || 0;
        });
      });
    });

    state.recurringExpenses.forEach((recurringExpense) => {
      const category = state.categories[recurringExpense.category];
      const frequencyMultiplier = getFrequencyMultiplier(
        recurringExpense.frequency
      );
      categoryTotals[recurringExpense.category] +=
        recurringExpense.amount * frequencyMultiplier;
      totalUsed += recurringExpense.amount * frequencyMultiplier;
    });

    const data = Object.keys(categoryTotals).map((categoryId, index) => {
      const category = state.categories[categoryId];
      const used = categoryTotals[categoryId];
      return {
        id: index,
        value: used,
        label: category.name,
        color: category.color,
      };
    });

    const totalBudget = state.totalBudget;
    const remainingBudget = totalBudget - totalUsed;

    if (remainingBudget > 0) {
      data.push({
        id: data.length,
        value: remainingBudget,
        label: "Unused Budget",
        color: "#d5d5ef",
      });
    }

    return data;
  };

  const budgetData = calculateBudgetData();

  return (
    <div className={styles.budgetChartContainer}>
      <PieChart
        className={styles.budgetChart}
        slotProps={{ legend: { hidden: true } }}
        series={[
          {
            highlightScope: { faded: "global", highlighted: "item" },
            outerRadius: 150,
            data: budgetData,
            paddingAngle: 2,
            cornerRadius: 10,
            startAngle: -90,
            endAngle: 270,
            innerRadius: 60,
            cx: 100,
          },
        ]}
        width={400}
        height={400}
      />
      <Legend data={budgetData} />
    </div>
  );
};

export default BudgetChart;
