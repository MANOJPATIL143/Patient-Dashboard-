import React, { useEffect } from "react";
import { Modal, Form, InputNumber, Button } from "antd";

const WeightModelForm = ({ visible, onClose, onSubmit, initialValues = {} }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        currentWeight: initialValues.weightHistory?.[0]?.weight || null,
        weightGoal: initialValues.weightGoal || null,
        bmi: initialValues.bmi || null,
        weightLosstillnow: initialValues.weightLosstillnow || null,
      });
    }
  }, [initialValues, visible, form]);

  const handleFinish = (values) => {
    const updatedUser = {
      weightHistory: [{ weight: values.currentWeight }],
      weightGoal: values.weightGoal,
      bmi: values.bmi,
      weightLosstillnow: values.weightLosstillnow,
    };
    onSubmit(updatedUser);
    form.resetFields();
  };

  return (
    <Modal
      title="Update Weight Details"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Current Weight (kg)"
          name="currentWeight"
          rules={[{ required: true, message: "Please enter current weight" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Weight Goal (kg)"
          name="weightGoal"
          rules={[{ required: true, message: "Please enter weight goal" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="BMI"
          name="bmi"
          rules={[{ required: true, message: "Please enter BMI" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} step={0.1} />
        </Form.Item>

        <Form.Item
          label="Weight Lost Till Now (kg)"
          name="weightLosstillnow"
          rules={[{ required: true, message: "Please enter weight lost" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WeightModelForm;
