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

  const renderValue = (selected: string | string[]) => {
    if (Array.isArray(selected)) {
      return selected.map((catId) => categories[catId]?.name).join(", ");
    } else {
      return categories[selected]?.name || "Select a category";
    }
  };

  const handleChange = (event: SelectChangeEvent<string[] | string>) => {
    onChange(event);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      className={styles.categoryDropdown}
    >
      <InputLabel className={styles.formLabel}>{label}</InputLabel>
      <Select
        multiple={multiple}
        value={
          multiple
            ? Array.isArray(category)
              ? category
              : []
            : (category as string)
        }
        onChange={handleChange}
        label="Category"
        renderValue={renderValue}
        className={styles.outlinedInputRoot}
        style={{
          borderColor: isCategoryArray
            ? categories[(category as string[])[0]]?.color || "#444"
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
                  checked={
                    isCategoryArray && (category as string[]).includes(catId)
                  }
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
