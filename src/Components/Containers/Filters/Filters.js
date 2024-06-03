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
  const { state, dispatch } = useContext(AppContext);
  const [selectedRange, setSelectedRange] = useState("custom");

  const handleCategoryChange = (event) => {
    const categories = event.target.value;
    const newFilters = { ...state.filters, categories };
    dispatch({ type: "updateFilters", payload: newFilters });
  };

  const handleRangeChange = (event) => {
    const value = event.target.value;
    setSelectedRange(value);
    let startDate = null;
    let endDate = null;
    switch (value) {
      case "thisYear":
        startDate = dayjs().startOf("year").format("DD-MM-YYYY");
        endDate = dayjs().endOf("year").format("DD-MM-YYYY");
        break;
      case "last7":
        startDate = dayjs().subtract(7, "days").format("DD-MM-YYYY");
        endDate = dayjs().format("DD-MM-YYYY");
        break;
      case "thisMonth":
        startDate = dayjs().startOf("month").format("DD-MM-YYYY");
        endDate = dayjs().endOf("month").format("DD-MM-YYYY");
        break;
      case "lastMonth":
        startDate = dayjs()
          .subtract(1, "month")
          .startOf("month")
          .format("DD-MM-YYYY");
        endDate = dayjs()
          .subtract(1, "month")
          .endOf("month")
          .format("DD-MM-YYYY");
        break;
      case "today":
        startDate = dayjs().startOf("day").format("DD-MM-YYYY");
        endDate = dayjs().endOf("day").format("DD-MM-YYYY");
        break;
      case "yesterday":
        startDate = dayjs()
          .subtract(1, "day")
          .startOf("day")
          .format("DD-MM-YYYY");
        endDate = dayjs().subtract(1, "day").endOf("day").format("DD-MM-YYYY");
        break;
      case "lastYear":
        startDate = dayjs()
          .subtract(1, "year")
          .startOf("year")
          .format("DD-MM-YYYY");
        endDate = dayjs()
          .subtract(1, "year")
          .endOf("year")
          .format("DD-MM-YYYY");
        break;
      default:
        startDate = null;
        endDate = null;
    }
    const newFilters = {
      ...state.filters,
      dateRange: { startDate, endDate },
    };
    dispatch({ type: "updateFilters", payload: newFilters });
  };

  const handleStartDateChange = (startDate) => {
    const newFilters = {
      ...state.filters,
      dateRange: {
        ...state.filters.dateRange,
        startDate: dayjs(startDate).format("DD-MM-YYYY"),
      },
    };
    dispatch({ type: "updateFilters", payload: newFilters });
  };

  const handleEndDateChange = (endDate) => {
    const newFilters = {
      ...state.filters,
      dateRange: {
        ...state.filters.dateRange,
        endDate: dayjs(endDate).format("DD-MM-YYYY"),
      },
    };
    dispatch({ type: "updateFilters", payload: newFilters });
  };

  const handleMinPriceChange = (e) => {
    const minPrice = e.target.value;
    const newFilters = {
      ...state.filters,
      priceRange: { ...state.filters.priceRange, minPrice },
    };
    dispatch({ type: "updateFilters", payload: newFilters });
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = e.target.value;
    const newFilters = {
      ...state.filters,
      priceRange: { ...state.filters.priceRange, maxPrice },
    };
    dispatch({ type: "updateFilters", payload: newFilters });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Filters</h2>
      <div className={styles.formRow}>
        <CategoryFilter
          selectedCategories={state.filters.categories || []}
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
