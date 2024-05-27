import React from "react";
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Input from "../Input/Input";
import styles from "./DateRangeFilter.module.css";

const DateRangeFilter = ({
  startDate,
  endDate,
  selectedRange,
  onRangeChange,
  onStartDateChange,
  onEndDateChange,
  predefinedRanges,
}) => {
  return (
    <Box className={styles["date-range-filter"]}>
      <FormControl
        fullWidth
        variant="outlined"
        className={styles["formControl"]}
      >
        <InputLabel className={styles["inputLabel"]}>Date Range</InputLabel>
        <Select
          value={selectedRange}
          onChange={(e) => onRangeChange(e.target.value)}
          label="Date Range"
          className={styles["outlinedInputRoot"]}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: "#1e1e3a",
                color: "#ffffff",
              },
            },
          }}
        >
          {predefinedRanges.map((range) => (
            <MenuItem key={range.value} value={range.value}>
              {range.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedRange === "custom" && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default DateRangeFilter;
