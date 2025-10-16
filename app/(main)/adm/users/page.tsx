"use client";

import { useState } from "react";
import { Modal, Form, Input, Select, Button, Row, Col, message, Collapse, Tag } from "antd";
import { Edit, Trash2 } from "lucide-react";
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
  permissions: string[];
  description: string;
}

interface UserGroup {
  id: number;
  name: string;
  members: number[];
  permissions: string[];
  description: string;
}

interface Department {
  id: number;
  name: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

interface DepartmentsTableProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (id: number) => void;
}

interface AccessControlTabProps {
  roles: Role[];
  userGroups: UserGroup[];
  users: User[];
  onEditRole: (role: Role) => void;
  onDeleteRole: (id: number) => void;
  onEditUserGroup: (userGroup: UserGroup) => void;
  onDeleteUserGroup: (id: number) => void;
  onAddRole: () => void;
  onAddUserGroup: () => void;
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
    {
      id: 1,
      name: "Admin",
      permissions: ["read", "write", "delete", "manage_users"],
      description: "Full system access"
    },
    {
      id: 2,
      name: "User",
      permissions: ["read", "write"],
      description: "Standard user access"
    },
    {
      id: 3,
      name: "Viewer",
      permissions: ["read"],
      description: "Read-only access"
    }
  ]);

  const [userGroups, setUserGroups] = useState<UserGroup[]>([
    {
      id: 1,
      name: "Engineering Team",
      members: [1],
      permissions: ["read", "write", "delete"],
      description: "Engineering department team"
    },
    {
      id: 2,
      name: "Marketing Team",
      members: [2],
      permissions: ["read", "write"],
      description: "Marketing department team"
    }
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Engineering" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Sales" },
  ]);

  const openModal = (item: User | Department | Role | UserGroup | null = null) => {
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
      } else if (activeTab === "access-control" && 'permissions' in item) {
        if ('members' in item) {
          // User Group
          form.setFieldsValue({
            name: item.name,
            description: item.description,
            permissions: item.permissions,
            members: item.members,
          });
        } else {
          // Role
          form.setFieldsValue({
            name: item.name,
            description: item.description,
            permissions: item.permissions,
          });
        }
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
      } else if (activeTab === "access-control") {
        form.setFieldsValue({
          permissions: ["read"],
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
      } else if (activeTab === "access-control") {
        if (values.type === "role") {
          if (editingId) {
            setRoles(
              roles.map((role) =>
                role.id === editingId ? { ...role, ...values } : role
              )
            );
            message.success('Role updated successfully');
          } else {
            setRoles([...roles, { id: Date.now(), ...values }]);
            message.success('Role created successfully');
          }
        } else {
          if (editingId) {
            setUserGroups(
              userGroups.map((group) =>
                group.id === editingId ? { ...group, ...values } : group
              )
            );
            message.success('User Group updated successfully');
          } else {
            setUserGroups([...userGroups, { id: Date.now(), ...values }]);
            message.success('User Group created successfully');
          }
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
    } else if (activeTab === "departments") {
      setDepartments(departments.filter((dept) => dept.id !== id));
    }
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
    message.success('Role deleted successfully');
  };

  const handleDeleteUserGroup = (id: number) => {
    setUserGroups(userGroups.filter((group) => group.id !== id));
    message.success('User Group deleted successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {activeTab === "users"
                ? "Users"
                : activeTab === "access-control"
                  ? "Access Control"
                  : "Departments"}
            </h1>
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
              {["users", "access-control", "departments"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium ${activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-white"
                    }`}
                >
                  {tab === "access-control" ? "Access Control" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {activeTab !== "access-control" && (
            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add{" "}
              {activeTab === "users"
                ? "User"
                : "Department"}
            </button>
          )}
        </div>

        {activeTab === "users" && (
          <UsersTable
            users={users}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        )}
        {activeTab === "access-control" && (
          <AccessControlTab
            roles={roles}
            userGroups={userGroups}
            users={users}
            onEditRole={openModal}
            onDeleteRole={handleDeleteRole}
            onEditUserGroup={openModal}
            onDeleteUserGroup={handleDeleteUserGroup}
            onAddRole={() => {
              form.setFieldsValue({ type: "role" });
              openModal();
            }}
            onAddUserGroup={() => {
              form.setFieldsValue({ type: "user-group" });
              openModal();
            }}
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
            : activeTab === "access-control"
              ? form.getFieldValue("type") === "role" ? "Role" : "User Group"
              : "Department"
            }`}
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={activeTab === "users" ? 600 : activeTab === "access-control" ? 700 : 400}
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

            {activeTab === "access-control" && (
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
                {form.getFieldValue("type") === "user-group" && (
                  <Form.Item
                    name="members"
                    label="Members"
                  >
                    <Select mode="multiple" placeholder="Select members">
                      {users.map((user) => (
                        <Select.Option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              </>
            )}

            {activeTab === "departments" && (
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
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      title="Edit user"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AccessControlTab({ roles, userGroups, users, onEditRole, onDeleteRole, onEditUserGroup, onDeleteUserGroup, onAddRole, onAddUserGroup }: AccessControlTabProps) {
  const roleItems = roles.map((role) => ({
    key: role.id.toString(),
    label: (
      <div className="flex justify-between items-center w-full">
        <span className="font-medium">{role.name}</span>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditRole(role);
            }}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
            title="Edit role"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteRole(role.id);
            }}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            title="Delete role"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    ),
    children: (
      <div className="space-y-3">
        <div>
          <span className="font-medium">Description:</span> {role.description}
        </div>
        <div>
          <span className="font-medium">Permissions:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {role.permissions.map((permission) => (
              <Tag key={permission} color="blue">
                {permission}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  const userGroupItems = userGroups.map((group) => ({
    key: group.id.toString(),
    label: (
      <div className="flex justify-between items-center w-full">
        <span className="font-medium">{group.name}</span>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditUserGroup(group);
            }}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
            title="Edit user group"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteUserGroup(group.id);
            }}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
            title="Delete user group"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    ),
    children: (
      <div className="space-y-3">
        <div>
          <span className="font-medium">Description:</span> {group.description}
        </div>
        <div>
          <span className="font-medium">Members:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {group.members.map((memberId) => {
              const member = users.find(u => u.id === memberId);
              return member ? (
                <Tag key={memberId} color="green">
                  {member.name}
                </Tag>
              ) : null;
            })}
          </div>
        </div>
        <div>
          <span className="font-medium">Permissions:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {group.permissions.map((permission) => (
              <Tag key={permission} color="blue">
                {permission}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="space-y-6">
      {/* Roles Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Roles ({roles.length})
          </h3>
          <button
            onClick={onAddRole}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Add Role
          </button>
        </div>
        <Collapse ghost items={roleItems} />
      </div>

      {/* User Groups Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            User Groups ({userGroups.length})
          </h3>
          <button
            onClick={onAddUserGroup}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Add User Group
          </button>
        </div>
        <Collapse ghost items={userGroupItems} />
      </div>
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
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(dept)}
                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                    title="Edit department"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(dept.id)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                    title="Delete department"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
