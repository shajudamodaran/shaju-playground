import Lottie from "lottie-react";
import { Assets } from "../../../assets/assets";
import styles from "./index.module.scss";
import GrowthChartDataInputModal from "../GrowthChartDataInputModal/GrowthChartDataInputModal";
import { useState } from "react";

const EmptyGrowthChartData = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onClose = () => {
    setIsModalVisible(false);
  };

  const handleAddData = () => {
    setIsModalVisible(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lottieWrap}>
        <Lottie
          className={styles.lottie}
          animationData={Assets.nodataLottie}
          loop={true}
        />
      </div>
      <div className={styles.dataWrap}>
        <h5>Chart data is empty.</h5>
        <p>
          We can’t display chart unless you add the required data. Please click
          the “Add Data” button to start adding your data.
        </p>
        <button onClick={handleAddData} className={styles.addButton}>
          <Assets.AddDataIcon /> Add Data
        </button>
      </div>

      <GrowthChartDataInputModal visible={isModalVisible} onClose={onClose} />
    </div>
  );
};

export default EmptyGrowthChartData;
