import React, { useContext, useState } from "react";
import CategoryFilter from "../../UI/CategoryFilter/CategoryFilter";
import DateRangeFilter from "../../UI/DateRangeFilter/DateRangeFilter";
import PriceRangeFilter from "../../UI/PriceRangeFilter/PriceRangeFilter";
import { AppContext } from "../../../Context/ContextProvider";
import dayjs from "dayjs";
import styles from "./Filters.module.css";

const predefinedRanges = [
  { label: "Custom", value: "custom" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "last7" },
  { label: "This Month", value: "thisMonth" },
  { label: "Last Month", value: "lastMonth" },
  { label: "This Year", value: "thisYear" },
  { label: "Last Year", value: "lastYear" },
];

const Filters = () => {
  const { state, updateFilters } = useContext(AppContext);
  const [selectedRange, setSelectedRange] = useState("custom");

  const handleCategoryChange = (event) => {
    const categories = event.target.value;
    const newFilters = { ...state.filters, categories };
    updateFilters(newFilters);
  };

  const handleRangeChange = (value) => {
    setSelectedRange(value);
    let startDate = null;
    let endDate = null;
    switch (value) {
      case "thisYear":
        startDate = dayjs().startOf("year");
        endDate = dayjs().endOf("year");
        break;
      case "last7":
        startDate = dayjs().subtract(7, "days");
        endDate = dayjs();
        break;
      case "thisMonth":
        startDate = dayjs().startOf("month");
        endDate = dayjs().endOf("month");
        break;
      case "lastMonth":
        startDate = dayjs().subtract(1, "month").startOf("month");
        endDate = dayjs().subtract(1, "month").endOf("month");
        break;
      case "today":
        startDate = dayjs().startOf("day");
        endDate = dayjs().endOf("day");
        break;
      case "yesterday":
        startDate = dayjs().subtract(1, "day").startOf("day");
        endDate = dayjs().subtract(1, "day").endOf("day");
        break;
      case "lastYear":
        startDate = dayjs().subtract(1, "year").startOf("year");
        endDate = dayjs().subtract(1, "year").endOf("year");
        break;
      default:
        startDate = null;
        endDate = null;
    }
    const newFilters = {
      ...state.filters,
      dateRange: { startDate, endDate },
    };
    updateFilters(newFilters);
  };

  const handleStartDateChange = (startDate) => {
    const newFilters = {
      ...state.filters,
      dateRange: {
        ...state.filters.dateRange,
        startDate: dayjs(startDate).format("DD-MM-YYYY"),
      },
    };
    updateFilters(newFilters);
  };

  const handleEndDateChange = (endDate) => {
    const newFilters = {
      ...state.filters,
      dateRange: {
        ...state.filters.dateRange,
        endDate: dayjs(endDate).format("DD-MM-YYYY"),
      },
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
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Filters</h2>
      <div className={styles.formRow}>
        <CategoryFilter
          selectedCategories={state.filters.categories}
          handleCategoryChange={handleCategoryChange}
          categories={state.categories}
        />
      </div>
      <div className={styles.formRow}>
        <DateRangeFilter
          startDate={state.filters.dateRange.startDate}
          endDate={state.filters.dateRange.endDate}
          selectedRange={selectedRange}
          onRangeChange={handleRangeChange}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          predefinedRanges={predefinedRanges}
        />
      </div>
      <div className={styles.formRow}>
        <PriceRangeFilter
          minPrice={state.filters.priceRange.minPrice}
          maxPrice={state.filters.priceRange.maxPrice}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

export default Filters;
