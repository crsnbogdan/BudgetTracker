import React from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import Button from "../../UI/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Expense.module.css";

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
    <Box className={styles.expenseItem}>
      <Box className={styles.expenseField}>
        <Box
          className={styles.categoryCircle}
          style={{ backgroundColor: categories[category]?.color }}
        />
        <Typography className={styles.expenseName}>{name}</Typography>
      </Box>

      <Typography className={styles.expenseField}>{category}</Typography>
      <Typography
        className={styles.expenseField}
        style={{ textAlign: "right" }}
      >
        ${price.toFixed(2)}
      </Typography>
      <Typography
        className={styles.expenseField}
        style={{ textAlign: "right" }}
      >
        {formatDateString(date)}
      </Typography>
      <Box className={styles.actionContainer}>
        <Button onClick={onEdit} className={styles.editButton}>
          Edit
        </Button>
        <Button
          onClick={onRemove}
          className={styles.removeButton}
          isDelete
          icon={<DeleteIcon />}
        />
      </Box>
    </Box>
  );
};

export default Expense;
