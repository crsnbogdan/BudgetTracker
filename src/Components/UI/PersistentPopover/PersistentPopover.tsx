import { ReactNode, MouseEvent } from "react";
import { Popover } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./PersistentPopover.module.css";

type PersistentPopoverProps = {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  children: ReactNode;
};

const PersistentPopover = ({
  anchorEl,
  isOpen,
  onClose,
  children,
}: PersistentPopoverProps) => {
  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    onClose(event, reason);
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
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
        <CloseIcon
          onClick={(e) => handleClose({}, "backdropClick")}
          className={styles.closeButton}
        />
        {children}
      </div>
    </Popover>
  );
};

export default PersistentPopover;
