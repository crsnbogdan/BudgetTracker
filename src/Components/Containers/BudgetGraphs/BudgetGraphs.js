import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import dayjs from "dayjs";
import { getFrequencyMultiplier } from "../../../Context/ContextProvider";
import styles from "./BudgetGraphs.module.css";

const BudgetGraphs = () => {
  const { state } = useContext(AppContext);

  const currentDate = dayjs();
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month() + 1;

  const getCategoryBudgetInfo = (categoryId) => {
    const categoryInfo = state.categories[categoryId];
    const totalCategoryBudget =
      (parseFloat(categoryInfo.budget) / 100) * state.totalBudget;

    let used = 0;

    state.expenses[currentYear][currentMonth].forEach((expense) => {
      if (expense.category === categoryId) {
        used += expense.price;
      }
    });

    state.recurringExpenses.forEach((recurringExpense) => {
      const frequencyMultiplier = getFrequencyMultiplier(
        recurringExpense.frequency
      );
      if (recurringExpense.category === categoryId) {
        used += recurringExpense.amount * frequencyMultiplier;
      }
    });

    return {
      total: totalCategoryBudget,
      used,
      remaining: totalCategoryBudget - used,
    };
  };

  return (
    <div className={styles.budgetTracker}>
      <div className={styles.budgetOverview}>
        {Object.keys(state.categories).map((categoryId) => {
          const { total, used, remaining } = getCategoryBudgetInfo(categoryId);
          const usedPercentage = total ? (used / total) * 100 : 0;
          const remainingPercentage = 100 - usedPercentage;
          const isOverBudget = used > total;

          return (
            <div key={categoryId} className={styles.budgetCategory}>
              <div className={styles.budgetBar}>
                <div
                  className={styles.usedBar}
                  style={{
                    height: `${usedPercentage}%`,
                    backgroundColor: isOverBudget
                      ? "var(--color-button-remove)"
                      : state.categories[categoryId].color,
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
                {state.categories[categoryId].name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetGraphs;
