import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  ListItemText,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./CategoryDropdown.module.css";
import { Categories } from "../../../Types";

type CategoryDropdownProps = {
  label?: string;
  categories: Categories;
  category: string | string[];
  onChange: (e: SelectChangeEvent<string | string[]>) => void;
  multiple: boolean;
};

const CategoryDropdown = ({
  label = "Category",
  categories,
  category,
  onChange,
  multiple,
}: CategoryDropdownProps) => {
  const isCategoryArray = Array.isArray(category);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      className={styles.categoryDropdown}
    >
      <InputLabel className={styles.formLabel}>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={category}
        onChange={onChange}
        label="Category"
        renderValue={(selected) =>
          multiple
            ? (selected as string[])
                .map((catId) => categories[catId]?.name)
                .join(", ")
            : categories[selected as string]?.name || "Select a category"
        }
        className={styles.outlinedInputRoot}
        style={{
          borderColor: isCategoryArray
            ? categories[category[0]]?.color || "#444"
            : categories[category as string]?.color || "#444",
        }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: "var(--background-color-app)",
              color: "var(--color-text)",
            },
          },
        }}
      >
        {Object.keys(categories).map((catId) => (
          <MenuItem key={catId} value={catId}>
            {multiple ? (
              <>
                <Checkbox
                  checked={isCategoryArray && category.includes(catId)}
                  style={{ color: categories[catId].color }}
                />
                <ListItemText primary={categories[catId].name} />
              </>
            ) : (
              <FormControlLabel
                control={
                  <Radio
                    checked={category === catId}
                    style={{ color: categories[catId].color }}
                  />
                }
                label={categories[catId].name}
              />
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
