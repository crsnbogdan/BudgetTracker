import React, { useContext, useState, ChangeEvent } from "react";
import CategoryFilter from "../../UI/CategoryFilter/CategoryFilter";
import DateRangeFilter from "../../UI/DateRangeFilter/DateRangeFilter";
import PriceRangeFilter from "../../UI/PriceRangeFilter/PriceRangeFilter";
import { AppContext } from "../../../Context/ContextProvider";
import dayjs, { Dayjs } from "dayjs";
import styles from "./Filters.module.css";
import { SelectChangeEvent } from "@mui/material";
import { SelectedRange, UpdateFiltersPayload } from "../../../Types";

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
  const [selectedRange, setSelectedRange] = useState<SelectedRange>("custom");

  const handleCategoryChange = (
    event: SelectChangeEvent<string | string[]>
  ) => {
    const categories = event.target.value as string[];
    const newFilters = { ...state.filters, categories };
    dispatch({
      type: "updateFilters",
      payload: newFilters as UpdateFiltersPayload,
    });
  };

  const handleRangeChange = (event: SelectChangeEvent<string>) => {
    const value: SelectedRange = event.target.value;
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

  const handleStartDateChange = (
    value: string | Dayjs | ChangeEvent | null
  ) => {
    let formattedValue: string | null = null;

    if (value) {
      if (dayjs.isDayjs(value)) {
        formattedValue = value.format("DD-MM-YYYY");
      } else if (typeof value === "string") {
        formattedValue = dayjs(value, "YYYY-MM-DD").format("DD-MM-YYYY");
      } else {
        const inputValue = (value as ChangeEvent<HTMLInputElement>).target
          .value;
        formattedValue = dayjs(inputValue, "YYYY-MM-DD").format("DD-MM-YYYY");
      }
    }

    const newFilters = {
      ...state.filters,
      dateRange: {
        ...state.filters.dateRange,
        startDate: formattedValue,
      },
    };
    dispatch({ type: "updateFilters", payload: newFilters });
  };

  const handleEndDateChange = (value: string | Dayjs | ChangeEvent | null) => {
    let formattedValue: string | null = null;

    if (value) {
      if (dayjs.isDayjs(value)) {
        formattedValue = value.format("DD-MM-YYYY");
      } else if (typeof value === "string") {
        formattedValue = dayjs(value, "YYYY-MM-DD").format("DD-MM-YYYY");
      } else {
        const inputValue = (value as ChangeEvent<HTMLInputElement>).target
          .value;
        formattedValue = dayjs(inputValue, "YYYY-MM-DD").format("DD-MM-YYYY");
      }
    }

    const newFilters = {
      ...state.filters,
      dateRange: {
        ...state.filters.dateRange,
        endDate: formattedValue,
      },
    };
    dispatch({
      type: "updateFilters",
      payload: newFilters as UpdateFiltersPayload,
    });
  };

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const minPrice = event.target.value;
    const newFilters = {
      ...state.filters,
      priceRange: { ...state.filters.priceRange, minPrice },
    };
    dispatch({
      type: "updateFilters",
      payload: newFilters as UpdateFiltersPayload,
    });
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maxPrice = event.target.value;
    const newFilters = {
      ...state.filters,
      priceRange: { ...state.filters.priceRange, maxPrice },
    };
    dispatch({
      type: "updateFilters",
      payload: newFilters as UpdateFiltersPayload,
    });
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
          //@ts-ignore
          onMinPriceChange={handleMinPriceChange}
          //@ts-ignore
          onMaxPriceChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

export default Filters;
