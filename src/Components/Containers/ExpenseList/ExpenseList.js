import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../Context/ContextProvider";
import ModalContainer from "../../UI/ModalContainer/ModalContainer";
import AddExpense from "../AddExpense/AddExpense";
import EditExpense from "../EditExpense/EditExpense";
import EditBudget from "../EditBudget/EditBudget";
import Filters from "../Filters/Filters";
import Expense from "../../UI/Expense/Expense";
import PersistentPopover from "../../UI/PersistentPopover/PersistentPopover";
import dayjs from "dayjs";
import { Box, Typography, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import styles from "./ExpenseList.module.css";

const ExpenseList = ({ onSelectExpenses, multiSelectMode }) => {
  const {
    state,
    dispatch,
    showExpenseModal,
    showBudgetModal,
    showEditExpenseModal,
    setSelectedExpense,
  } = useContext(AppContext);

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  const toggleFilters = (event) => {
    setAnchorEl(event.currentTarget);
    setFiltersVisible(!filtersVisible);
  };

  const handleFilterChange = (newFilters) => {
    dispatch({ type: "updateFilters", payload: newFilters });
  };

  const handleRemove = (expense) => {
    dispatch({ type: "removeExpense", payload: expense });
    showExpenseModal(false);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    showEditExpenseModal(true);
  };

  const handleSort = (key) => {
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

  const getSortIconColor = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ||
        sortConfig.direction === "descending"
        ? "#a3a3ff"
        : "white";
    }
    return "white";
  };

  const sortedExpenses = [...state.expenses].sort((a, b) => {
    if (sortConfig.direction === "") return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
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
        dayjs(expense.date).isAfter(
          dayjs(state.filters.dateRange.startDate).subtract(1, "day")
        )) &&
      (!state.filters.dateRange.endDate ||
        dayjs(expense.date).isBefore(
          dayjs(state.filters.dateRange.endDate).add(1, "day")
        ));

    const matchesPriceRange =
      (!state.filters.priceRange.minPrice ||
        expense.price >= state.filters.priceRange.minPrice) &&
      (!state.filters.priceRange.maxPrice ||
        expense.price <= state.filters.priceRange.maxPrice);

    return matchesCategory && matchesDateRange && matchesPriceRange;
  });

  const handleSelectExpense = (expense) => {
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
    <Box className={styles["total-expenses"]}>
      {state.showExpenseModal && (
        <ModalContainer
          isOpen={state.showExpenseModal}
          onClose={() => showExpenseModal(false)}
        >
          <AddExpense />
        </ModalContainer>
      )}
      {state.showBudgetModal && (
        <ModalContainer
          isOpen={state.showBudgetModal}
          onClose={() => showBudgetModal(false)}
        >
          <EditBudget />
        </ModalContainer>
      )}
      {state.showEditExpenseModal && (
        <ModalContainer
          isOpen={state.showEditExpenseModal}
          onClose={() => showEditExpenseModal(false)}
        >
          <EditExpense />
        </ModalContainer>
      )}

      <Box className={styles["table-header"]}>
        <Typography
          className={`${styles["header-name"]} ${styles["table-field"]}`}
          onClick={() => handleSort("name")}
          sx={{ cursor: "pointer" }}
        >
          Name
          <SortIcon
            className={
              sortConfig.key === "name" && sortConfig.direction
                ? styles.activeSortIcon
                : ""
            }
          />
        </Typography>
        <Typography
          className={`${styles["header-category"]} ${styles["table-field"]}`}
          onClick={() => handleSort("category")}
          sx={{ cursor: "pointer" }}
        >
          Category
          <SortIcon
            className={
              sortConfig.key === "category" && sortConfig.direction
                ? styles.activeSortIcon
                : ""
            }
          />
        </Typography>
        <Typography
          className={`${styles["header-price"]} ${styles["table-field"]}`}
          onClick={() => handleSort("price")}
          sx={{ cursor: "pointer" }}
        >
          Price
          <SortIcon
            className={
              sortConfig.key === "price" && sortConfig.direction
                ? styles.activeSortIcon
                : ""
            }
          />
        </Typography>
        <Typography
          className={`${styles["header-date"]} ${styles["table-field"]}`}
          onClick={() => handleSort("date")}
          sx={{ cursor: "pointer" }}
        >
          Date
          <SortIcon
            className={
              sortConfig.key === "date" && sortConfig.direction
                ? styles.activeSortIcon
                : ""
            }
          />
        </Typography>
        <Box
          className={styles["right-section"]}
          onClick={toggleFilters}
          sx={{ cursor: "pointer", marginLeft: "auto" }}
        >
          <Typography className={styles["header-date"]}>Filter</Typography>
          <IconButton style={{ color: "#ffffff" }}>
            <FilterListIcon />
          </IconButton>
          <PersistentPopover
            anchorEl={anchorEl}
            isOpen={filtersVisible}
            onClose={toggleFilters}
          >
            <Filters
              categories={state.categories}
              onFilterChange={handleFilterChange}
            />
          </PersistentPopover>
        </Box>
      </Box>
      <Box className={styles["expenses-list"]}>
        {filteredExpenses.map((expense) => (
          <Expense
            key={expense.id}
            id={expense.id}
            name={expense.name}
            price={expense.price}
            category={expense.category}
            date={expense.date}
            categories={state.categories}
            onEdit={() => handleEdit(expense)}
            onRemove={() => handleRemove(expense)}
            onSelect={() => handleSelectExpense(expense)}
            isSelected={selectedExpenses.includes(expense)}
            multiSelectMode={multiSelectMode}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ExpenseList;
