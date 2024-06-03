import React from "react";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown.tsx";
import styles from "./CategoryFilter.module.css";
import { Categories } from "../../../Types";
import { SelectChangeEvent } from "@mui/material";

type CategoryFilterProps = {
  selectedCategories: string[];
  handleCategoryChange: (e: SelectChangeEvent<string[] | string>) => void;
  categories: Categories;
};

const CategoryFilter = ({
  selectedCategories,
  handleCategoryChange,
  categories,
}: CategoryFilterProps) => {
  return (
    <div className={styles.categoryFilter}>
      <CategoryDropdown
        category={selectedCategories}
        categories={categories}
        onChange={handleCategoryChange}
        multiple
      />
    </div>
  );
};

export default CategoryFilter;
