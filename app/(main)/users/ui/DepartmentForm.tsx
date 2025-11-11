"use client";

import { Form, Input, Row, Col, FormInstance, Select } from "antd";

interface DepartmentFormProps {
  form: FormInstance;
  departments?: Array<{ id: number; name: string }>;
}

export default function DepartmentForm({ form, departments = [] }: DepartmentFormProps) {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="name"
          label="Department Name"
          rules={[{ required: true, message: 'Please enter department name' }]}
        >
          <Input placeholder="Enter department name" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter department description' }]}
        >
          <Input.TextArea 
            placeholder="Enter department description" 
            rows={3}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="code"
          label="Department Code"
        >
          <Input placeholder="Enter department code (optional)" />
        </Form.Item>
      </Col>
      {/* <Col span={12}>
        <Form.Item
          name="parentDepartmentId"
          label="Parent Department"
        >
          <Select placeholder="Select parent department (optional)" allowClear>
            {departments.map((dept) => (
              <Select.Option key={dept.id} value={dept.id.toString()}>
                {dept.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col> */}
    </Row>
  );
}
