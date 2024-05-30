import React, { createContext, useReducer, useEffect } from "react";
import uniqid from "uniquid";
import dayjs from "dayjs";

const initialExpensesList = [
  {
    id: uniqid(),
    name: "Grocery Shopping",
    price: 50.75,
    category: "1",
    date: "10/05/2024",
  },
  {
    id: uniqid(),
    name: "Electric Bill",
    price: 75.0,
    category: "2",
    date: "08/05/2024",
  },
  {
    id: uniqid(),
    name: "Doctor Visit",
    price: 120.0,
    category: "3",
    date: "05/05/2024",
  },
  {
    id: uniqid(),
    name: "Gas",
    price: 40.0,
    category: "4",
    date: "12/05/2024",
  },
  {
    id: uniqid(),
    name: "Rent",
    price: 1000.0,
    category: "5",
    date: "01/05/2024",
  },
  {
    id: uniqid(),
    name: "Netflix Subscription",
    price: 15.99,
    category: "6",
    date: "09/05/2024",
  },
  {
    id: uniqid(),
    name: "Investment Deposit",
    price: 200.0,
    category: "7",
    date: "06/05/2024",
  },
  {
    id: uniqid(),
    name: "Restaurant Dinner",
    price: 80.0,
    category: "1",
    date: "11/05/2024",
  },
  {
    id: uniqid(),
    name: "Water Bill",
    price: 30.0,
    category: "2",
    date: "07/05/2024",
  },
  {
    id: uniqid(),
    name: "Bus Pass",
    price: 25.0,
    category: "4",
    date: "04/05/2024",
  },
  {
    id: uniqid(),
    name: "Gym Membership",
    price: 45.0,
    category: "3",
    date: "03/05/2024",
  },
  {
    id: uniqid(),
    name: "Savings Deposit",
    price: 150.0,
    category: "7",
    date: "10/05/2024",
  },
  {
    id: uniqid(),
    name: "Movie Tickets",
    price: 20.0,
    category: "6",
    date: "12/05/2024",
  },
  {
    id: uniqid(),
    name: "Car Maintenance",
    price: 300.0,
    category: "4",
    date: "12/05/2024",
  },
  {
    id: uniqid(),
    name: "Miscellaneous Shopping",
    price: 60.0,
    category: "8",
    date: "02/05/2024",
  },
];

const initialCategories = {
  1: { id: 1, color: "#4DD0E1", budget: "20", name: "Food & Dining" },
  2: { id: 2, color: "#64B5F6", budget: "10", name: "Utilities" },
  3: { id: 3, color: "#81C784", budget: "10", name: "Healthcare" },
  4: { id: 4, color: "#BA68C8", budget: "10", name: "Transportation" },
  5: { id: 5, color: "#FFD700", budget: "25", name: "Housing & Rent" },
  6: { id: 6, color: "#FF69B4", budget: "5", name: "Entertainment" },
  7: { id: 7, color: "#8A2BE2", budget: "10", name: "Savings & Investments" },
  8: { id: 8, color: "#FF6347", budget: "5", name: "Miscellaneous" },
};

const initialRecurringExpenses = [
  {
    id: uniqid(),
    name: "Internet Subscription",
    amount: 50.0,
    category: "2",
    startDate: "01/06/2024",
    frequency: "monthly",
  },
  {
    id: uniqid(),
    name: "Groceries",
    amount: 100.0,
    category: "1",
    startDate: "06/06/2024",
    frequency: "weekly",
  },
  {
    id: uniqid(),
    name: "Car Insurance",
    amount: 200.0,
    category: "4",
    startDate: "01/07/2024",
    frequency: "yearly",
  },
  {
    id: uniqid(),
    name: "Gym Membership",
    amount: 30.0,
    category: "3",
    startDate: "15/06/2024",
    frequency: "monthly",
  },
  {
    id: uniqid(),
    name: "Gas Refill",
    amount: 40.0,
    category: "4",
    startDate: "02/06/2024",
    frequency: "weekly",
  },
  {
    id: uniqid(),
    name: "Software Subscription",
    amount: 120.0,
    category: "8",
    startDate: "01/07/2024",
    frequency: "yearly",
  },
  {
    id: uniqid(),
    name: "Phone Bill",
    amount: 60.0,
    category: "2",
    startDate: "20/06/2024",
    frequency: "monthly",
  },
  {
    id: uniqid(),
    name: "Movie Night",
    amount: 25.0,
    category: "6",
    startDate: "07/06/2024",
    frequency: "weekly",
  },
];
const initializeExpenses = (initialExpenses) => {
  const expenses = {};
  initialExpenses.forEach((expense) => {
    const date = dayjs(expense.date, "DD-MM-YYYY");
    const year = date.year();
    const month = date.month() + 1;

    if (!expenses[year]) expenses[year] = {};
    if (!expenses[year][month]) expenses[year][month] = [];

    expenses[year][month].push(expense);
  });
  return expenses;
};

const initialState = {
  expenses: initializeExpenses(initialExpensesList),
  totalBudget: 5000,
  recurringExpenses: initialRecurringExpenses,
  categories: initialCategories,
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

const addExpenseToState = (expenses, newExpense) => {
  const date = dayjs(newExpense.date, "DD-MM-YYYY");
  const year = date.year();
  const month = date.month() + 1;

  if (!expenses[year]) expenses[year] = {};
  if (!expenses[year][month]) expenses[year][month] = [];

  expenses[year][month].push(newExpense);
  return { ...expenses };
};

const removeExpenseFromState = (expenses, expenseId) => {
  const updatedExpenses = { ...expenses };
  Object.keys(updatedExpenses).forEach((year) => {
    Object.keys(updatedExpenses[year]).forEach((month) => {
      updatedExpenses[year][month] = updatedExpenses[year][month].filter(
        (expense) => expense.id !== expenseId
      );
    });
  });
  return updatedExpenses;
};

const calculateUsedBudget = (state) => {
  if (!state || !state.categories) {
    return {};
  }

  const updatedCategories = { ...state.categories };
  for (const key in updatedCategories) {
    updatedCategories[key].used = 0;
  }

  Object.keys(state.expenses).forEach((year) => {
    Object.keys(state.expenses[year]).forEach((month) => {
      state.expenses[year][month].forEach((expense) => {
        if (updatedCategories[expense.category]) {
          updatedCategories[expense.category].used += expense.price;
        }
      });
    });
  });

  state.recurringExpenses.forEach((recurringExpense) => {
    const frequencyMultiplier = getFrequencyMultiplier(
      recurringExpense.frequency
    );
    if (updatedCategories[recurringExpense.category]) {
      updatedCategories[recurringExpense.category].used +=
        recurringExpense.amount * frequencyMultiplier;
    }
  });

  return updatedCategories;
};

export const getFrequencyMultiplier = (frequency) => {
  switch (frequency) {
    case "daily":
      return 30;
    case "weekly":
      return 4;
    case "monthly":
      return 1;
    case "yearly":
      return 1 / 12;
    default:
      return 0;
  }
};

const AppReducer = (state, action) => {
  let updatedState;
  switch (action.type) {
    case "addExpense":
      updatedState = {
        ...state,
        expenses: addExpenseToState(state.expenses, {
          ...action.payload,
          id: uniqid(),
        }),
      };
      break;
    case "addRecurringExpense":
      const { startDate, frequency, amount, category } = action.payload;
      const frequencyMultiplier = getFrequencyMultiplier(frequency);
      const monthlyAmount = amount * frequencyMultiplier;

      const updatedCategories = { ...state.categories };
      if (updatedCategories[category]) {
        updatedCategories[category].used += monthlyAmount;
      }

      updatedState = {
        ...state,
        recurringExpenses: [...state.recurringExpenses, action.payload],
        categories: updatedCategories,
      };
      break;

    case "removeRecurringExpense":
      const removedExpense = state.recurringExpenses.find(
        (expense) => expense.id === action.payload.id
      );
      if (removedExpense) {
        const { category, amount, frequency } = removedExpense;
        const frequencyMultiplier = getFrequencyMultiplier(frequency);
        const monthlyAmount = amount * frequencyMultiplier;

        const updatedCategories = { ...state.categories };
        if (updatedCategories[category]) {
          updatedCategories[category].used -= monthlyAmount;
        }

        updatedState = {
          ...state,
          recurringExpenses: state.recurringExpenses.filter(
            (expense) => expense.id !== action.payload.id
          ),
          categories: updatedCategories,
        };
      }
      break;
    case "removeExpense":
      updatedState = {
        ...state,
        expenses: removeExpenseFromState(state.expenses, action.payload.id),
      };
      break;
    case "removeMultipleExpenses":
      updatedState = {
        ...state,
        expenses: action.payload.ids.reduce(
          (acc, id) => removeExpenseFromState(acc, id),
          state.expenses
        ),
      };
      break;
    case "updateExpense":
      updatedState = {
        ...state,
        expenses: removeExpenseFromState(state.expenses, action.payload.id),
      };
      updatedState.expenses = addExpenseToState(
        updatedState.expenses,
        action.payload
      );
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
        expenses: removeExpensesWithCategory(state.expenses, action.payload.id),
      };
      break;
    case "updateExpenses":
      updatedState = {
        ...state,
        expenses: action.payload,
      };
      break;
    default:
      updatedState = state;
      break;
  }

  console.log("Updated State:", updatedState);

  return {
    ...updatedState,
    categories: calculateUsedBudget(updatedState),
  };
};

const removeExpensesWithCategory = (expenses, categoryId) => {
  const updatedExpenses = { ...expenses };
  Object.keys(updatedExpenses).forEach((year) => {
    Object.keys(updatedExpenses[year]).forEach((month) => {
      updatedExpenses[year][month] = updatedExpenses[year][month].filter(
        (expense) => expense.category !== categoryId
      );
    });
  });
  return updatedExpenses;
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

  useEffect(() => {
    const now = dayjs();
    let updatedExpenses = { ...state.expenses };

    state.recurringExpenses.forEach((recurringExpense) => {
      const startDate = dayjs(recurringExpense.startDate, "DD-MM-YYYY");
      let nextOccurrence = startDate;

      while (
        nextOccurrence.isBefore(now, "day") ||
        nextOccurrence.isSame(now, "day")
      ) {
        if (nextOccurrence.isSame(now, "day")) {
          const newExpense = {
            ...recurringExpense,
            date: nextOccurrence.format("DD-MM-YYYY"),
            id: uniqid(),
            price: recurringExpense.amount,
          };
          updatedExpenses = addExpenseToState(updatedExpenses, newExpense);
        }

        switch (recurringExpense.frequency) {
          case "daily":
            nextOccurrence = nextOccurrence.add(1, "day");
            break;
          case "weekly":
            nextOccurrence = nextOccurrence.add(1, "week");
            break;
          case "monthly":
            nextOccurrence = nextOccurrence.add(1, "month");
            break;
          case "yearly":
            nextOccurrence = nextOccurrence.add(1, "year");
            break;
          default:
            break;
        }
      }
    });

    if (JSON.stringify(state.expenses) !== JSON.stringify(updatedExpenses)) {
      dispatch({ type: "updateExpenses", payload: updatedExpenses });
    }
  }, [state.recurringExpenses]);

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
