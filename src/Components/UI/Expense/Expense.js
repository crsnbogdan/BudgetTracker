// ExpenseUI.js
import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import dayjs from "dayjs";

const ExpenseItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2c2c54",
  padding: "10px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  color: "#ffffff",
  marginBottom: "10px",
  fontFamily: "Roboto, sans-serif",
});

const CategoryCircle = styled(Box)({
  width: "15px",
  height: "15px",
  borderRadius: "50%",
  marginRight: "10px",
});

const ExpenseField = styled(Typography)({
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  width: "20%",
  textAlign: "left !important",
  margin: "0",
});

const ActionContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "20%",
});

const StyledButton = styled(Button)({
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  marginLeft: "8px",
  transition: "background-color 0.3s ease",
});

const EditButton = styled(StyledButton)({
  backgroundColor: "#5a67d8",
  color: "white",
  "&:hover": {
    backgroundColor: "#434190",
  },
});

const RemoveButton = styled(StyledButton)({
  backgroundColor: "#d35d6e",
  color: "white",
  "&:hover": {
    backgroundColor: "#b4434a",
  },
});

const Expense = ({
  name,
  price,
  category,
  date,
  categories,
  onEdit,
  onRemove,
}) => {
  const formatDateString = (dateString) => {
    const date = dayjs(dateString);
    return date.format("DD/MM/YY");
  };

  return (
    <ExpenseItem>
      <ExpenseField>
        <CategoryCircle
          style={{ backgroundColor: categories[category]?.color }}
        />
        <Typography className="expense-name" color="#a3a3ff" margin="0">
          {name}
        </Typography>
      </ExpenseField>

      <ExpenseField className="expense-category" textAlign="center" margin="0">
        {category}
      </ExpenseField>
      <ExpenseField className="expense-price" textAlign="right" margin="0">
        ${price.toFixed(2)}
      </ExpenseField>
      <ExpenseField className="expense-date" textAlign="right" margin="0">
        {formatDateString(date)}
      </ExpenseField>
      <ActionContainer>
        <EditButton onClick={onEdit}>Edit</EditButton>
        <RemoveButton onClick={onRemove}>Remove</RemoveButton>
      </ActionContainer>
    </ExpenseItem>
  );
};

export default Expense;
