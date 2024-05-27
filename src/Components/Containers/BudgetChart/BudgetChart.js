import React, { useContext } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import Legend from "../../UI/Legend/Legend";
import styles from "./BudgetChart.module.css";

const BudgetChart = () => {
  const { state } = useContext(AppContext);

  const calculateBudgetData = () => {
    let totalUsed = 0;
    const data = Object.keys(state.categories).map((categoryId, index) => {
      const category = state.categories[categoryId];
      const used = category.used;
      totalUsed += used;
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
    <Box className={styles["budget-chart__container"]}>
      <PieChart
        className={styles["budget-chart"]}
        slotProps={{ legend: { hidden: true } }}
        series={[
          {
            highlightScope: { faded: "global", highlighted: "item" },
            outerRadius: 180,
            data: budgetData,
            paddingAngle: 5,
            cornerRadius: 10,
            startAngle: 0,
            endAngle: 360,
            innerRadius: 60,
            cx: 0,
          },
        ]}
        width={400}
        height={400}
      />
      <Legend data={budgetData} />
    </Box>
  );
};

export default BudgetChart;
