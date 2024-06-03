import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import dayjs from "dayjs";
import styles from "./AddExpense.module.css";
import uniqid from "uniquid";

const AddExpense = () => {
  const { dispatch, showExpenseModalFunc, state } = useContext(AppContext);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(dayjs());

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceChange = (value) => setPrice(value);
  const handleNameChange = (value) => setName(value);
  const handleDateChange = (newDate) => setDate(newDate);

  const handleAdd = (e) => {
    e.preventDefault();

    const expenseDate = date || dayjs();
    if (!name || !category || !price) return;

    const payload = {
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
          onChange={handlePriceChange}
        />
      </div>
      <div className={styles.formRow}>
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className={styles.formRow}>
        <Input
          label="Date"
          type="date"
          value={date.format("YYYY-MM-DD")}
          onChange={handleDateChange}
        />
      </div>
      <div className={styles.formControl}>
        <Button onClick={handleAdd} className={styles.button}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
