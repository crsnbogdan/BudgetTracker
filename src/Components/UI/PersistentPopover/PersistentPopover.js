import React from "react";
import { Popover, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./PersistentPopover.module.css";

const PersistentPopover = ({ anchorEl, isOpen, onClose, children }) => {
  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      disableRestoreFocus
    >
      <Box
        className={styles["popover-container"]}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon onClick={onClose} className={styles["close-button"]} />
        {children}
      </Box>
    </Popover>
  );
};

export default PersistentPopover;
