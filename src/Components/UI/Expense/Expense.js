import React from "react";
import { Typography, Checkbox } from "@mui/material";
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
  isSmall,
  frequency,
}) => {
  const formatDateString = (dateString) => {
    const date = dayjs(dateString, "DD-MM-YYYY");
    return date.format("DD/MM/YYYY");
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formattedName =
    isSmall && frequency
      ? `${capitalizeFirstLetter(frequency)} - ${name}`
      : name;

  const formattedPrice = price !== undefined ? price.toFixed(2) : "0.00";

  if (isSmall) {
    return (
      <div className={styles.expenseItemSmall}>
        <div className={styles.expenseFieldSmall}>
          <div
            className={styles.categoryCircleSmall}
            style={{
              backgroundColor: categories[category]?.color,
            }}
          />
          <p style={{ width: "70%" }} className={styles.expenseNameSmall}>
            {formattedName}
          </p>
        </div>

        <p className={styles.expenseFieldSmall}>{categories[category]?.name}</p>

        <p
          className={styles.expenseField}
          style={{ textAlign: "right", marginRight: "20px" }}
        >
          ${formattedPrice}
        </p>
        <div className={styles.actionContainerSmall}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={styles.removeButtonSmall}
            isDelete
            icon={<DeleteIcon />}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.expenseItem}
      onClick={multiSelectMode ? onSelect : null}
    >
      <div className={styles.expenseField}>
        {multiSelectMode ? (
          <Checkbox
            checked={isSelected}
            style={{
              color: categories[category]?.color,
            }}
          />
        ) : (
          <div
            className={styles.categoryCircle}
            style={{ backgroundColor: categories[category]?.color }}
          />
        )}
        <p className={styles.expenseName}>{name}</p>
      </div>

      <p className={styles.expenseField}>{categories[category]?.name}</p>
      <p className={styles.expenseField} style={{ textAlign: "right" }}>
        ${formattedPrice}
      </p>
      <p className={styles.expenseField} style={{ textAlign: "right" }}>
        {formatDateString(date)}
      </p>
      <div className={styles.actionContainer}>
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
      </div>
    </div>
  );
};

export default Expense;
