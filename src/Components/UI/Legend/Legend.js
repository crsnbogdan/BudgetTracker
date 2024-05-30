import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./Legend.module.css";

const Legend = ({ data }) => {
  return (
    <Box className={styles.legend}>
      {data.map((entry) => (
        <Box key={entry.id} className={styles.legendItem}>
          <Box
            className={styles.legendColor}
            style={{ backgroundColor: entry.color }}
          />
          <Typography className={styles.legendLabel}>{entry.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Legend;
