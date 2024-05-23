import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField, Button, IconButton, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./EditBudget.css";

const FormContainer = styled(Box)({
  backgroundColor: "#2c2c54",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "400px",
  color: "#ffffff",
  padding: "20px",
});

const CustomLabel = styled(Typography)({
  color: "#a3a3ff",
  fontSize: "14px",
  marginBottom: "10px",
});

const ColorInput = styled("input")({
  width: "35px",
  height: "35px",
  padding: "0",
  margin: "0 10px",
  border: "none",
  borderRadius: "4px",
});

const CustomButton = styled(Button)({
  backgroundColor: "#5a67d8",
  color: "#ffffff",
  border: "none",
  padding: "7px 14px",
  fontSize: "14px",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#434190",
  },
  "&:not(:last-child)": {
    marginRight: "10px",
  },
});

const FormRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: "15px",
});

const CategoryGroup = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
  width: "100%",
});

const CategoryInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const CategoryControls = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
});

const DeleteButton = styled(IconButton)({
  backgroundColor: "#d35d6e",
  color: "#ffffff",
  padding: "10px",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#b4434a",
  },
});

const CategoryCircle = styled(Box)({
  width: "15px",
  height: "15px",
  borderRadius: "50%",
  marginRight: "10px",
});

const FormError = styled(Typography)({
  color: "#d35d6e",
});

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

  // Calculate the total budget percentage usage
  const totalPercentageUsage = Object.values(tempCategories).reduce(
    (total, category) => total + Number(category.budget),
    0
  );

  const totalUsedAmount = Object.values(tempCategories).reduce(
    (total, category) => total + Number(category.amount),
    0
  );

  return (
    <FormContainer className="budget-container">
      <FormRow>
        <TextField
          label="Total Budget"
          type="number"
          value={totalBudget}
          onChange={handleTotalBudgetChange}
          variant="outlined"
          fullWidth
          InputProps={{
            style: { backgroundColor: "#1e1e3a", color: "#ffffff" },
          }}
          InputLabelProps={{ style: { color: "#a3a3ff" } }}
        />
      </FormRow>
      <FormRow>
        <CustomLabel className="budget-total">
          Total Percentage Usage:
        </CustomLabel>
        <span
          style={{ color: totalPercentageUsage > 100 ? "#d35d6e" : "white" }}
        >
          {parseFloat(totalPercentageUsage.toFixed(2))}%
        </span>
      </FormRow>
      <FormRow>
        <CustomLabel className="budget-total">Total Used Amount:</CustomLabel>
        <span style={{ color: "white" }}>${totalUsedAmount.toFixed(2)}</span>
      </FormRow>
      <FormRow>
        <TextField
          label="New Category"
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            style: { backgroundColor: "#1e1e3a", color: "#ffffff" },
          }}
          InputLabelProps={{ style: { color: "#a3a3ff" } }}
        />
        <ColorInput
          type="color"
          value={newCategoryColor}
          onChange={(e) => setNewCategoryColor(e.target.value)}
        />
        <CustomButton onClick={handleAddCategory}>Add</CustomButton>
      </FormRow>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      {Object.values(tempCategories).map((category, index) => (
        <CategoryGroup key={index}>
          <CategoryInfo>
            <CategoryCircle style={{ backgroundColor: category.color }} />
            <Typography>{category.name}</Typography>
          </CategoryInfo>
          <CategoryControls sx={{ width: "50%" }}>
            <TextField
              type="number"
              label="Amount"
              placeholder="$"
              value={category.amount || ""}
              onChange={(e) =>
                handleBudgetAmountChange(category.name, e.target.value)
              }
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "#1e1e3a",
                  color: "#ffffff",
                },
              }}
              InputLabelProps={{ style: { color: "#a3a3ff" } }}
              fullWidth
            />
            <TextField
              type="number"
              label="Percentage"
              placeholder="%"
              value={category.budget || ""}
              onChange={(e) =>
                handlePercentageChange(category.name, e.target.value)
              }
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "#1e1e3a",
                  color: "#ffffff",
                },
              }}
              InputLabelProps={{ style: { color: "#a3a3ff" } }}
              fullWidth
            />
            <DeleteButton onClick={() => handleRemoveCategory(category.name)}>
              <DeleteIcon />
            </DeleteButton>
          </CategoryControls>
        </CategoryGroup>
      ))}
      {totalPercentageUsage > 100 && (
        <FormError>
          Total percentage usage exceeds 100%. Please reduce category
          percentages before updating the budget.
        </FormError>
      )}
      <FormRow>
        <CustomButton onClick={handleSubmit}>Update Budget</CustomButton>
      </FormRow>
    </FormContainer>
  );
};

export default EditBudget;
