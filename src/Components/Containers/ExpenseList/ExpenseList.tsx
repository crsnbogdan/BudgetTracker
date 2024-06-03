import React, { useContext, useState, useEffect, MouseEvent } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import ModalContainer from "../../UI/ModalContainer/ModalContainer";
import AddExpense from "../AddExpense/AddExpense";
import EditExpense from "../EditExpense/EditExpense";
import EditBudget from "../EditBudget/EditBudget";
import Filters from "../Filters/Filters";
import Expense from "../../UI/Expense/Expense";
import PersistentPopover from "../../UI/PersistentPopover/PersistentPopover";
import dayjs from "dayjs";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import styles from "./ExpenseList.module.css";
import {
  UpdateFiltersPayload,
  ExpensesByYear,
  SingleExpense,
} from "../../../Types";

interface ExpenseListProps {
  onSelectExpenses: (selectedExpenses: SingleExpense[]) => void;
  multiSelectMode: boolean;
}

const ExpenseList = ({
  onSelectExpenses,
  multiSelectMode,
}: ExpenseListProps) => {
  const {
    state,
    dispatch,
    showExpenseModalFunc,
    showBudgetModalFunc,
    showEditExpenseModalFunc,
    setSelectedExpense,
  } = useContext(AppContext);

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "",
  });
  const [selectedExpenses, setSelectedExpenses] = useState<SingleExpense[]>([]);

  const toggleFilters = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setFiltersVisible(!filtersVisible);
  };

  const handleRemove = (expenseId: string) => {
    dispatch({ type: "removeExpense", payload: { id: expenseId } });
    showExpenseModalFunc(false);
  };

  const handleEdit = (expense: SingleExpense) => {
    setSelectedExpense(expense);
    showEditExpenseModalFunc(true);
  };

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "";
    }
    setSortConfig({ key, direction });
  };

  const flattenExpenses = (expenses: ExpensesByYear) => {
    return Object.values(expenses).flatMap((year) =>
      Object.values(year).flat()
    );
  };

  const sortedExpenses = flattenExpenses(state.expenses).sort((a, b) => {
    const { key, direction } = sortConfig;
    if (direction === "") return 0;

    let compareA: any;
    let compareB: any;

    switch (key) {
      case "category":
        compareA = a.category;
        compareB = b.category;
        break;
      case "id":
        compareA = a.id;
        compareB = b.id;
        break;
      case "name":
        compareA = a.name;
        compareB = b.name;
        break;
      case "date":
        compareA = a.date;
        compareB = b.date;
        break;
      case "price":
        compareA = a.price;
        compareB = b.price;
        break;
      default:
        return 0;
    }

    if (compareA < compareB) {
      return direction === "ascending" ? -1 : 1;
    }
    if (compareA > compareB) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter((expense) => {
    const matchesCategory =
      state.filters.categories.length > 0
        ? state.filters.categories.includes(expense.category)
        : true;

    const matchesDateRange =
      (!state.filters.dateRange.startDate ||
        dayjs(expense.date, "DD-MM-YYYY").isAfter(
          dayjs(state.filters.dateRange.startDate, "DD-MM-YYYY").subtract(
            1,
            "day"
          )
        )) &&
      (!state.filters.dateRange.endDate ||
        dayjs(expense.date, "DD-MM-YYYY").isBefore(
          dayjs(state.filters.dateRange.endDate, "DD-MM-YYYY").add(1, "day")
        ));

    const matchesPriceRange =
      (!state.filters.priceRange.minPrice ||
        expense.price >= Number(state.filters.priceRange.minPrice)) &&
      (!state.filters.priceRange.maxPrice ||
        expense.price <= Number(state.filters.priceRange.maxPrice));

    return matchesCategory && matchesDateRange && matchesPriceRange;
  });

  const handleSelectExpense = (expense: SingleExpense) => {
    setSelectedExpenses((prevSelected) => {
      if (prevSelected.includes(expense)) {
        return prevSelected.filter((exp) => exp !== expense);
      } else {
        return [...prevSelected, expense];
      }
    });
  };

  useEffect(() => {
    onSelectExpenses(selectedExpenses);
  }, [selectedExpenses, onSelectExpenses]);

  return (
    <div className={styles.totalExpenses}>
      {state.showExpenseModal && (
        <ModalContainer
          isOpen={state.showExpenseModal}
          onClose={() => showExpenseModalFunc(false)}
        >
          <AddExpense />
        </ModalContainer>
      )}
      {state.showBudgetModal && (
        <ModalContainer
          isOpen={state.showBudgetModal}
          onClose={() => showBudgetModalFunc(false)}
        >
          <EditBudget />
        </ModalContainer>
      )}
      {state.showEditExpenseModal && (
        <ModalContainer
          isOpen={state.showEditExpenseModal}
          onClose={() => showEditExpenseModalFunc(false)}
        >
          <EditExpense />
        </ModalContainer>
      )}

      <div className={styles.tableHeader}>
        <div className={styles.tableField} onClick={() => handleSort("name")}>
          Name
          <SortIcon
            className={
              sortConfig.key === "name" && sortConfig.direction
                ? styles.activeSortIcon
                : ""
            }
          />
        </div>
        <div
          className={styles.tableField}
          onClick={() => handleSort("category")}
        >
          Category
          <SortIcon
            className={
              sortConfig.key === "category" && sortConfig.direction
                ? styles.activeSortIcon
                : ""
            }
          />
        </div>
        <div className={styles.tableField} onClick={() => handleSort("price")}>
          Price
          <SortIcon
            className={
              sortConfig.key === "price" && sortConfig.direction
                ? styles.activeSortIcon
                : ""
            }
          />
        </div>
        <div className={styles.tableField} onClick={() => handleSort("date")}>
          Date
          <SortIcon
            className={
              sortConfig.key === "date" && sortConfig.direction
                ? styles.activeSortIcon
                : ""
            }
          />
        </div>
        <div className={styles.rightSection} onClick={toggleFilters}>
          <p>Filter</p>
          <IconButton className={styles.iconButton}>
            <FilterListIcon />
          </IconButton>
          <PersistentPopover
            anchorEl={anchorEl}
            isOpen={filtersVisible}
            onClose={(event, reason) =>
              toggleFilters(event as MouseEvent<HTMLElement>)
            }
          >
            <Filters />
          </PersistentPopover>
        </div>
      </div>
      <div className={styles.expensesList}>
        {filteredExpenses.map((expense) => (
          <Expense
            key={expense.id}
            id={expense.id}
            name={expense.name}
            price={expense.price}
            category={expense.category}
            date={expense.date}
            categories={state.categories}
            onEdit={() => handleEdit(expense as SingleExpense)}
            onRemove={() => handleRemove(expense.id)}
            onSelect={() => handleSelectExpense(expense as SingleExpense)}
            isSelected={selectedExpenses.includes(expense as SingleExpense)}
            multiSelectMode={multiSelectMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
