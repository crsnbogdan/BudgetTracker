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

const CategoryDropdown = ({ categories, category, onChange, multiple }) => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      className={styles.categoryDropdown}
    >
      <InputLabel className={styles.formLabel}>Category</InputLabel>
      <Select
        multiple={multiple}
        value={category}
        onChange={onChange}
        label="Category"
        renderValue={(selected) =>
          multiple
            ? selected.join(", ")
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
        {Object.keys(categories).map((cat) => (
          <MenuItem key={cat} value={cat}>
            {multiple ? (
              <>
                <Checkbox
                  checked={category.includes(cat)}
                  style={{ color: categories[cat].color }}
                />
                <ListItemText primary={cat} />
              </>
            ) : (
              <FormControlLabel
                control={
                  <Radio
                    checked={category === cat}
                    style={{ color: categories[cat].color }}
                  />
                }
                label={cat}
              />
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
