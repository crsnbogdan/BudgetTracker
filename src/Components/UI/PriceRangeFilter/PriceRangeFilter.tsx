import { ChangeEvent } from "react";
import Input from "../Input/Input.tsx";
import "./PriceRangeFilter.module.css";
import { Dayjs } from "dayjs";
type PriceRangeFilterProps = {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (e: string | ChangeEvent | Dayjs | null) => void;
  onMaxPriceChange: (e: string | ChangeEvent | Dayjs | null) => void;
};

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceRangeFilterProps) => {
  return (
    <div className="priceRangeFilter">
      <Input
        type="number"
        label="Min Price"
        value={minPrice}
        onChange={onMinPriceChange}
      />
      <Input
        type="number"
        label="Max Price"
        value={maxPrice}
        onChange={onMaxPriceChange}
      />
    </div>
  );
};

export default PriceRangeFilter;
