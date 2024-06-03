import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import dayjs from "dayjs";
import styles from "./EditExpense.module.css";

const EditExpense = () => {
  const { dispatch, showEditExpenseModalFunc, state } = useContext(AppContext);
  const selectedExpense = state.selectedExpense;

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
  const handleNameChange = (value) => setName(value);
  const handleDateChange = (newDate) => {
    setDate(newDate);
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
        <Button onClick={handleSave} className={styles.button}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditExpense;
