import React, { useContext } from "react";
import CategoryFilter from "../UI/CategoryFilter/CategoryFilter";
import DateRangeFilter from "../UI/DateRangeFilter/DateRangeFilter";
import PriceRangeFilter from "../UI/PriceRangeFilter/PriceRangeFilter";
import { Box } from "@mui/material";
import { AppContext } from "../../Context/ContextProvider";
import "./Filters.css";

const Filters = () => {
  const { state, updateFilters } = useContext(AppContext);

  const handleCategoryChange = (event) => {
    const categories = event.target.value;
    const newFilters = { ...state.filters, categories };
    updateFilters(newFilters);
  };

  const handleStartDateChange = (startDate) => {
    const newFilters = {
      ...state.filters,
      dateRange: { ...state.filters.dateRange, startDate },
    };
    updateFilters(newFilters);
  };

  const handleEndDateChange = (endDate) => {
    const newFilters = {
      ...state.filters,
      dateRange: { ...state.filters.dateRange, endDate },
    };
    updateFilters(newFilters);
  };

  const handleMinPriceChange = (e) => {
    const minPrice = e.target.value;
    const newFilters = {
      ...state.filters,
      priceRange: { ...state.filters.priceRange, minPrice },
    };
    updateFilters(newFilters);
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = e.target.value;
    const newFilters = {
      ...state.filters,
      priceRange: { ...state.filters.priceRange, maxPrice },
    };
    updateFilters(newFilters);
  };

  return (
    <Box className="expenses-list">
      <Box className="filters-section">
        <CategoryFilter
          selectedCategories={state.filters.categories}
          handleCategoryChange={handleCategoryChange}
          categories={state.categories}
        />
        <DateRangeFilter
          startDate={state.filters.dateRange.startDate}
          endDate={state.filters.dateRange.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        <PriceRangeFilter
          minPrice={state.filters.priceRange.minPrice}
          maxPrice={state.filters.priceRange.maxPrice}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
        />
      </Box>
    </Box>
  );
};

export default Filters;
