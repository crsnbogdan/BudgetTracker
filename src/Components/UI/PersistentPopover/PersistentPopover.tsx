import { ReactNode } from "react";
import { Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./PersistentPopover.module.css";

type PersistentPopoverProps = {
  anchorEl: Element;
  isOpen: boolean;
  onClose: () => void;

  children: ReactNode;
};

const PersistentPopover = ({
  anchorEl,
  isOpen,
  onClose,
  children,
}: PersistentPopoverProps) => {
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
      <div
        className={styles.popoverContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon onClick={onClose} className={styles.closeButton} />
        {children}
      </div>
    </Popover>
  );
};

export default PersistentPopover;
