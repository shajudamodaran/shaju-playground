import { GrowthChartManager } from "../../components/GrowthChartManager";
import { GrowthChartDataProvider } from "../../contexts/GrowthChartContext";
import styles from "./index.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <GrowthChartDataProvider>
        <GrowthChartManager />
      </GrowthChartDataProvider>
    </div>
  );
};

export default HomePage;
