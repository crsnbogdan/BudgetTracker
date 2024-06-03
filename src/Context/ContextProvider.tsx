import React, { createContext, useReducer, useEffect, ReactNode } from "react";
// @ts-ignore
import uniqid from "uniquid";
import dayjs from "dayjs";
import {
  ExpensesByYear,
  SingleExpense,
  Expense,
  RecurringExpense,
  Frequency,
  State,
  Action,
  RemoveRecurringExpensePayload,
  RemoveExpensePayload,
  UpdateExpensePayload,
  UpdateFiltersPayload,
  UpdateBudgetPayload,
  UpdateCategoriesPayload,
  SetSelectedExpensePayload,
  RemoveMultipleExpensesPayload,
  Category,
  RemoveCategoryPayload,
} from "../Types/componentTypes";

const initialExpensesList: Expense[] = [
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
  1: {
    id: "1",
    color: "#4DD0E1",
    budget: "20",
    name: "Food & Dining",
    used: 0,
  },
  2: { id: "2", color: "#64B5F6", budget: "10", name: "Utilities", used: 0 },
  3: { id: "3", color: "#81C784", budget: "10", name: "Healthcare", used: 0 },
  4: {
    id: "4",
    color: "#BA68C8",
    budget: "10",
    name: "Transportation",
    used: 0,
  },
  5: {
    id: "5",
    color: "#FFD700",
    budget: "25",
    name: "Housing & Rent",
    used: 0,
  },
  6: { id: "6", color: "#FF69B4", budget: "5", name: "Entertainment", used: 0 },
  7: {
    id: "7",
    color: "#8A2BE2",
    budget: "10",
    name: "Savings & Investments",
    used: 0,
  },
  8: { id: "8", color: "#FF6347", budget: "5", name: "Miscellaneous", used: 0 },
};

const initialRecurringExpenses: RecurringExpense[] = [
  {
    id: uniqid(),
    name: "Internet Subscription",
    price: 50.0,
    category: "2",
    startDate: "01/06/2024",
    date: "01/06/2024",
    frequency: "monthly",
    onRemove: () => {},
    categories: initialCategories,
  },
  {
    id: uniqid(),
    name: "Groceries",
    price: 100.0,
    category: "1",
    startDate: "06/06/2024",
    date: "06/06/2024",
    frequency: "weekly",
    onRemove: () => {},
    categories: initialCategories,
  },
  {
    id: uniqid(),
    name: "Car Insurance",
    price: 200.0,
    category: "4",
    startDate: "01/07/2024",
    date: "01/07/2024",
    frequency: "monthly",
    onRemove: () => {},
    categories: initialCategories,
  },
  {
    id: uniqid(),
    name: "Gym Membership",
    price: 30.0,
    category: "3",
    startDate: "15/06/2024",
    date: "15/06/2024",
    frequency: "monthly",
    onRemove: () => {},
    categories: initialCategories,
  },
  {
    id: uniqid(),
    name: "Gas Refill",
    price: 40.0,
    category: "4",
    startDate: "02/06/2024",
    date: "02/06/2024",
    frequency: "weekly",
    onRemove: () => {},
    categories: initialCategories,
  },
  {
    id: uniqid(),
    name: "Software Subscription",
    price: 120.0,
    category: "8",
    startDate: "01/07/2024",
    date: "01/07/2024",
    frequency: "monthly",
    onRemove: () => {},
    categories: initialCategories,
  },
  {
    id: uniqid(),
    name: "Phone Bill",
    price: 60.0,
    category: "2",
    startDate: "20/06/2024",
    date: "20/06/2024",
    frequency: "monthly",
    onRemove: () => {},
    categories: initialCategories,
  },
  {
    id: uniqid(),
    name: "Movie Night",
    price: 25.0,
    category: "6",
    startDate: "07/06/2024",
    date: "07/06/2024",
    frequency: "weekly",
    onRemove: () => {},
    categories: initialCategories,
  },
];
const initializeExpenses = (initialExpenses: Expense[]): ExpensesByYear => {
  const expenses: ExpensesByYear = {};
  initialExpenses.forEach((expense) => {
    const date = dayjs(expense.date, "DD/MM/YYYY");
    const year = date.year().toString();
    const month = (date.month() + 1).toString();

    if (!expenses[year]) expenses[year] = {};
    if (!expenses[year][month]) expenses[year][month] = [];
    expenses[year][month].push(expense);
  });
  return expenses;
};

const initialState: State = {
  expenses: initializeExpenses(initialExpensesList),
  totalBudget: 5000,
  recurringExpenses: initialRecurringExpenses,
  categories: initialCategories,
  showExpenseModal: false,
  showBudgetModal: false,
  showEditExpenseModal: false,
  selectedExpense: null,
  filters: {
    categories: [],
    dateRange: { startDate: null, endDate: null },
    priceRange: { minPrice: null, maxPrice: null },
  },
};

const addExpenseToState = (
  expenses: ExpensesByYear,
  newExpense: SingleExpense | RecurringExpense
) => {
  const date = dayjs(newExpense.date, "DD/MM/YYYY");
  const year = date.year().toString();
  const month = (date.month() + 1).toString();

  if (!expenses[year]) expenses[year] = {};
  if (!expenses[year][month]) expenses[year][month] = [];

  expenses[year][month].push(newExpense);
  return { ...expenses };
};

const removeExpenseFromState = (
  expenses: ExpensesByYear,
  expenseId: string
) => {
  const updatedExpenses = { ...expenses };
  Object.keys(updatedExpenses).forEach((year) => {
    Object.keys(updatedExpenses[year]).forEach((month) => {
      updatedExpenses[year][month] = updatedExpenses[year][month].filter(
        (expense: Expense) => expense.id !== expenseId
      );
    });
  });
  return updatedExpenses;
};

const calculateUsedBudget = (state: State) => {
  const updatedCategories = { ...state.categories };
  for (const key in updatedCategories) {
    updatedCategories[key].used = 0;
  }

  Object.keys(state.expenses).forEach((year) => {
    Object.keys(state.expenses[year]).forEach((month) => {
      state.expenses[year][month].forEach((expense: Expense) => {
        if (updatedCategories[expense.category]) {
          updatedCategories[expense.category].used += expense.price;
        }
      });
    });
  });

  state.recurringExpenses.forEach((recurringExpense: RecurringExpense) => {
    const frequencyMultiplier = getFrequencyMultiplier(
      recurringExpense.frequency
    );
    if (updatedCategories[recurringExpense.category]) {
      updatedCategories[recurringExpense.category].used +=
        recurringExpense.price * frequencyMultiplier;
    }
  });

  return updatedCategories;
};

export const getFrequencyMultiplier = (frequency: Frequency) => {
  switch (frequency) {
    case "daily":
      return 30;
    case "weekly":
      return 4;
    case "monthly":
      return 1;
    default:
      return 30;
  }
};

const AppReducer = (state: State, action: Action): State => {
  let updatedState: State;
  switch (action.type) {
    case "addExpense":
      updatedState = {
        ...state,
        expenses: addExpenseToState(state.expenses, {
          ...(action.payload as SingleExpense),
          id: uniqid(),
        }),
      };
      break;
    case "addRecurringExpense":
      const { startDate, frequency, price, category } =
        action.payload as RecurringExpense;
      const frequencyMultiplier = getFrequencyMultiplier(frequency);
      const monthlyAmount = price * frequencyMultiplier;

      const updatedCategories = { ...state.categories };
      if (updatedCategories[category]) {
        updatedCategories[category].used += monthlyAmount;
      }

      updatedState = {
        ...state,
        recurringExpenses: [
          ...state.recurringExpenses,
          action.payload as RecurringExpense,
        ],
        categories: updatedCategories,
      };
      break;
    case "removeExpense":
      updatedState = {
        ...state,
        expenses: removeExpenseFromState(
          state.expenses,
          (action.payload as RemoveExpensePayload).id
        ),
      };
      break;

    case "removeRecurringExpense":
      const removedExpense = state.recurringExpenses.find(
        (expense: RecurringExpense) =>
          expense.id === (action.payload as RemoveRecurringExpensePayload).id
      );
      if (removedExpense) {
        const { category, price, frequency } = removedExpense;
        const frequencyMultiplier = getFrequencyMultiplier(frequency);
        const monthlyAmount = price * frequencyMultiplier;

        const updatedCategories = { ...state.categories };
        if (updatedCategories[category]) {
          updatedCategories[category].used -= monthlyAmount;
        }

        updatedState = {
          ...state,
          recurringExpenses: state.recurringExpenses.filter(
            (expense: RecurringExpense) =>
              expense.id !==
              (action.payload as RemoveRecurringExpensePayload).id
          ),
          categories: updatedCategories,
        };
      } else {
        updatedState = state;
      }
      break;
    case "removeExpense":
      updatedState = {
        ...state,
        expenses: removeExpenseFromState(
          state.expenses,
          (action.payload as RemoveExpensePayload).id
        ),
      };
      break;
    case "removeMultipleExpenses":
      updatedState = {
        ...state,
        expenses: (action.payload as RemoveMultipleExpensesPayload).ids.reduce(
          (acc: ExpensesByYear, id: string) => removeExpenseFromState(acc, id),
          state.expenses
        ),
      };
      break;
    case "updateExpense":
      updatedState = {
        ...state,
        expenses: removeExpenseFromState(
          state.expenses,
          (action.payload as UpdateExpensePayload).id
        ),
      };
      updatedState.expenses = addExpenseToState(
        updatedState.expenses,
        action.payload as UpdateExpensePayload
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
        selectedExpense: action.payload as SetSelectedExpensePayload,
      };
      break;
    case "updateFilters":
      updatedState = {
        ...state,
        filters: action.payload as UpdateFiltersPayload,
      };
      break;
    case "updateBudget":
      updatedState = {
        ...state,
        totalBudget: (action.payload as UpdateBudgetPayload).totalBudget,
      };
      break;
    case "updateCategories":
      updatedState = {
        ...state,
        categories: (action.payload as UpdateCategoriesPayload).categories,
      };
      break;
    case "addCategory":
      const newCategoryId = uniqid();
      updatedState = {
        ...state,
        categories: {
          ...state.categories,
          [newCategoryId]: {
            ...(action.payload as Category),
            id: newCategoryId,
            used: 0,
          },
        },
      };
      break;
    case "removeCategory":
      const { id } = action.payload as RemoveCategoryPayload;
      const { [id]: _, ...remainingCategories } = state.categories;
      updatedState = {
        ...state,
        categories: remainingCategories,
        expenses: removeExpensesWithCategory(state.expenses, id),
        recurringExpenses: state.recurringExpenses.filter(
          (expense) => expense.category !== id
        ),
      };
      break;
    case "updateExpenses":
      updatedState = {
        ...state,
        expenses: action.payload as ExpensesByYear,
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

export default AppReducer;

const removeExpensesWithCategory = (
  expenses: ExpensesByYear,
  categoryId: string
): ExpensesByYear => {
  const updatedExpenses: ExpensesByYear = { ...expenses };
  Object.keys(updatedExpenses).forEach((year) => {
    Object.keys(updatedExpenses[year]).forEach((month) => {
      updatedExpenses[year][month] = updatedExpenses[year][month].filter(
        (expense: Expense) => expense.category !== categoryId
      );
    });
  });
  return updatedExpenses;
};

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  showExpenseModalFunc: (show: boolean) => void;
  showBudgetModalFunc: (show: boolean) => void;
  showEditExpenseModalFunc: (show: boolean) => void;
  setSelectedExpense: (payload: SetSelectedExpensePayload) => void;
  updateFilters: (filters: UpdateFiltersPayload) => void;
  removeMultipleExpenses: (ids: string[]) => void;
}>({
  state: initialState,
  dispatch: () => null,
  showExpenseModalFunc: () => {},
  showBudgetModalFunc: () => {},
  showEditExpenseModalFunc: () => {},
  setSelectedExpense: () => {},
  updateFilters: () => {},
  removeMultipleExpenses: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const showExpenseModalFunc = (show: boolean) => {
    if (show) {
      dispatch({ type: "showExpenseModal", payload: {} });
    } else {
      dispatch({ type: "hideExpenseModal", payload: {} });
    }
  };

  const showBudgetModalFunc = (show: boolean) => {
    if (show) {
      dispatch({ type: "showBudgetModal", payload: {} });
    } else {
      dispatch({ type: "hideBudgetModal", payload: {} });
    }
  };

  const showEditExpenseModalFunc = (show: boolean) => {
    if (show) {
      dispatch({ type: "showEditExpenseModal", payload: {} });
    } else {
      dispatch({ type: "hideEditExpenseModal", payload: {} });
    }
  };

  const setSelectedExpense = (payload: SetSelectedExpensePayload) => {
    dispatch({ type: "setSelectedExpense", payload });
  };

  const updateFilters = (filters: UpdateFiltersPayload) => {
    dispatch({ type: "updateFilters", payload: filters });
  };

  const removeMultipleExpenses = (ids: string[]) => {
    dispatch({ type: "removeMultipleExpenses", payload: { ids } });
  };

  useEffect(() => {
    const now = dayjs();
    let updatedExpenses = { ...state.expenses };

    state.recurringExpenses.forEach((recurringExpense: RecurringExpense) => {
      const startDate = dayjs(recurringExpense.startDate, "DD-MM-YYYY");
      let nextOccurrence = startDate;

      while (
        nextOccurrence.isBefore(now, "day") ||
        nextOccurrence.isSame(now, "day")
      ) {
        if (nextOccurrence.isSame(now, "day")) {
          const newExpense: SingleExpense = {
            ...recurringExpense,
            date: nextOccurrence.format("DD-MM-YYYY"),
            id: uniqid(),
            price: recurringExpense.price,
            onRemove: () => {},
            onEdit: () => {},
            categories: state.categories,
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
        showExpenseModalFunc,
        showBudgetModalFunc,
        showEditExpenseModalFunc,
        setSelectedExpense,
        updateFilters,
        removeMultipleExpenses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
