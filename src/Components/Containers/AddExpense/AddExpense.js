import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import dayjs from "dayjs";
import styles from "./AddExpense.module.css";

const AddExpense = () => {
  const { dispatch, showExpenseModal, categories } = useContext(AppContext);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleDateChange = (newDate) => setDate(newDate);

  const handleAdd = () => {
    const expenseDate = date || dayjs();
    if (!name || !category || !price) return;
    dispatch({
      type: "addExpense",
      payload: {
        name,
        price: Number(price),
        category,
        date: expenseDate,
      },
    });
    showExpenseModal(false);
  };

  return (
    <div className={styles.addExpenseForm}>
      <div className={styles.formRow}>
        <CategoryDropdown
          category={category}
          onChange={handleCategoryChange}
          categories={categories}
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
          value={date}
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
