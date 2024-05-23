import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./Input.css";

const Input = ({ label, value, onChange, type }) => {
  if (type === "date") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          inputFormat="MM/DD/YYYY"
          value={value}
          sx={{ margin: "7px 0px" }}
          onChange={onChange}
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
