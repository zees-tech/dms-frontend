"use client";

import { Form, Input, Select, Row, Col, FormInstance } from "antd";

interface RoleFormProps {
  form: FormInstance;
  editingId?: number | null;
}

export default function RoleForm({ form, editingId }: RoleFormProps) {
  return (
    <>
      {!editingId && (
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select type' }]}
          initialValue="role"
        >
          <Select>
            <Select.Option value="role">Role</Select.Option>
            <Select.Option value="user-group">User Group</Select.Option>
          </Select>
        </Form.Item>
      )}
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
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="permissions"
        label="Permissions"
        rules={[{ required: true, message: 'Please select permissions' }]}
      >
        <Select mode="multiple" placeholder="Select permissions">
          <Select.Option value="read">Read</Select.Option>
          <Select.Option value="write">Write</Select.Option>
          <Select.Option value="delete">Delete</Select.Option>
          <Select.Option value="manage_users">Manage Users</Select.Option>
          <Select.Option value="manage_roles">Manage Roles</Select.Option>
          <Select.Option value="manage_files">Manage Files</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
