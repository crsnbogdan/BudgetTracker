import React from "react";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import styles from "./CategoryFilter.module.css";

const CategoryFilter = ({
  selectedCategories,
  handleCategoryChange,
  categories,
}) => {
  return (
    <div className={styles.categoryFilter}>
      <CategoryDropdown
        category={selectedCategories}
        categories={categories}
        onChange={handleCategoryChange}
        multiple={true}
      />
    </div>
  );
};

export default CategoryFilter;
