import React, { useContext, useState, ChangeEvent } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import CategoryDropdown from "../../UI/CategoryDropdown/CategoryDropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import dayjs, { Dayjs } from "dayjs";
//@ts-ignore
import uniqid from "uniquid";
import styles from "./AddRecurringExpense.module.css";
import { State, Frequency, RecurringExpense } from "../../../Types";
import { SelectChangeEvent } from "@mui/material";

interface AddRecurringExpenseProps {
  onClose: () => void;
}

const AddRecurringExpense = ({ onClose }: AddRecurringExpenseProps) => {
  const { dispatch, state } = useContext(AppContext) as {
    dispatch: React.Dispatch<any>;
    state: State;
  };
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [frequency, setFrequency] = useState<Frequency>("daily");

  const handleCategoryChange = (event: SelectChangeEvent<string | string[]>) =>
    setCategory(event.target.value as string);
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) =>
    setAmount(event.target.value);
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setStartDate(newDate);
    }
  };
  const handleFrequencyChange = (event: SelectChangeEvent<string | string[]>) =>
    setFrequency(event.target.value as Frequency);

  const handleAdd = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }

    const expenseStartDate = startDate || dayjs();
    if (!name || !category || !amount || !frequency) return;

    const payload: RecurringExpense = {
      id: uniqid(),
      name,
      price: Number(amount),
      category,
      startDate: expenseStartDate.format("DD-MM-YYYY"),
      frequency,
      date: expenseStartDate.format("DD-MM-YYYY"),
      categories: state.categories,
      onRemove: () => {},
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
          //@ts-ignore
          onChange={handleAmountChange}
        />
      </div>
      <div className={styles.formRow}>
        <Input
          label="Name"
          type="text"
          value={name}
          //@ts-ignore
          onChange={handleNameChange}
        />
      </div>
      <div className={styles.formRow}>
        <Input
          label="Start Date"
          type="date"
          value={startDate.format("YYYY-MM-DD")}
          //@ts-ignore
          onChange={(date) => handleDateChange(date)}
        />
      </div>
      <div className={styles.formRow}>
        <CategoryDropdown
          label="Frequency"
          category={frequency}
          onChange={handleFrequencyChange}
          categories={{
            daily: {
              id: "daily",
              name: "Daily",
              color: "#ffffff",
              budget: "0",
              used: 0,
            },
            weekly: {
              id: "weekly",
              name: "Weekly",
              color: "#ffffff",
              budget: "0",
              used: 0,
            },
            monthly: {
              id: "monthly",
              name: "Monthly",
              color: "#ffffff",
              budget: "0",
              used: 0,
            },
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
