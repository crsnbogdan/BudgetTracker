import React from "react";
import Input from "../Input/Input";
import "./PriceRangeFilter.module.css";

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  return (
    <div className="priceRangeFilter">
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
    </div>
  );
};

export default PriceRangeFilter;
