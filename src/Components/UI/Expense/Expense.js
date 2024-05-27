import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import Button from "../../UI/Button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./Expense.module.css";

const Expense = ({
  name,
  price,
  category,
  date,
  categories,
  onEdit,
  onRemove,
  onSelect,
  isSelected,
  multiSelectMode,
}) => {
  const formatDateString = (dateString) => {
    const date = dayjs(dateString);
    return date.format("DD/MM/YY");
  };

  return (
    <Box
      className={styles.expenseItem}
      onClick={multiSelectMode ? onSelect : null}
    >
      <Box className={styles.expenseField}>
        {multiSelectMode ? (
          <Checkbox
            checked={isSelected}
            style={{
              color: categories[category]?.color,
            }}
          />
        ) : (
          <Box
            className={styles.categoryCircle}
            style={{ backgroundColor: categories[category]?.color }}
          />
        )}
        <Typography className={styles.expenseName}>{name}</Typography>
      </Box>

      <Typography className={styles.expenseField}>
        {categories[category]?.name}
      </Typography>
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
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className={styles.editButton}
          icon={<EditIcon sx={{ margin: "2px" }} />}
        />
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={styles.removeButton}
          isDelete
          icon={<DeleteIcon />}
        />
      </Box>
    </Box>
  );
};

export default Expense;
