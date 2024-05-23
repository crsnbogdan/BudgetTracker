import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import "./PriceRangeFilter.css";

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <Box className="price-range-filter">
      <Typography style={{ color: "#a3a3ff" }}>Price</Typography>
      <TextField
        type="number"
        label={!minPrice && "Min"}
        value={minPrice}
        onChange={onMinPriceChange}
        variant="outlined"
        fullWidth
        InputProps={{
          style: {
            color: minPrice > maxPrice && maxPrice ? "#d35d6e" : "white",
            backgroundColor: "#1e1e3a",
            height: "40px",
          },
        }}
        InputLabelProps={{
          style: {
            color: "#a3a3ff",
          },
        }}
      />
      <TextField
        type="number"
        sx={{ color: minPrice > maxPrice ? "red" : "white" }}
        label={!maxPrice && "Max"}
        value={maxPrice}
        onChange={onMaxPriceChange}
        variant="outlined"
        fullWidth
        InputProps={{
          style: {
            color: minPrice > maxPrice && minPrice ? "#d35d6e" : "white",
            backgroundColor: "#1e1e3a",
            height: "40px",
          },
        }}
        InputLabelProps={{
          style: {
            color: "#a3a3ff",
          },
        }}
      />
    </Box>
  );
};

export default PriceRangeFilter;
