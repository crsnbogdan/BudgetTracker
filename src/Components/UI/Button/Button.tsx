import { ReactNode } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import styles from "./Button.module.css";

type ButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  variant?: MuiButtonProps["variant"];
  color?: MuiButtonProps["color"];
  className?: string;
  isDelete?: boolean;
  icon?: ReactNode;
};

const Button = ({
  children,
  onClick,
  variant = "contained",
  color = "primary",
  className,
  isDelete = false,
  icon,
}: ButtonProps) => {
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
