// src/Types.ts

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
  price: number;
  category: number;
  date: string;
  categories: Categories;
  onEdit: () => void;
  onRemove: () => void;
  onSelect: () => void;
  isSelected: boolean;
  multiSelectMode: boolean;
  isSmall: boolean;
  frequency: "daily" | "monthly" | "weekly";
};
