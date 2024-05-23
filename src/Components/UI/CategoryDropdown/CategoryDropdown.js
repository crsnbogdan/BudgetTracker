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
import "./CategoryDropdown.css";

const CategoryDropdown = ({ categories, category, onChange, multiple }) => {
  return (
    <FormControl fullWidth variant="outlined" className="category-dropdown">
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
        style={{
          backgroundColor: "#1e1e3a",
          color: "#ffffff",
          borderColor: "#444",
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
