import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";
import ModalContainer from "../UI/ModalContainer/ModalContainer";
import AddExpense from "../AddExpense/AddExpense";
import EditExpense from "../EditExpense/EditExpense";
import EditBudget from "../EditBudget/EditBudget";
import Filters from "../Filters/Filters";
import Expense from "../UI/Expense/Expense";
import PersistentPopover from "../UI/PersistentPopover/PersistentPopover";
import dayjs from "dayjs";
import { Box, Typography, styled, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import "./ExpenseList.css";

const ExpenseList = () => {
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

  return (
    <Box className="total-expenses">
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

      <Box className="table-header">
        <Typography
          className="header-name table-field"
          onClick={() => handleSort("name")}
          sx={{ cursor: "pointer" }}
        >
          Name
          <SortIcon
            style={{ marginLeft: "5px", color: getSortIconColor("name") }}
          />
        </Typography>
        <Typography
          className="header-category table-field"
          onClick={() => handleSort("category")}
          sx={{ cursor: "pointer" }}
        >
          Category
          <SortIcon
            style={{ marginLeft: "5px", color: getSortIconColor("category") }}
          />
        </Typography>
        <Typography
          className="header-price table-field"
          onClick={() => handleSort("price")}
          sx={{ cursor: "pointer" }}
        >
          Price
          <SortIcon
            style={{ marginLeft: "5px", color: getSortIconColor("price") }}
          />
        </Typography>
        <Typography
          className="header-date table-field"
          onClick={() => handleSort("date")}
          sx={{ cursor: "pointer" }}
        >
          Date
          <SortIcon
            style={{ marginLeft: "5px", color: getSortIconColor("date") }}
          />
        </Typography>
        <Box
          className="right-section"
          onClick={toggleFilters}
          sx={{ cursor: "pointer" }}
        >
          <Typography className="header-date table-field">Filter</Typography>
          <IconButton style={{ color: "#ffffff", paddingRight: 0 }}>
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
      <Box className="expenses-list">
        {filteredExpenses.map((expense, index) => (
          <Expense
            key={index}
            name={expense.name}
            price={expense.price}
            category={expense.category}
            date={expense.date}
            categories={state.categories}
            onEdit={() => handleEdit(expense)}
            onRemove={() => handleRemove(expense)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ExpenseList;
