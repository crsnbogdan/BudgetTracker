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
} from "@mui/material";
import styles from "./CategoryDropdown.module.css";

const CategoryDropdown = ({
  label = "Category",
  categories,
  category,
  onChange,
  multiple,
}) => {
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
            ? selected.map((catId) => categories[catId]?.name).join(", ")
            : categories[selected]?.name || "Select a category"
        }
        className={styles.outlinedInputRoot}
        style={{
          borderColor: categories[category]?.color || "#444",
        }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: "#1e1e3a",
              color: "#ffffff",
            },
          },
        }}
      >
        {Object.keys(categories).map((catId) => (
          <MenuItem key={catId} value={catId}>
            {multiple ? (
              <>
                <Checkbox
                  checked={category.includes(catId)}
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
