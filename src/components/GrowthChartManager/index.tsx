import { Button, Segmented } from "antd";
import styles from "./index.module.scss";
import EmptyGrowthChartData from "./EmptyGrowthChartData/EmptyGrowthChartData";
import { useGrowthChartData } from "../../contexts/GrowthChartContext";
import GrowthChart from "../GrowthChart/GrowthChart";
import { useState } from "react";
import GrowthChartDataTable from "./GrowthChartdataTable/GrowthChartdataTable";
import { Assets } from "../../assets/assets";
import GrowthChartDataInputModal from "./GrowthChartDataInputModal/GrowthChartDataInputModal";
export const GrowthChartManager = () => {
  const tabs = ["Chart", "Data Table"];

  const { data } = useGrowthChartData();
  const [activeTab, setActiveTab] = useState<string>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const onClose = () => {
    setIsModalVisible(false);
  };

  const handleAddData = () => {
    setIsModalVisible(true);
  };

  function handleChangeTab(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div className={styles.container}>
      <h2>Growth Chart - GIRL</h2>
      <div className={styles.segmentWrap}>
        <Button
          onClick={handleAddData}
          type="link"
          className={styles.addDataButton}
          icon={<Assets.AddDataIcon />}
        >
          Add Data
        </Button>
        <Segmented
          className={styles.segment}
          onChange={handleChangeTab}
          options={tabs}
        />
      </div>

      <div className={styles.chartContainer}>
        {activeTab === "Data Table" ? (
          <GrowthChartDataTable />
        ) : data?.length ? (
          <GrowthChart />
        ) : (
          <EmptyGrowthChartData />
        )}
      </div>
      <GrowthChartDataInputModal visible={isModalVisible} onClose={onClose} />
    </div>
  );
};
