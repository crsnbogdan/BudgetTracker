import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import Button from "../../UI/Button/Button.tsx";
import ModalContainer from "../../UI/ModalContainer/ModalContainer.tsx";
import AddRecurringExpense from "../AddRecurringExpense/AddRecurringExpense";
import Expense from "../../UI/Expense/Expense.tsx";
import styles from "./RecurringExpenseList.module.css";

const RecurringExpenseList = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = (id) => {
    dispatch({ type: "removeRecurringExpense", payload: { id } });
  };

  return (
    <div className={styles.recurringExpensesContainer}>
      <h2 className={styles.header}>Recurring Expenses</h2>
      <div className={styles.expenseList}>
        {state.recurringExpenses.map((expense) => (
          <div key={expense.id} className={styles.expenseItem}>
            <Expense
              key={expense.id}
              id={expense.id}
              name={expense.name}
              price={expense.amount}
              category={expense.category}
              date={expense.startDate}
              categories={state.categories}
              onRemove={() => handleDelete(expense.id)}
              isSmall={true}
              frequency={expense.frequency}
            />
          </div>
        ))}
      </div>
      <div className={styles.formControl}>
        <Button onClick={() => setModalOpen(true)} className={styles.addButton}>
          Add Recurring Expense
        </Button>
      </div>

      <ModalContainer isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AddRecurringExpense onClose={() => setModalOpen(false)} />
      </ModalContainer>
    </div>
  );
};

export default RecurringExpenseList;
