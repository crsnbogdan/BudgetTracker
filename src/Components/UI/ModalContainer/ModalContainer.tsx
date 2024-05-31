import { ReactNode } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ModalContainer.module.css";

type ModalContainerProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const ModalContainer = ({ children, isOpen, onClose }: ModalContainerProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      sx={{ backgroundColor: "transparent" }}
    >
      <DialogContent className={styles.modalContent}>
        <IconButton
          className={styles.closeButton}
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
