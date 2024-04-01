/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Table } from "antd";
import styles from "./index.module.scss";
import { useGrowthChartData } from "../../../contexts/GrowthChartContext";
import { GrowthChartDataInterface } from "../../../interfaces/GrowthChartData";
import { Assets } from "../../../assets/assets";
import { useState } from "react";

const GrowthChartDataTable = () => {
  const [editEnabledRows, setEditEnabledRows] = useState<string[]>([]);
  const { data: chartData, updateData } = useGrowthChartData();
  console.log("🚀 ~ GrowthChartDataTable ~ data:", chartData);
  const [changeData, setChangeData] = useState<
    { id: string; value: string; key: string }[]
  >([]);

  //Helper functions start.................................................................................

  function handleEditRow(id: string) {
    const isAlreadyEnabled = editEnabledRows.includes(id);
    if (isAlreadyEnabled) {
      setEditEnabledRows((prev) => prev.filter((rowId) => rowId !== id));

      //Update data..........................................
      if (changeData?.length) {
        changeData.map((each: { id: string; value: string; key: string }) => {
          if (each.id === id) {
            updateData(id, { [each.key]: each.value });
          }
        });
      }
    } else {
      setEditEnabledRows((prev) => [...prev, id]);
    }
  }

  function handleDataChange(id: string, value: string, key: string) {
    const isAlreadyChanged = changeData.some((data) => data.id === id);
    if (isAlreadyChanged) {
      setChangeData((prev) =>
        prev.map((data) => {
          if (data.id === id) {
            return { id, value, key };
          }
          return data;
        })
      );
    } else {
      setChangeData((prev) => [...prev, { id, value, key }]);
    }
  }

  //Helper functions end.................................................................................

  //Table config.................................................................................
  const dataSource: any = chartData.map((data) => ({
    id: data?.id,
    date: data?.date?.toString() || "No date",
    weight: data?.weight,
    length: data?.length,
    headCircumference: data?.headCircumference,
  }));

  const columns = [
    {
      title: "",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Weight (in kg)",
      dataIndex: "weight",
      key: "weight",
      render: (_: number, data: GrowthChartDataInterface) => {
        return (
          <InputController
            onChange={(value: string) =>
              handleDataChange(data?.id, value, "weight")
            }
            editEnabledRows={editEnabledRows}
            id={data?.id}
            data={data?.weight}
          />
        );
      },
    },
    {
      title: "Length (in cm)",
      dataIndex: "length",
      key: "length",
      render: (_: number, data: GrowthChartDataInterface) => {
        return (
          <InputController
            onChange={(value: string) =>
              handleDataChange(data?.id, value, "length")
            }
            id={data?.id}
            editEnabledRows={editEnabledRows}
            data={data?.length}
          />
        );
      },
    },
    {
      title: "Head Circum. (in cm)",
      dataIndex: "headCircumference",
      key: "headCircumference",
      render: (_: number, data: GrowthChartDataInterface) => {
        return (
          <InputController
            onChange={(value: string) =>
              handleDataChange(data?.id, value, "headCircumference")
            }
            id={data?.id}
            editEnabledRows={editEnabledRows}
            data={data?.headCircumference}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      render: (_: number, data: GrowthChartDataInterface) => {
        const isEditEnabled = editEnabledRows.includes(data?.id);
        return (
          <Button
            className={styles.editButton}
            onClick={() => {
              handleEditRow(data?.id);
            }}
            type="link"
            icon={
              isEditEnabled ? <Assets.CompleteIcon /> : <Assets.PencilIcon />
            }
          />
        );
      },
    },
  ];

  //Table config.................................................................................

  return (
    <div className={styles.container}>
      <Table
        scroll={{ y: `calc(100vh - 250px)` }}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default GrowthChartDataTable;

const InputController = ({
  data,
  editEnabledRows,
  id,
  onChange,
}: {
  data: any;
  editEnabledRows: string[];
  id: string;
  onChange: (value: string) => void;
}) => {
  const isEditEnabled = editEnabledRows.includes(id);
  return (
    <Input
      onChange={(e) => onChange(e.target.value)}
      type={isEditEnabled ? "number" : "text"}
      key={data?.id}
      disabled={isEditEnabled ? false : true}
      className={styles.inputController}
      suffix={<Assets.GrowthDecreaseIcon />}
      defaultValue={data}
    />
  );
};
