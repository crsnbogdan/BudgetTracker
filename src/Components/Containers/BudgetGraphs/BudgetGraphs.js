import React, { useContext } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import styles from "./BudgetGraphs.module.css";
import { getFrequencyMultiplier } from "../../../Context/ContextProvider";
const BudgetGraphs = () => {
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
      const frequencyMultiplier = getFrequencyMultiplier(
        recurringExpense.frequency
      );
      categoryTotals[recurringExpense.category] +=
        recurringExpense.price * frequencyMultiplier;
      totalUsed += recurringExpense.price * frequencyMultiplier;
    });

    return { categoryTotals, totalUsed };
  };

  const { categoryTotals, totalUsed } = calculateBudgetData();

  return (
    <div className={styles.budgetTracker}>
      <div className={styles.budgetOverview}>
        {Object.keys(state.categories).map((categoryId) => {
          const category = state.categories[categoryId];
          const totalCategoryBudget =
            (parseFloat(category.budget) / 100) * state.totalBudget;
          const used = categoryTotals[categoryId];
          const remaining = totalCategoryBudget - used;
          const usedPercentage = totalCategoryBudget
            ? (used / totalCategoryBudget) * 100
            : 0;
          const remainingPercentage = 100 - usedPercentage;
          const isOverBudget = used > totalCategoryBudget;

          return (
            <div key={categoryId} className={styles.budgetCategory}>
              <div className={styles.budgetBar}>
                <div
                  className={styles.usedBar}
                  style={{
                    height: `${usedPercentage}%`,
                    backgroundColor: isOverBudget
                      ? "var(--color-button-remove)"
                      : category.color,
                  }}
                />
                {remainingPercentage > 0 && !isOverBudget && (
                  <div
                    className={styles.remainingBar}
                    style={{
                      height: `${remainingPercentage}%`,
                    }}
                  />
                )}
              </div>
              <span
                className={styles.categoryLabel}
                style={{
                  color: isOverBudget
                    ? "var(--color-button-remove)"
                    : "#b5b5b5",
                }}
              >
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetGraphs;
