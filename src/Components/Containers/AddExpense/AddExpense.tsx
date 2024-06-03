import React, { ChangeEvent, useContext, useState, MouseEvent } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import dayjs, { Dayjs } from "dayjs";
import styles from "./AddExpense.module.css";
// @ts-ignore
import uniqid from "uniquid";
import { SelectChangeEvent } from "@mui/material";
import { Expense } from "../../../Types";

const AddExpense = () => {
  const { dispatch, showExpenseModalFunc, state } = useContext(AppContext);
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleCategoryChange = (event: SelectChangeEvent<string | string[]>) =>
    setCategory(String(event.target.value));
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPrice(event.target.value);
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleAdd = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    const expenseDate = date || dayjs();
    if (!name || !category || !price) return;

    const payload: Expense = {
      name,
      price: Number(price),
      category,
      date: expenseDate.format("DD-MM-YYYY"),
      id: uniqid(),
    };

    dispatch({
      type: "addExpense",
      payload,
    });

    showExpenseModalFunc(false);
  };

  return (
    <div className={styles.addExpenseForm}>
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
        <Button onClick={(e) => handleAdd(e)} className={styles.button}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
