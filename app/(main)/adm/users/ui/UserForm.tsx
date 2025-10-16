"use client";

import { Form, Input, Select, Row, Col, FormInstance } from "antd";
import { AssigneeInfo as GraphQLAssigneeInfo } from "../../../../../apiComponent/graphql/generated/graphql";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

interface AssigneeInfo {
  id: string;
  name: string;
  type: "ROLE" | "GROUP";
  description?: string | null;
}

interface Department {
  id: number;
  name: string;
}

interface UserFormProps {
  form: FormInstance;
  roles: GraphQLAssigneeInfo[];
  departments: Department[];
}

export default function UserForm({ form, roles, departments }: UserFormProps) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter valid email' }
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select placeholder="Select Role">
              {roles.map((role) => (
                <Select.Option key={role.id} value={role.name}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select placeholder="Select Department">
              {departments.map((dept) => (
                <Select.Option key={dept.id} value={dept.name}>
                  {dept.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
