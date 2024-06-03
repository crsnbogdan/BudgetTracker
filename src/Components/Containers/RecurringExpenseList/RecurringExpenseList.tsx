import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import Button from "../../UI/Button/Button";
import ModalContainer from "../../UI/ModalContainer/ModalContainer";
import AddRecurringExpense from "../AddRecurringExpense/AddRecurringExpense";
import Expense from "../../UI/Expense/Expense";
import styles from "./RecurringExpenseList.module.css";
import { RemoveRecurringExpensePayload } from "../../../Types";

const RecurringExpenseList = () => {
  const { state, dispatch } = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = (id: String) => {
    dispatch({
      type: "removeRecurringExpense",
      payload: { id } as RemoveRecurringExpensePayload,
    });
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
              price={expense.price}
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
