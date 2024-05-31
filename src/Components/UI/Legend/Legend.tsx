import { Category } from "../../../Types";
import styles from "./Legend.module.css";

type LegendProps = {
  data: Category[];
};

const Legend = ({ data }: LegendProps) => {
  return (
    <div className={styles.legend}>
      {data.map((entry: Category) => (
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
