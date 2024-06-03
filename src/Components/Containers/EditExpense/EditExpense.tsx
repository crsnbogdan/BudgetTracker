import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import dayjs, { Dayjs } from "dayjs";
import styles from "./EditExpense.module.css";
import { SelectChangeEvent } from "@mui/material";
import { Expense } from "../../../Types";

const EditExpense = () => {
  const { dispatch, showEditExpenseModalFunc, state } = useContext(AppContext);
  const selectedExpense = state.selectedExpense;

  const [category, setCategory] = useState<string>(
    selectedExpense?.category || ""
  );
  const [price, setPrice] = useState<string>(
    selectedExpense?.price?.toString() || ""
  );
  const [name, setName] = useState<string>(selectedExpense?.name || "");
  const [date, setDate] = useState<Dayjs>(
    selectedExpense?.date ? dayjs(selectedExpense.date, "DD-MM-YYYY") : dayjs()
  );

  useEffect(() => {
    setCategory(selectedExpense?.category || "");
    setPrice(selectedExpense?.price?.toString() || "");
    setName(selectedExpense?.name || "");
    setDate(
      selectedExpense?.date
        ? dayjs(selectedExpense.date, "DD-MM-YYYY")
        : dayjs()
    );
  }, [selectedExpense]);

  const handleCategoryChange = (event: SelectChangeEvent<string | string[]>) =>
    setCategory(event.target.value as string);
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPrice(event.target.value);
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleSave = () => {
    if (!name || !category || !price) return;
    const payload: Expense = {
      id: selectedExpense!.id,
      name,
      price: Number(price),
      category,
      date: date.format("DD-MM-YYYY"),
    };
    dispatch({
      type: "updateExpense",
      payload,
    });
    showEditExpenseModalFunc(false);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formRow}>
        <CategoryDropdown
          category={category}
          onChange={handleCategoryChange}
          categories={state.categories}
        />
      </div>
      <div className={styles.formRow}>
        <Input
          label="Price"
          type="number"
          value={price}
          onChange={(value) =>
            handlePriceChange(value as ChangeEvent<HTMLInputElement>)
          }
        />
      </div>
      <div className={styles.formRow}>
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(value) =>
            handleNameChange(value as ChangeEvent<HTMLInputElement>)
          }
        />
      </div>
      <div className={styles.formRow}>
        <Input
          label="Date"
          type="date"
          value={date.format("YYYY-MM-DD")}
          onChange={(value) => handleDateChange(value as Dayjs)}
        />
      </div>
      <div className={styles.formControl}>
        <Button onClick={handleSave} className={styles.button}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditExpense;
