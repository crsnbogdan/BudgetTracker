import React from "react";
import styles from "./Legend.module.css";

interface LegendData {
  id: number;
  value: number;
  label: string;
  color: string;
}

const Legend = ({ data }: { data: LegendData[] }) => {
  return (
    <div className={styles.legend}>
      {data.map((entry) => (
        <div key={entry.id} className={styles.legendItem}>
          <div
            className={styles.legendColor}
            style={{ backgroundColor: entry.color }}
          />
          <p className={styles.legendLabel}>{entry.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Legend;
