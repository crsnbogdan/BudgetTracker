import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown.tsx";
import Input from "../../UI/Input/Input.tsx";
import Button from "../../UI/Button/Button.tsx";
import dayjs from "dayjs";
import styles from "./EditExpense.module.css";

const EditExpense = () => {
  const { dispatch, showEditExpenseModal, selectedExpense, categories } =
    useContext(AppContext);

  const [category, setCategory] = useState(selectedExpense?.category || "");
  const [price, setPrice] = useState(selectedExpense?.price?.toString() || "");
  const [name, setName] = useState(selectedExpense?.name || "");
  const [date, setDate] = useState(
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

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceChange = (value) => setPrice(value);
  const handleNameChange = (event) => setName(event);
  const handleDateChange = (newDate) => {
    setDate(dayjs(newDate, "DD-MM-YYYY"));
  };

  const handleSave = () => {
    if (!name || !category || !price) return;
    dispatch({
      type: "updateExpense",
      payload: {
        id: selectedExpense.id,
        name,
        price: Number(price),
        category,
        date: date.format("DD-MM-YYYY"),
      },
    });
    showEditExpenseModal(false);
  };

  return (
    <div className={styles.formContainer}>
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
          value={date.format("DD-MM-YYYY")}
          onChange={handleDateChange}
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
