export type Category = {
  id: string;
  color: string;
  budget: string;
  name: string;
  used: number;
  label?: string;
};

export type Categories = {
  [key: string]: Category;
};

export type Expense = {
  category: string;
  id: string;
  name: string;
  date: string;
  price: number;
};

export type Frequency = "daily" | "monthly" | "weekly";

export type SingleExpense = Expense & {
  onRemove: () => void;
  isSmall?: boolean;
  frequency?: string;
  categories: Categories;
  onEdit: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
  multiSelectMode?: boolean;
};

export type RecurringExpense = Expense & {
  onRemove: () => void;
  isSmall?: boolean;
  startDate: string;
  frequency: Frequency;
  categories: Categories;
};

// Define a type alias for expenses organized by year
export type ExpensesByYear = {
  [year: string]: { [month: string]: Expense[] };
};

export type State = {
  expenses: ExpensesByYear;
  totalBudget: number;
  recurringExpenses: RecurringExpense[];
  categories: Categories;
  showExpenseModal: boolean;
  showBudgetModal: boolean;
  showEditExpenseModal: boolean;
  selectedExpense: SingleExpense | null;
  filters: {
    categories: string[];
    dateRange: { startDate: string | null; endDate: string | null };
    priceRange: { minPrice: string | null; maxPrice: string | null };
  };
};

export type AddExpensePayload = SingleExpense;
export type AddRecurringExpensePayload = RecurringExpense;
export type RemoveExpensePayload = { id: string };
export type RemoveRecurringExpensePayload = { id: string };
export type UpdateExpensePayload = SingleExpense;
export type SetSelectedExpensePayload = SingleExpense;
export type UpdateFiltersPayload = {
  categories: string[];
  dateRange: { startDate: string | null; endDate: string | null };
  priceRange: { minPrice: string | null; maxPrice: string | null };
};
export type UpdateBudgetPayload = { totalBudget: number };
export type UpdateCategoriesPayload = { categories: Categories };
export type RemoveMultipleExpensesPayload = { ids: string[] };
export type RemoveCategoryPayload = { id: string };

export type ActionPayload =
  | AddExpensePayload
  | AddRecurringExpensePayload
  | RemoveExpensePayload
  | RemoveRecurringExpensePayload
  | UpdateExpensePayload
  | SetSelectedExpensePayload
  | UpdateFiltersPayload
  | UpdateBudgetPayload
  | UpdateCategoriesPayload
  | RemoveMultipleExpensesPayload
  | Category
  | RemoveCategoryPayload
  | ExpensesByYear;

export type Action = {
  type:
    | "addExpense"
    | "addRecurringExpense"
    | "removeExpense"
    | "removeRecurringExpense"
    | "updateExpense"
    | "setSelectedExpense"
    | "updateFilters"
    | "updateBudget"
    | "updateCategories"
    | "removeMultipleExpenses"
    | "showExpenseModal"
    | "hideExpenseModal"
    | "showBudgetModal"
    | "hideBudgetModal"
    | "showEditExpenseModal"
    | "hideEditExpenseModal"
    | "addCategory"
    | "removeCategory"
    | "updateExpenses";
  payload: ActionPayload;
};
