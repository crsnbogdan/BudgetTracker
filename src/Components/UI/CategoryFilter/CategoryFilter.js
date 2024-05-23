import React from "react";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import "./CategoryFilter.css";
import { Typography } from "@mui/material";

const CategoryFilter = ({
  selectedCategories,
  handleCategoryChange,
  categories,
}) => {
  return (
    <div className="category-filter">
      <Typography style={{ color: "#a3a3ff" }}>Category</Typography>
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
