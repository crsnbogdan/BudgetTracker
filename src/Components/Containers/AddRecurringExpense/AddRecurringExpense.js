import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import dayjs from "dayjs";
import uniqid from "uniquid";
import styles from "./AddRecurringExpense.module.css";

const AddRecurringExpense = ({ onClose }) => {
  const { dispatch, state } = useContext(AppContext);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [frequency, setFrequency] = useState("");

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleAmountChange = (value) => setAmount(value);
  const handleNameChange = (value) => setName(value);
  const handleDateChange = (newDate) => setStartDate(newDate);
  const handleFrequencyChange = (event) => setFrequency(event.target.value);

  const handleAdd = (e) => {
    e.preventDefault();

    const expenseStartDate = startDate || dayjs();
    if (!name || !category || !amount || !frequency) return;

    const payload = {
      name,
      price: Number(amount),
      category,
      startDate: expenseStartDate.format("DD-MM-YYYY"),
      frequency,
      id: uniqid(),
    };

    dispatch({
      type: "addRecurringExpense",
      payload,
    });

    onClose();
  };

  return (
    <div className={styles.addRecurringExpenseForm}>
      <div className={styles.formRow}>
        <CategoryDropdown
          category={category}
          onChange={handleCategoryChange}
          categories={state.categories}
        />
      </div>
      <div className={styles.formRow}>
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
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
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleDateChange}
        />
      </div>
      <div className={styles.formRow}>
        <CategoryDropdown
          label="Frequency"
          category={frequency}
          onChange={handleFrequencyChange}
          categories={{
            daily: { name: "Daily", color: "#ffffff" },
            weekly: { name: "Weekly", color: "#ffffff" },
            monthly: { name: "Monthly", color: "#ffffff" },
          }}
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

export default AddRecurringExpense;
