import React from "react";
import { Popover, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
        sx={{ position: "relative", padding: 2, backgroundColor: "#2c2c54" }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseIcon
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            cursor: "pointer",
          }}
        />
        {children}
      </Box>
    </Popover>
  );
};

export default PersistentPopover;
