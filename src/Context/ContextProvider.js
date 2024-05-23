import React, { createContext, useReducer } from "react";

const initialExpenses = [
  {
    id: 1,
    name: "Grocery Shopping",
    price: 50.75,
    category: "Food & Dining",
    date: "2024-05-10",
  },
  {
    id: 2,
    name: "Electric Bill",
    price: 75.0,
    category: "Utilities",
    date: "2024-05-08",
  },
  {
    id: 3,
    name: "Doctor Visit",
    price: 120.0,
    category: "Healthcare",
    date: "2024-05-05",
  },
  {
    id: 4,
    name: "Gas",
    price: 40.0,
    category: "Transportation",
    date: "2024-05-12",
  },
  {
    id: 5,
    name: "Rent",
    price: 1000.0,
    category: "Housing & Rent",
    date: "2024-05-01",
  },
  {
    id: 6,
    name: "Netflix Subscription",
    price: 15.99,
    category: "Entertainment",
    date: "2024-05-09",
  },
  {
    id: 7,
    name: "Investment Deposit",
    price: 200.0,
    category: "Savings & Investments",
    date: "2024-05-06",
  },
  {
    id: 8,
    name: "Restaurant Dinner",
    price: 80.0,
    category: "Food & Dining",
    date: "2024-05-11",
  },
  {
    id: 9,
    name: "Water Bill",
    price: 30.0,
    category: "Utilities",
    date: "2024-05-07",
  },
  {
    id: 10,
    name: "Bus Pass",
    price: 25.0,
    category: "Transportation",
    date: "2024-05-04",
  },
  {
    id: 11,
    name: "Gym Membership",
    price: 45.0,
    category: "Healthcare",
    date: "2024-05-03",
  },
  {
    id: 12,
    name: "Savings Deposit",
    price: 150.0,
    category: "Savings & Investments",
    date: "2024-05-10",
  },
  {
    id: 13,
    name: "Movie Tickets",
    price: 20.0,
    category: "Entertainment",
    date: "2024-05-13",
  },
  {
    id: 14,
    name: "Car Maintenance",
    price: 300.0,
    category: "Transportation",
    date: "2024-05-14",
  },
  {
    id: 15,
    name: "Miscellaneous Shopping",
    price: 60.0,
    category: "Miscellaneous",
    date: "2024-05-02",
  },
];

const getCategoryTotal = (expenses, category) => {
  return expenses
    .filter((expense) => expense.category === category)
    .reduce((total, expense) => total + expense.price, 0);
};

const initialCategories = {
  "Food & Dining": {
    color: "#4DD0E1",
    budget: "20",
    name: "Food & Dining",
  },
  Utilities: {
    color: "#64B5F6",
    budget: "10",
    name: "Utilities",
  },
  Healthcare: {
    color: "#81C784",
    budget: "10",
    name: "Healthcare",
  },
  Transportation: {
    color: "#BA68C8",
    budget: "10",
    name: "Transportation",
  },
  "Housing & Rent": {
    color: "#FFD700",
    budget: "25",
    name: "Housing & Rent",
  },
  Entertainment: {
    color: "#FF69B4",
    budget: "5",
    name: "Entertainment",
  },
  "Savings & Investments": {
    color: "#8A2BE2",
    budget: "10",
    name: "Savings & Investments",
  },
  Miscellaneous: {
    color: "#FF6347",
    budget: "5",
    name: "Miscellaneous",
  },
};

Object.keys(initialCategories).forEach((category) => {
  initialCategories[category].used = getCategoryTotal(
    initialExpenses,
    category
  );
});

const initialState = {
  expenses: initialExpenses,
  totalBudget: 5000,
  usedBudget: 0,
  showExpenseModal: false,
  showBudgetModal: false,
  showEditExpenseModal: false,
  selectedExpense: {},
  categories: initialCategories,
  filters: {
    categories: [],
    dateRange: { startDate: null, endDate: null },
    priceRange: { minPrice: "", maxPrice: "" },
  },
};

const calculateUsedBudget = (state) => {
  const updatedCategories = { ...state.categories };

  for (const category in updatedCategories) {
    updatedCategories[category].used = 0;
  }

  Object.keys(updatedCategories).forEach((category) => {
    const totalUsed = state.expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.price, 0);
    updatedCategories[category].used = totalUsed;
  });

  return updatedCategories;
};

const AppReducer = (state, action) => {
  let updatedState;
  switch (action.type) {
    case "addExpense":
      updatedState = {
        ...state,
        expenses: [...state.expenses, action.payload],
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
      updatedState = {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.name]: {
            ...action.payload,
            used: 0,
          },
        },
      };
      break;
    case "removeCategory":
      const { [action.payload.name]: _, ...remainingCategories } =
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
    categories: calculateUsedBudget(updatedState),
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
