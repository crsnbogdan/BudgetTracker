import React from "react";
import { Box } from "@mui/material";
import Input from "../Input/Input";
import styles from "./PriceRangeFilter.module.css";

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <Box className={styles["price-range-filter"]}>
      <Input
        type="number"
        label="Min Price"
        value={minPrice}
        onChange={onMinPriceChange}
        inputProps={{
          style: {
            color: minPrice > maxPrice && maxPrice ? "#d35d6e" : "white",
          },
        }}
      />
      <Input
        type="number"
        label="Max Price"
        value={maxPrice}
        onChange={onMaxPriceChange}
        inputProps={{
          style: {
            color: minPrice > maxPrice && minPrice ? "#d35d6e" : "white",
          },
        }}
      />
    </Box>
  );
};

export default PriceRangeFilter;
