import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "./Input.css";
type InputProps = {
  label: string;
  value: string | Dayjs | null;
  onChange: (value: string | Dayjs | null) => void;
  type: "text" | "date" | "number";
};

const Input = ({ label, value, onChange, type }: InputProps) => {
  if (type === "date") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          views={["year", "month", "day"]}
          value={value ? dayjs(value, "DD-MM-YYYY") : null}
          onChange={(newValue) => {
            onChange(newValue);
          }}
        />
      </LocalizationProvider>
    );
  } else {
    return (
      <TextField
        label={label}
        type={type}
        value={value || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        variant="outlined"
        fullWidth
      />
    );
  }
};

export default Input;
