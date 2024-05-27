import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./Input.css";

const Input = ({ label, value, onChange, type }) => {
  if (type === "date") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="input-date"
          label={label}
          views={["month", "day", "year"]}
          inputFormat="MM/DD/YYYY"
          value={value ? dayjs(value) : null}
          onChange={(newValue) =>
            onChange(newValue ? newValue.format("YYYY-MM-DD") : null)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              InputProps={{
                ...params.InputProps,
              }}
              InputLabelProps={{
                ...params.InputLabelProps,
              }}
            />
          )}
        />
      </LocalizationProvider>
    );
  } else {
    return (
      <TextField
        className="input-text"
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
      />
    );
  }
};

export default Input;
