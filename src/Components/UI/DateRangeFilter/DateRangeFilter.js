import React from "react";
import { Box } from "@mui/material";
import Input from "../Input/Input";
import styles from "./DateRangeFilter.module.css";

const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <Box className={styles["date-range-filter"]}>
      <Input
        type="date"
        label="Start Date"
        value={startDate}
        onChange={onStartDateChange}
      />
      <Input
        type="date"
        label="End Date"
        value={endDate}
        onChange={onEndDateChange}
      />
    </Box>
  );
};

export default DateRangeFilter;
