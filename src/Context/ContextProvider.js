import React, { createContext, useReducer } from "react";
import uniqid from "uniquid";

const initialExpenses = [
  {
    id: uniqid(),
    name: "Grocery Shopping",
    price: 50.75,
    category: "1",
    date: "2024-05-10",
  },
  {
    id: uniqid(),
    name: "Electric Bill",
    price: 75.0,
    category: "2",
    date: "2024-05-08",
  },
  {
    id: uniqid(),
    name: "Doctor Visit",
    price: 120.0,
    category: "3",
    date: "2024-05-05",
  },
  {
    id: uniqid(),
    name: "Gas",
    price: 40.0,
    category: "4",
    date: "2024-05-12",
  },
  {
    id: uniqid(),
    name: "Rent",
    price: 1000.0,
    category: "5",
    date: "2024-05-01",
  },
  {
    id: uniqid(),
    name: "Netflix Subscription",
    price: 15.99,
    category: "6",
    date: "2024-05-09",
  },
  {
    id: uniqid(),
    name: "Investment Deposit",
    price: 200.0,
    category: "7",
    date: "2024-05-06",
  },
  {
    id: uniqid(),
    name: "Restaurant Dinner",
    price: 80.0,
    category: "1",
    date: "2024-05-11",
  },
  {
    id: uniqid(),
    name: "Water Bill",
    price: 30.0,
    category: "2",
    date: "2024-05-07",
  },
  {
    id: uniqid(),
    name: "Bus Pass",
    price: 25.0,
    category: "4",
    date: "2024-05-04",
  },
  {
    id: uniqid(),
    name: "Gym Membership",
    price: 45.0,
    category: "3",
    date: "2024-05-03",
  },
  {
    id: uniqid(),
    name: "Savings Deposit",
    price: 150.0,
    category: "7",
    date: "2024-05-10",
  },
  {
    id: uniqid(),
    name: "Movie Tickets",
    price: 20.0,
    category: "6",
    date: "2024-05-13",
  },
  {
    id: uniqid(),
    name: "Car Maintenance",
    price: 300.0,
    category: "4",
    date: "2024-05-14",
  },
  {
    id: uniqid(),
    name: "Miscellaneous Shopping",
    price: 60.0,
    category: "8",
    date: "2024-05-02",
  },
];

const initialCategories = {
  1: {
    id: 1,
    color: "#4DD0E1",
    budget: "20",
    name: "Food & Dining",
  },
  2: {
    id: 2,
    color: "#64B5F6",
    budget: "10",
    name: "Utilities",
  },
  3: {
    id: 3,
    color: "#81C784",
    budget: "10",
    name: "Healthcare",
  },
  4: {
    id: 4,
    color: "#BA68C8",
    budget: "10",
    name: "Transportation",
  },
  5: {
    id: 5,
    color: "#FFD700",
    budget: "25",
    name: "Housing & Rent",
  },
  6: {
    id: 6,
    color: "#FF69B4",
    budget: "5",
    name: "Entertainment",
  },
  7: {
    id: 7,
    color: "#8A2BE2",
    budget: "10",
    name: "Savings & Investments",
  },
  8: {
    id: 8,
    color: "#FF6347",
    budget: "5",
    name: "Miscellaneous",
  },
};

const getCategoryTotal = (expenses, categoryId) => {
  return expenses
    .filter((expense) => expense.category === categoryId)
    .reduce((total, expense) => total + expense.price, 0);
};

const calculateCategoriesUsage = (categories, expenses) => {
  const updatedCategories = { ...categories };
  Object.keys(updatedCategories).forEach((key) => {
    updatedCategories[key].used = getCategoryTotal(expenses, key);
  });
  return updatedCategories;
};

Object.keys(initialCategories).forEach((key) => {
  initialCategories[key].used = getCategoryTotal(initialExpenses, key);
});

const initialState = {
  expenses: initialExpenses,
  totalBudget: 5000,
  categories: calculateCategoriesUsage(initialCategories, initialExpenses),
  showExpenseModal: false,
  showBudgetModal: false,
  showEditExpenseModal: false,
  selectedExpense: {},
  filters: {
    categories: [],
    dateRange: { startDate: null, endDate: null },
    priceRange: { minPrice: "", maxPrice: "" },
  },
};

const calculateUsedBudget = (state) => {
  const updatedCategories = { ...state.categories };

  for (const key in updatedCategories) {
    updatedCategories[key].used = 0;
  }

  Object.keys(updatedCategories).forEach((key) => {
    const totalUsed = state.expenses
      .filter((expense) => expense.category === key)
      .reduce((total, expense) => total + expense.price, 0);
    updatedCategories[key].used = totalUsed;
  });

  return updatedCategories;
};

const AppReducer = (state, action) => {
  let updatedState;
  switch (action.type) {
    case "addExpense":
      const newExpense = { ...action.payload, id: uniqid() };
      updatedState = {
        ...state,
        expenses: [...state.expenses, newExpense],
      };
      break;
    case "removeExpense":
      updatedState = {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
      break;
    case "removeMultipleExpenses":
      updatedState = {
        ...state,
        expenses: state.expenses.filter(
          (expense) => !action.payload.ids.includes(expense.id)
        ),
      };
      break;
    case "updateExpense":
      updatedState = {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
      break;
    case "showExpenseModal":
      updatedState = {
        ...state,
        showExpenseModal: true,
      };
      break;
    case "hideExpenseModal":
      updatedState = {
        ...state,
        showExpenseModal: false,
      };
      break;
    case "showBudgetModal":
      updatedState = {
        ...state,
        showBudgetModal: true,
      };
      break;
    case "hideBudgetModal":
      updatedState = {
        ...state,
        showBudgetModal: false,
      };
      break;
    case "showEditExpenseModal":
      updatedState = {
        ...state,
        showEditExpenseModal: true,
      };
      break;
    case "hideEditExpenseModal":
      updatedState = {
        ...state,
        showEditExpenseModal: false,
      };
      break;
    case "setSelectedExpense":
      updatedState = {
        ...state,
        selectedExpense: action.payload,
      };
      break;
    case "updateFilters":
      updatedState = {
        ...state,
        filters: action.payload,
      };
      break;
    case "updateBudget":
      updatedState = {
        ...state,
        totalBudget: action.payload.totalBudget,
      };
      break;
    case "updateCategories":
      updatedState = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case "addCategory":
      const newCategoryId = uniqid();
      updatedState = {
        ...state,
        categories: {
          ...state.categories,
          [newCategoryId]: {
            ...action.payload,
            id: newCategoryId,
            used: 0,
          },
        },
      };
      break;
    case "removeCategory":
      const { [action.payload.id]: _, ...remainingCategories } =
        state.categories;
      updatedState = {
        ...state,
        categories: remainingCategories,
      };
      break;
    default:
      updatedState = state;
      break;
  }

  return {
    ...updatedState,
    categories: calculateCategoriesUsage(
      updatedState.categories,
      updatedState.expenses
    ),
  };
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const showExpenseModal = (show) => {
    if (show) {
      dispatch({ type: "showExpenseModal" });
    } else {
      dispatch({ type: "hideExpenseModal" });
    }
  };

  const showBudgetModal = (show) => {
    if (show) {
      dispatch({ type: "showBudgetModal" });
    } else {
      dispatch({ type: "hideBudgetModal" });
    }
  };

  const showEditExpenseModal = (show) => {
    if (show) {
      dispatch({ type: "showEditExpenseModal" });
    } else {
      dispatch({ type: "hideEditExpenseModal" });
    }
  };

  const setSelectedExpense = (payload) => {
    dispatch({ type: "setSelectedExpense", payload });
  };

  const updateFilters = (filters) => {
    dispatch({ type: "updateFilters", payload: filters });
  };

  const removeMultipleExpenses = (ids) => {
    dispatch({ type: "removeMultipleExpenses", payload: { ids } });
  };

  return (
    <AppContext.Provider
      value={{
        dispatch,
        state,
        categories: state.categories,
        showExpenseModal,
        showBudgetModal,
        showEditExpenseModal,
        setSelectedExpense,
        updateFilters,
        selectedExpense: state.selectedExpense,
        removeMultipleExpenses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
