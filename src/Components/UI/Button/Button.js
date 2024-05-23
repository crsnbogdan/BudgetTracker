import React from "react";
import { Button as MuiButton } from "@mui/material";
import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  variant = "contained",
  color = "primary",
  className,
  isDelete = false,
  icon,
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      className={`${styles.button} ${className} ${
        isDelete ? styles.deleteButton : ""
      }`}
      startIcon={icon && !isDelete ? icon : null}
    >
      {isDelete ? icon : children}
    </MuiButton>
  );
};

export default Button;
