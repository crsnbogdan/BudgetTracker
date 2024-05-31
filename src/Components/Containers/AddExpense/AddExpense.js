import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown.tsx";
import Input from "../../UI/Input/Input.tsx";
import Button from "../../UI/Button/Button.tsx";
import dayjs from "dayjs";
import styles from "./AddExpense.module.css";
import uniquid from "uniquid";

const AddExpense = () => {
  const { dispatch, showExpenseModal, categories } = useContext(AppContext);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleDateChange = (newDate) => setDate(dayjs(newDate, "DD-MM-YYYY"));

  const handleAdd = (e) => {
    e.preventDefault();

    const expenseDate = date || dayjs();
    if (!name || !category || !price) return;

    const payload = {
      name,
      price: Number(price),
      category,
      date: expenseDate.format("DD-MM-YYYY"),
      id: uniquid(),
    };

    dispatch({
      type: "addExpense",
      payload,
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
          value={date ? date.format("DD-MM-YYYY") : ""}
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
