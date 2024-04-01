import React from "react";
import { Modal, Input, Button, Form, DatePicker } from "antd";
import styles from "./index.module.scss";
import { useGrowthChartData } from "../../../contexts/GrowthChartContext";

interface GrowthChartDataInputModalProps {
  visible: boolean;
  onClose: () => void;
}

const GrowthChartDataInputModal: React.FC<GrowthChartDataInputModalProps> = ({
  visible,
  onClose,
}) => {
  // Form instance
  const [form] = Form.useForm();
  const { addData } = useGrowthChartData();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Perform save logic here with values
        console.log(values);
        addData(values);

        // Reset form fields after submission
        form.resetFields();

        // Close the modal
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Reset form when modal is closed to ensure fields are cleared
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={visible}
      title="Add Growth Chart Data"
      onCancel={handleCancel}
      closeIcon={null}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
      className={styles.container}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please input the date!" }]}
        >
          <DatePicker format={"DD-MMM-YYYY"} placeholder="Select date" />
        </Form.Item>
        <Form.Item
          name="weight"
          label="Weight (in kg)"
          rules={[{ required: true, message: "Please input the weight!" }]}
        >
          <Input type="number" min={0} placeholder="Type here" />
        </Form.Item>
        <Form.Item
          name="length"
          label="Length (in cm)"
          rules={[{ required: true, message: "Please input the length!" }]}
        >
          <Input min={0} type="number" placeholder="Type here" />
        </Form.Item>
        <Form.Item
          name="headCircumference"
          label="Head Head Circum. (in cm)"
          rules={[
            { required: true, message: "Please input the head circumference!" },
          ]}
        >
          <Input min={0} type="number" placeholder="Type here" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GrowthChartDataInputModal;
