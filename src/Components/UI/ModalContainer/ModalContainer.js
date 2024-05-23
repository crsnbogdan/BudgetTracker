import React from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ModalContainer.module.css";

const ModalContainer = ({ children, isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      sx={{ backgroundColor: "transparent" }}
    >
      <DialogContent className={styles["modal-content"]}>
        <IconButton
          className={styles["close-button"]}
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalContainer;
