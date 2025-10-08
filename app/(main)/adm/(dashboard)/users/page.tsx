"use client";

import { useState } from "react";
import { Modal, Form, Input, Select, Button, Row, Col, message } from "antd";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Type definitions
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

interface Role {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

interface FormData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: number) => void;
}

interface DepartmentsTableProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      department: "Engineering",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      department: "Marketing",
      status: "Active",
    },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
    { id: 3, name: "Manager" },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Engineering" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Sales" },
  ]);

  const openModal = (item: User | Role | Department | null = null) => {
    if (item) {
      setEditingId(item.id);
      if (activeTab === "users" && 'email' in item) {
        form.setFieldsValue({
          name: item.name,
          email: item.email,
          role: item.role,
          department: item.department,
          status: item.status,
        });
      } else {
        form.setFieldsValue({
          name: item.name,
        });
      }
    } else {
      setEditingId(null);
      form.resetFields();
      if (activeTab === "users") {
        form.setFieldsValue({
          status: "Active",
        });
      }
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (activeTab === "users") {
        if (editingId) {
          setUsers(
            users.map((user) =>
              user.id === editingId ? { ...user, ...values } : user
            )
          );
          message.success('User updated successfully');
        } else {
          setUsers([...users, { id: Date.now(), ...values }]);
          message.success('User created successfully');
        }
      } else if (activeTab === "roles") {
        if (editingId) {
          setRoles(
            roles.map((role) =>
              role.id === editingId ? { ...role, name: values.name } : role
            )
          );
          message.success('Role updated successfully');
        } else {
          setRoles([...roles, { id: Date.now(), name: values.name }]);
          message.success('Role created successfully');
        }
      } else if (activeTab === "departments") {
        if (editingId) {
          setDepartments(
            departments.map((dept) =>
              dept.id === editingId ? { ...dept, name: values.name } : dept
            )
          );
          message.success('Department updated successfully');
        } else {
          setDepartments([
            ...departments,
            { id: Date.now(), name: values.name },
          ]);
          message.success('Department created successfully');
        }
      }

      closeModal();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = (id: number) => {
    if (activeTab === "users") {
      setUsers(users.filter((user) => user.id !== id));
    } else if (activeTab === "roles") {
      setRoles(roles.filter((role) => role.id !== id));
    } else if (activeTab === "departments") {
      setDepartments(departments.filter((dept) => dept.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {activeTab === "users"
                ? "Users"
                : activeTab === "roles"
                  ? "Roles"
                  : "Departments"}
            </h1>
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
              {["users", "roles", "departments"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium ${activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-white"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add{" "}
            {activeTab === "users"
              ? "User"
              : activeTab === "roles"
                ? "Role"
                : "Department"}
          </button>
        </div>

        {activeTab === "users" && (
          <UsersTable
            users={users}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        )}
        {activeTab === "roles" && (
          <RolesTable
            roles={roles}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        )}
        {activeTab === "departments" && (
          <DepartmentsTable
            departments={departments}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        )}

        <Modal
          title={`${editingId ? "Edit" : "Add"} ${activeTab === "users"
            ? "User"
            : activeTab === "roles"
              ? "Role"
              : "Department"
            }`}
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={activeTab === "users" ? 600 : 400}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            {activeTab === "users" && (
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
            )}

            {(activeTab === "roles" || activeTab === "departments") && (
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="name"
                    label={activeTab === "roles" ? "Role Name" : "Department Name"}
                    rules={[{ required: true, message: `Please enter ${activeTab === "roles" ? "role" : "department"} name` }]}
                  >
                    <Input placeholder={`Enter ${activeTab === "roles" ? "role" : "department"} name`} />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Button type="primary" htmlType="submit" block>
                  {editingId ? "Update" : "Save"}
                </Button>
              </Col>
              <Col span={12}>
                <Button onClick={closeModal} block>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          All Users ({users.length})
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {user.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RolesTable({ roles, onEdit, onDelete }: RolesTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          All Roles ({roles.length})
        </h3>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Role Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {role.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(role)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(role.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DepartmentsTable({ departments, onEdit, onDelete }: DepartmentsTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          All Departments ({departments.length})
        </h3>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Department Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {dept.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(dept)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(dept.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}