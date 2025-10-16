"use client";

import { Form, Input, Row, Col, FormInstance } from "antd";

interface DepartmentFormProps {
  form: FormInstance;
}

export default function DepartmentForm({ form }: DepartmentFormProps) {
  return (
    <Row>
      <Col span={24}>
        <Form.Item
          name="name"
          label="Department Name"
          rules={[{ required: true, message: 'Please enter department name' }]}
        >
          <Input placeholder="Enter department name" />
        </Form.Item>
      </Col>
    </Row>
  );
}
