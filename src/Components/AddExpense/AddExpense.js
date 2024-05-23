import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";
import CategoryDropdown from "../UI/CategoryDropdown/CategoryDropdown";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Button } from "@mui/material";
import dayjs from "dayjs";
import "./AddExpense.css";

const AddExpense = () => {
  const { dispatch, showExpenseModal, categories } = useContext(AppContext);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleDateChange = (newDate) => setDate(newDate);

  const handleAdd = () => {
    const expenseDate = date || dayjs();
    if (!name || !category || !price) return;
    dispatch({
      type: "addExpense",
      payload: {
        name,
        price: Number(price),
        category,
        date: expenseDate,
      },
    });
    showExpenseModal(false);
  };

  return (
    <div className="add-expense-form">
      <div className="form-row">
        <CategoryDropdown
          category={category}
          onChange={handleCategoryChange}
          categories={categories}
        />
      </div>
      <div className="form-row">
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          variant="outlined"
          fullWidth
          InputProps={{
            style: { backgroundColor: "#1e1e3a", color: "#ffffff" },
          }}
          InputLabelProps={{ style: { color: "#a3a3ff" } }}
        />
      </div>
      <div className="form-row">
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          variant="outlined"
          fullWidth
          InputProps={{
            style: { backgroundColor: "#1e1e3a", color: "#ffffff" },
          }}
          InputLabelProps={{ style: { color: "#a3a3ff" } }}
        />
      </div>
      <div className="form-row">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={handleDateChange}
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
      </div>
      <div className="form-control">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          style={{ backgroundColor: "#5a67d8", marginRight: "10px" }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
