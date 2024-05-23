import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import "./BudgetGraphs.css";

const BudgetGraphs = () => {
  const { state } = useContext(AppContext);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const getCategoryBudgetInfo = (category) => {
    const categoryInfo = state.categories[category];
    const totalCategoryBudget =
      (parseFloat(categoryInfo.budget) / 100) * state.totalBudget;
    const remainingCategoryBudget = totalCategoryBudget - categoryInfo.used;

    return {
      total: totalCategoryBudget,
      used: categoryInfo.used,
      remaining: remainingCategoryBudget,
    };
  };

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="budget-tracker">
      <div className={`budget-overview ${hoveredCategory ? "highlight" : ""}`}>
        {Object.keys(state.categories).map((category) => {
          const { total, used, remaining } = getCategoryBudgetInfo(category);
          const usedPercentage = (used / total) * 100;
          const remainingPercentage = 100 - usedPercentage;
          const isOverBudget = used > total;

          return (
            <div
              key={category}
              className={`budget-category ${
                hoveredCategory === category ? "hovered" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="budget-bar">
                <div
                  className="used-bar"
                  style={{
                    height: `${usedPercentage}%`,
                    backgroundColor: isOverBudget
                      ? "#d35d6e"
                      : state.categories[category].color,
                  }}
                />
                {remainingPercentage > 0 && !isOverBudget && (
                  <div
                    className="remaining-bar"
                    style={{
                      height: `${remainingPercentage}%`,
                    }}
                  />
                )}
              </div>
              <span
                className="category-label"
                style={{ color: isOverBudget ? "#d35d6e" : "#b5b5b5" }}
              >
                {category}
              </span>
              {hoveredCategory === category && (
                <div className="tooltip">
                  <p>Total Budget: ${total.toFixed(2)}</p>
                  <p>Used: ${used.toFixed(2)}</p>
                  {remaining.toFixed(2) >= 0 ? (
                    <p>Remaining: ${remaining.toFixed(2)}</p>
                  ) : (
                    <p>Overrun: ${remaining.toFixed(2)}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetGraphs;
