"use client";

import { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, message } from "antd";
import { getPermissionsAssigneeList } from "@/apiComponent/graphql/permission";
import { AssigneeInfo as GraphQLAssigneeInfo, Role as GraphQLRole } from "@/apiComponent/graphql/generated/graphql";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UsersTable from "./ui/UsersTable";
// import AccessControlTab from "./ui/AccessControlTab";
import DepartmentsTable from "./ui/DepartmentsTable";
import UserForm from "./ui/UserForm";
import RoleForm from "./ui/RoleForm";
import UserGroupForm from "./ui/UserGroupForm";
import DepartmentForm from "./ui/DepartmentForm";

// Type definitions
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

interface Department {
  id: number;
  name: string;
}

// Simplified Role interface matching the API response
interface Role {
  id: string;
  name: string;
  description: string;
}

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form] = Form.useForm();

  const [users, setUsers] = useState<User[]>([]);

  // const [assignees, setAssignees] = useState<GraphQLAssigneeInfo[]>([]);

  const [roles, setRoles] = useState<Role[]>([]);

  const [departments, setDepartments] = useState<Department[]>([]);

  // Fetch assignees from API
  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const { data, error } = await getPermissionsAssigneeList();
        if (error) {
          console.error('Error fetching assignees:', error);
          message.error('Failed to load assignees');
          return;
        }
        if (data?.permissionAssignees) {
          // setAssignees(data.permissionAssignees);
        }
      } catch (err) {
        console.error('Error fetching assignees:', err);
        message.error('Failed to load assignees');
      }
    };

    fetchAssignees();
  }, []);

  const openModal = (item: User | Department | GraphQLAssigneeInfo | null = null) => {
    if (item) {
      setEditingId(typeof item.id === 'string' ? parseInt(item.id) : item.id);
      if (activeTab === "users" && 'email' in item) {
        form.setFieldsValue({
          name: item.name,
          email: item.email,
          role: item.role,
          department: item.department,
          status: item.status,
        });
      } else if (activeTab === "access-control" && 'type' in item) {
        if (item.type === "GROUP") {
          // User Group
          form.setFieldsValue({
            name: item.name,
            description: item.description || '',
            type: "user-group",
          });
        } else {
          // Role
          form.setFieldsValue({
            name: item.name,
            description: item.description || '',
            type: "role",
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
        // For now, we'll just show a message since the API handles creation/updates
        if (editingId) {
          message.success('Assignee updated successfully');
        } else {
          message.success('Assignee created successfully');
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

  // const handleDeleteRole = (id: number) => {
  //   setAssignees(assignees.filter((assignee) => assignee.id !== id.toString()));
  //   message.success('Role deleted successfully');
  // };

  // const handleDeleteUserGroup = (id: number) => {
  //   setAssignees(assignees.filter((assignee) => assignee.id !== id.toString()));
  //   message.success('User Group deleted successfully');
  // };

  const renderFormContent = () => {
    switch (activeTab) {
      case "users":
        return <UserForm form={form} roles={roles} departments={departments} />;
      // case "access-control":
      //   const type = form.getFieldValue("type");
      //   if (type === "user-group") {
      //     return <UserGroupForm form={form} users={users} editingId={editingId} />;
      //   } else {
      //     return <RoleForm form={form} editingId={editingId} />;
      //   }
      case "departments":
        return <DepartmentForm form={form} />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    const baseTitle = `${editingId ? "Edit" : "Add"} `;
    
    if (activeTab === "users") {
      return baseTitle + "User";
    } else if (activeTab === "access-control") {
      const type = form.getFieldValue("type");
      return baseTitle + (type === "role" ? "Role" : "User Group");
    } else {
      return baseTitle + "Department";
    }
  };

  const getModalWidth = () => {
    if (activeTab === "users") return 600;
    if (activeTab === "access-control") return 700;
    return 400;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {activeTab === "users"
                ? "Users"
                // : activeTab === "access-control"
                //   ? "Access Control"
                  : "Departments"}
            </h1>
            <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
              {["users", "departments"].map((tab) => (
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
        {/* {activeTab === "access-control" && (
          <AccessControlTab
            assignees={assignees}
            onEditRole={openModal}
            onDeleteRole={handleDeleteRole}
            onEditUserGroup={openModal}
            onDeleteUserGroup={handleDeleteUserGroup}
          />
        )} */}
        {activeTab === "departments" && (
          <DepartmentsTable
            departments={departments}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        )}

        <Modal
          title={getModalTitle()}
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          width={getModalWidth()}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            {renderFormContent()}

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
