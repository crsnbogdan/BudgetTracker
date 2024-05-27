import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import dayjs from "dayjs";
import styles from "./EditExpense.module.css";

const EditExpense = () => {
  const { dispatch, showEditExpenseModal, selectedExpense, categories } =
    useContext(AppContext);

  const [category, setCategory] = useState(selectedExpense?.category || "");
  const [price, setPrice] = useState(selectedExpense?.price?.toString() || "");
  const [name, setName] = useState(selectedExpense?.name || "");
  const [date, setDate] = useState(
    selectedExpense?.date ? dayjs(selectedExpense.date) : dayjs()
  );

  useEffect(() => {
    setCategory(selectedExpense?.category || "");
    setPrice(selectedExpense?.price?.toString() || "");
    setName(selectedExpense?.name || "");
    setDate(selectedExpense?.date ? dayjs(selectedExpense.date) : dayjs());
  }, [selectedExpense]);

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleDateChange = (newDate) => setDate(newDate);

  const handleSave = () => {
    const expenseDate = date || dayjs();
    if (!name || !category || !price) return;
    dispatch({
      type: "updateExpense",
      payload: {
        id: selectedExpense.id,
        name,
        price: Number(price),
        category,
        date: expenseDate.format("DD-MM-YYYY"),
      },
    });
    showEditExpenseModal(false);
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-row"]}>
        <CategoryDropdown
          category={category}
          onChange={handleCategoryChange}
          categories={categories}
        />
      </div>
      <div className={styles["form-row"]}>
        <Input
          label="Price"
          type="number"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div className={styles["form-row"]}>
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className={styles["form-row"]}>
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={handleDateChange}
        />
      </div>
      <div className={styles["form-control"]}>
        <Button onClick={handleSave} className={styles.button}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditExpense;
