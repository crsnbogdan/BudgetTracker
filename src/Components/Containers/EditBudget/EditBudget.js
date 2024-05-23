import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
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
    Object.keys(initialCategories).forEach((category) => {
      const percentage = Number(initialCategories[category].budget);
      initialCategories[category].amount = formatValue(
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

  const handleBudgetAmountChange = (categoryName, value) => {
    const formattedValue = formatValue(Number(value));
    setTempCategories((prevCategories) => {
      const newCategories = {
        ...prevCategories,
        [categoryName]: {
          ...prevCategories[categoryName],
          amount: formattedValue,
          budget: formatValue((formattedValue / totalBudget) * 100),
        },
      };
      return newCategories;
    });
  };

  const handlePercentageChange = (categoryName, value) => {
    const formattedValue = formatValue(Number(value));
    setTempCategories((prevCategories) => {
      const newCategories = {
        ...prevCategories,
        [categoryName]: {
          ...prevCategories[categoryName],
          budget: formattedValue,
          amount: formatValue((totalBudget * formattedValue) / 100),
        },
      };
      return newCategories;
    });
  };

  const updateCategoryBudgets = (categories, totalBudget) => {
    const updatedCategories = { ...categories };
    Object.keys(updatedCategories).forEach((category) => {
      const percentage = Number(updatedCategories[category].budget);
      updatedCategories[category].amount = formatValue(
        (totalBudget * percentage) / 100
      );
    });
    setTempCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryColor) {
      dispatch({
        type: "addCategory",
        payload: {
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

  const handleRemoveCategory = (categoryName) => {
    dispatch({
      type: "removeCategory",
      payload: {
        name: categoryName,
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
        {Object.values(tempCategories).map((category, index) => (
          <Box key={index} className={styles["category-group"]}>
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
                  handleBudgetAmountChange(category.name, e.target.value)
                }
              />
              <Input
                label="Percentage"
                type="number"
                value={category.budget || ""}
                onChange={(e) =>
                  handlePercentageChange(category.name, e.target.value)
                }
              />
              <Button
                onClick={() => handleRemoveCategory(category.name)}
                className={styles["delete-button"]}
                isDelete
                icon={<DeleteIcon />}
              />
            </Box>
          </Box>
        ))}
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
