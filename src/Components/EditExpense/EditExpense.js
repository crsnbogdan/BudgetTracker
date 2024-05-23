import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/ContextProvider";
import CategoryDropdown from "../UI/CategoryDropdown/CategoryDropdown";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Button, Box } from "@mui/material";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import "./EditExpense.css";

const FormContainer = styled(Box)({
  backgroundColor: "#2c2c54",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "300px",
  color: "#ffffff",
  padding: "20px",
});

const CustomButton = styled(Button)({
  backgroundColor: "#5a67d8",
  color: "#ffffff",
  border: "none",
  padding: "7px 17px",
  fontSize: "14px",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#434190",
  },
});

const FormRow = styled(Box)({
  display: "flex",
  flexDirection: "column",
  marginBottom: "14px",
});

const EditExpense = () => {
  const { dispatch, showEditExpenseModal, selectedExpense, categories } =
    useContext(AppContext);

  const [category, setCategory] = useState(selectedExpense?.category || "");
  const [price, setPrice] = useState(selectedExpense?.price?.toString() || "");
  const [name, setName] = useState(selectedExpense?.name || "");
  const [date, setDate] = useState(
    selectedExpense?.date ? dayjs(selectedExpense.date) : dayjs()
  );

  useEffect(() => {
    setCategory(selectedExpense?.category || "");
    setPrice(selectedExpense?.price?.toString() || "");
    setName(selectedExpense?.name || "");
    setDate(selectedExpense?.date ? dayjs(selectedExpense.date) : dayjs());
  }, [selectedExpense]);

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleDateChange = (newDate) => setDate(newDate);

  const handleSave = () => {
    const expenseDate = date || dayjs();
    if (!name || !category || !price) return;
    dispatch({
      type: "updateExpense",
      payload: {
        id: selectedExpense.id,
        name,
        price: Number(price),
        category,
        date: expenseDate.format("YYYY-MM-DD"),
      },
    });
    showEditExpenseModal(false);
  };

  return (
    <FormContainer>
      <FormRow>
        <CategoryDropdown
          category={category}
          onChange={handleCategoryChange}
          categories={categories}
        />
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date"
            inputFormat="MM/DD/YYYY"
            value={date}
            className="editexpense-date"
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                InputProps={{
                  style: { backgroundColor: "#1e1e3a", color: "#ffffff" },
                  endAdornment: (
                    <params.InputProps.endAdornment.type
                      {...params.InputProps.endAdornment.props}
                      style={{ color: "#ffffff" }}
                    />
                  ),
                }}
                InputLabelProps={{ style: { color: "#a3a3ff" } }}
              />
            )}
          />
        </LocalizationProvider>
      </FormRow>
      <Box display="flex" justifyContent="flex-end">
        <CustomButton onClick={handleSave}>Save</CustomButton>
      </Box>
    </FormContainer>
  );
};

export default EditExpense;
