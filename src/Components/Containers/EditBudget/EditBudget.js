import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import styles from "./EditBudget.module.css";

const EditBudget = () => {
  const { dispatch, showBudgetModal, state, categories } =
    useContext(AppContext);
  const [totalBudget, setTotalBudget] = useState(state.totalBudget);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#ffffff");
  const [tempCategories, setTempCategories] = useState({ ...categories });

  useEffect(() => {
    const initialCategories = { ...categories };
    Object.keys(initialCategories).forEach((categoryId) => {
      const category = initialCategories[categoryId];
      const percentage = Number(category.budget);
      initialCategories[categoryId].amount = formatValue(
        (totalBudget * percentage) / 100
      );
    });
    setTempCategories(initialCategories);
  }, [categories, totalBudget]);

  const handleTotalBudgetChange = (event) => {
    const newTotalBudget = Number(event.target.value);
    setTotalBudget(newTotalBudget);
    updateCategoryBudgets(tempCategories, newTotalBudget);
  };

  const handleBudgetAmountChange = (categoryId, value) => {
    const formattedValue = formatValue(Number(value));
    setTempCategories((prevCategories) => {
      const newCategories = {
        ...prevCategories,
        [categoryId]: {
          ...prevCategories[categoryId],
          amount: formattedValue,
          budget: formatValue((formattedValue / totalBudget) * 100),
        },
      };
      return newCategories;
    });
  };

  const handlePercentageChange = (categoryId, value) => {
    const formattedValue = formatValue(Number(value));
    setTempCategories((prevCategories) => {
      const newCategories = {
        ...prevCategories,
        [categoryId]: {
          ...prevCategories[categoryId],
          budget: formattedValue,
          amount: formatValue((totalBudget * formattedValue) / 100),
        },
      };
      return newCategories;
    });
  };

  const updateCategoryBudgets = (categories, totalBudget) => {
    const updatedCategories = { ...categories };
    Object.keys(updatedCategories).forEach((categoryId) => {
      const category = updatedCategories[categoryId];
      const percentage = Number(category.budget);
      updatedCategories[categoryId].amount = formatValue(
        (totalBudget * percentage) / 100
      );
    });
    setTempCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryColor) {
      const newCategoryId = uuidv4();
      dispatch({
        type: "addCategory",
        payload: {
          id: newCategoryId,
          color: newCategoryColor,
          name: newCategoryName,
          budget: 0,
          amount: 0,
        },
      });
      setNewCategoryName("");
      setNewCategoryColor("#ffffff");
    }
  };

  const handleRemoveCategory = (categoryId) => {
    dispatch({
      type: "removeCategory",
      payload: {
        id: categoryId,
      },
    });
  };

  const handleSubmit = () => {
    if (!totalBudget) return;
    if (totalPercentageUsage > 100) return;
    dispatch({
      type: "updateCategories",
      payload: {
        categories: tempCategories,
      },
    });

    dispatch({
      type: "updateBudget",
      payload: {
        totalBudget: Number(totalBudget),
      },
    });

    showBudgetModal(false);
  };

  const formatValue = (value) =>
    value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);

  const totalPercentageUsage = Object.values(tempCategories).reduce(
    (total, category) => total + Number(category.budget),
    0
  );

  const totalUsedAmount = Object.values(tempCategories).reduce(
    (total, category) => total + Number(category.amount),
    0
  );

  return (
    <Box className={styles.budgetContainer}>
      <Box className={styles.formRow}>
        <Input
          label="Total Budget"
          type="number"
          value={totalBudget}
          onChange={handleTotalBudgetChange}
        />
      </Box>
      <Box className={styles.formRow}>
        <span className={styles.budgetTotal}>Total Percentage Usage:</span>
        <span
          style={{
            color:
              totalPercentageUsage > 100
                ? "var(--color-button-remove)"
                : "var(--color-text)",
          }}
        >
          {parseFloat(totalPercentageUsage.toFixed(2))}%
        </span>
      </Box>
      <Box className={styles.formRow}>
        <span className={styles.budgetTotal}>Total Used Amount:</span>
        <span
          style={{
            color:
              totalPercentageUsage > 100
                ? "var(--color-button-remove)"
                : "var(--color-text)",
          }}
        >
          ${totalUsedAmount.toFixed(2)}
        </span>
      </Box>
      <Box className={styles.formRow}>
        <Input
          label="New Category"
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <input
          type="color"
          value={newCategoryColor}
          onChange={(e) => setNewCategoryColor(e.target.value)}
          className={styles.colorInput}
        />
        <Button
          onClick={handleAddCategory}
          className={styles.addCategoryButton}
        >
          Add
        </Button>
      </Box>
      <h2>Categories</h2>
      <Box className={styles.categoriesWrapper}>
        {Object.keys(tempCategories).map((categoryId) => {
          const category = tempCategories[categoryId];
          return (
            <Box key={categoryId} className={styles.categoryGroup}>
              <Box className={styles.categoryInfo}>
                <Box
                  className={styles.categoryCircle}
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.name}</span>
              </Box>
              <Box className={styles.categoryControls}>
                <Input
                  label="Amount"
                  type="number"
                  value={category.amount || ""}
                  onChange={(e) =>
                    handleBudgetAmountChange(categoryId, e.target.value)
                  }
                />
                <Input
                  label="Percentage"
                  type="number"
                  value={category.budget || ""}
                  onChange={(e) =>
                    handlePercentageChange(categoryId, e.target.value)
                  }
                />
                <Button
                  onClick={() => handleRemoveCategory(categoryId)}
                  className={styles.deleteButton}
                  isDelete
                  icon={<DeleteIcon />}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
      {totalPercentageUsage > 100 && (
        <span className={styles.formError}>
          Total percentage usage exceeds 100%. Please reduce category
          percentages before updating the budget.
        </span>
      )}
      <Box className={styles.formRow}>
        <Button onClick={handleSubmit} className={styles.submitButton}>
          Update Budget
        </Button>
      </Box>
    </Box>
  );
};

export default EditBudget;
