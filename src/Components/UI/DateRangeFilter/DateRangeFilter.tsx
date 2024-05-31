import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import Input from "../Input/Input.tsx";
import styles from "./DateRangeFilter.module.css";
import { Dayjs } from "dayjs";

type DateRangeFilterProps = {
  startDate: string;
  endDate: string;
  selectedRange:
    | "custom"
    | "today"
    | "yesterday"
    | "last7"
    | "thisMonth"
    | "lastMonth"
    | "thisYear"
    | "lastYear";
  onRangeChange: (e: SelectChangeEvent) => void;
  onStartDateChange: (value: string | Dayjs | null) => void;
  onEndDateChange: (value: string | Dayjs | null) => void;
  predefinedRanges: {
    label: string;
    value: string;
  }[];
};

const DateRangeFilter = ({
  startDate,
  endDate,
  selectedRange,
  onRangeChange,
  onStartDateChange,
  onEndDateChange,
  predefinedRanges,
}: DateRangeFilterProps) => {
  return (
    <div className={styles.dateRangeFilter}>
      <FormControl fullWidth variant="outlined" className={styles.formControl}>
        <InputLabel className={styles.inputLabel}>Date Range</InputLabel>
        <Select
          value={selectedRange}
          onChange={onRangeChange}
          label="Date Range"
          className={styles.outlinedInputRoot}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: "var(--background-color-app)",
                color: "var(--color-text)",
              },
            },
          }}
        >
          {predefinedRanges.map((range) => (
            <MenuItem key={range.value} value={range.value}>
              {range.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedRange === "custom" && (
        <>
          <Input
            type="date"
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
          />
          <Input
            type="date"
            label="End Date"
            value={endDate}
            onChange={onEndDateChange}
          />
        </>
      )}
    </div>
  );
};

export default DateRangeFilter;
