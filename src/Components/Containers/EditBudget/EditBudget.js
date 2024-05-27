import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid"; // Using uuid for unique IDs
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
    <Box className={styles["budget-container"]}>
      <Box className={styles["form-row"]}>
        <Input
          label="Total Budget"
          type="number"
          value={totalBudget}
          onChange={handleTotalBudgetChange}
        />
      </Box>
      <Box className={styles["form-row"]}>
        <Typography className={styles["budget-total"]}>
          Total Percentage Usage:
        </Typography>
        <span
          style={{ color: totalPercentageUsage > 100 ? "#d35d6e" : "white" }}
        >
          {parseFloat(totalPercentageUsage.toFixed(2))}%
        </span>
      </Box>
      <Box className={styles["form-row"]}>
        <Typography className={styles["budget-total"]}>
          Total Used Amount:
        </Typography>
        <span
          style={{ color: totalPercentageUsage > 100 ? "#d35d6e" : "white" }}
        >
          ${totalUsedAmount.toFixed(2)}
        </span>
      </Box>
      <Box className={styles["form-row"]}>
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
          className={styles["color-input"]}
        />
        <Button
          onClick={handleAddCategory}
          className={styles["add-category-button"]}
        >
          Add
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <Box className={styles["categories-wrapper"]}>
        {Object.keys(tempCategories).map((categoryId) => {
          const category = tempCategories[categoryId];
          return (
            <Box key={categoryId} className={styles["category-group"]}>
              <Box className={styles["category-info"]}>
                <Box
                  className={styles["category-circle"]}
                  style={{ backgroundColor: category.color }}
                />
                <Typography>{category.name}</Typography>
              </Box>
              <Box className={styles["category-controls"]}>
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
                  className={styles["delete-button"]}
                  isDelete
                  icon={<DeleteIcon />}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
      {totalPercentageUsage > 100 && (
        <Typography className={styles["form-error"]}>
          Total percentage usage exceeds 100%. Please reduce category
          percentages before updating the budget.
        </Typography>
      )}
      <Box className={styles["form-row"]}>
        <Button onClick={handleSubmit} className={styles["submit-button"]}>
          Update Budget
        </Button>
      </Box>
    </Box>
  );
};

export default EditBudget;
