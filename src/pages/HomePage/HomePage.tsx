import GrowthChart from "../../components/GrowthChart/GrowthChart";
import styles from "./index.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <GrowthChart />
    </div>
  );
};

export default HomePage;
