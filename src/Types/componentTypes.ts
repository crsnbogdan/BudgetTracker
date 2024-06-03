// src/Types.ts
import { Dayjs } from "dayjs";
export type Category = {
  id: number;
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
  name: string;
  date: string | Dayjs;
  price: number;
  category: string;
  id: string;
  categories?: Categories;
  startDate?: string;
  onEdit?: () => void;
  onRemove?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
  multiSelectMode?: boolean;
  isSmall?: boolean;
  frequency?: "daily" | "monthly" | "weekly";
};
export type Frequency = "daily" | "weekly" | "monthly" | "yearly";

export type RecurringExpense = {
  id: string;
  name: string;
  date: string;
  price: number;
  category: string;
  startDate: string;
  frequency: Frequency;
};

export type RecurringExpenses = RecurringExpense[];

type AddExpensePayload = Expense;
type RemoveExpensePayload = { id: string };
type AddRecurringExpensePayload = Expense & {
  frequency: "daily" | "monthly" | "weekly" | undefined;
};
type RemoveRecurringExpensePayload = { id: string };
type RemoveMultipleExpensesPayload = { ids: string[] };
type UpdateExpense = AddExpensePayload & {
  id: string;
};
type ShowExpenseModalPayload = true;
type HideExpenseModalPayload = false;
type ShowBudgetModalPayload = true;
type HideBudgetModalPayload = false;
type ShowEditExpenseModal = true;
type HideEditExpensePayload = false;

export type ActionPayload =
  | AddExpensePayload
  | RemoveExpensePayload
  | AddRecurringExpensePayload
  | RemoveRecurringExpensePayload
  | RemoveMultipleExpensesPayload
  | UpdateExpense
  | ShowExpenseModalPayload
  | HideExpenseModalPayload
  | ShowBudgetModalPayload
  | HideBudgetModalPayload
  | ShowEditExpenseModal
  | HideEditExpensePayload;
// | SetSelectedExpensePayload
// | UpdateFiltersPayload
// | UpdateBudgetPayload
// | UpdateCategoriesPayload

export type Action = {
  type:
    | "addExpense"
    | "addRecurringExpense"
    | "removeExpense"
    | "removeRecurringExpense"
    | "removeMultipleExpensesPayload"
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
    | "hideEditExpenseModal";
  payload: ActionPayload;
};

export type State = {
  expenses: Expense[];
  totalBudget: number;
  recurringExpenses: Expense[];
  categories: Category[];
  showExpenseModal: boolean;
  showBudgetModal: boolean;
  showEditExpenseModal: boolean;
  selectedExpenses: Expense | null;
  filters: {
    categories: Category[];
    dateRange: {
      startDate: string | null;
      endDate: string | null;
    };
    priceRange: {
      minPrice: string;
      maxPrice: string;
    };
  };
};
