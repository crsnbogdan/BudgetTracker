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
          className="inputDate"
          label={label}
          views={["year", "month", "day"]}
          format="DD-MM-YYYY"
          value={value ? dayjs(value, "DD-MM-YYYY") : null}
          onChange={(newValue) =>
            onChange(newValue ? newValue.format("DD-MM-YYYY") : null)
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
              className="inputText"
            />
          )}
        />
      </LocalizationProvider>
    );
  } else {
    return (
      <TextField
        className="inputText"
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
