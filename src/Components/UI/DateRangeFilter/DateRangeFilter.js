import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Box, Typography } from "@mui/material";
import "./DateRangeFilter.css";

const DateRangeFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <Box className="date-range-filter">
      <Typography style={{ color: "#a3a3ff" }}>Date</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={!startDate && "Start Date"}
          value={startDate}
          onChange={onStartDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#1e1e3a", color: "#ffffff" },
              }}
              InputLabelProps={{ style: { color: "#a3a3ff" } }}
            />
          )}
        />
        <DatePicker
          label={!endDate && "End Date"}
          value={endDate}
          onChange={onEndDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "#1e1e3a", color: "#ffffff" },
              }}
              InputLabelProps={{ style: { color: "#a3a3ff" } }}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangeFilter;
