"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal, Form, Button, Row, Col, message } from "antd";
import { GetDepartments } from "@/apiComponent/graphql/department";
import { CreateDepartment } from "@/apiComponent/graphql/department";
import { AssigneeInfo as GraphQLAssigneeInfo, Role as GraphQLRole } from "@/apiComponent/graphql/generated/graphql";
import UsersTable from "./ui/UsersTable";
// import AccessControlTab from "./ui/AccessControlTab";
import DepartmentsTable from "./ui/DepartmentsTable";
import UserForm from "./ui/UserForm";
import DepartmentForm from "./ui/DepartmentForm";
import { GetUsers } from "@/apiComponent/graphql/user";
import { getClientRoles } from "@/apiComponent/graphql/role";

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
  description: string;
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

  // const [assignees, setAssignees] = useState<GraphQLAssigneeInfo[]>([]);

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);


  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const fetchDepartment = useCallback(async () => {
    try {

      const { data, error } = await GetDepartments(skip, take);

      if (error) {
        console.error('Error fetching departments:', error);
        message.error('Failed to load departments');
        return;
      }
      if (data?.departments?.items) {
        const depts = data.departments.items.map(dept => ({
          id: dept.id, // Convert UUID to number for local state
          name: dept.name,
          description: dept.description || '',
        }));
        setDepartments(depts);

        setHasMore(data.departments.pageInfo?.hasNextPage || false);
        setTotalCount(data.departments.totalCount || 0);
      }


    } catch (err) {
      console.error('Error fetching assignees:', err);
      message.error('Failed to load assignees');
    }
  }, [skip, take]);
  const fetchRoles = useCallback(async () => {
    try {

      const { data, error } = await getClientRoles();

      if (error) {
        console.error('Error fetching roles:', error);
        message.error('Failed to load roles');
        return;
      }

      if (data?.roles) {
        const rolesData = data.roles.map(role => ({
          id: role.id,
          name: role.name,
          description: role.description || '',
        }));
        setRoles(rolesData);
      }

    } catch (err) {
      console.error('Error fetching roles:', err);
      message.error('Failed to load roles');
    }
  }, []);
  const fetchUsers = useCallback(async () => {
    try {

      const { data, error } = await GetUsers(skip, take);

      if (error) {
        console.error('Error fetching departments:', error);
        message.error('Failed to load departments');
        return;
      }
      if (data?.users?.items) {
        const depts = data.users.items.map(dept => ({
          id: dept.id,
          name: dept.name,
          email: dept.email,
          role: dept.role?.name || 'N/A',
          department: dept.department?.name || 'N/A',
          status: dept.status,
        }));
        setUsers(depts);

        setHasMore(data.users.pageInfo?.hasNextPage || false);
        setTotalCount(data.users.totalCount || 0);
      }


    } catch (err) {
      console.error('Error fetching assignees:', err);
      message.error('Failed to load assignees');
    }
  }, [skip, take]);

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchDepartment();
      await fetchRoles();
      await fetchUsers();
    };
    fetchAllData();
  }, [fetchDepartment, fetchUsers, fetchRoles]);

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
          // Call API to create department
          const { data, error } = await CreateDepartment({
            name: values.name,
            description: values.description,
            code: values.code || undefined,
            parentDepartmentId: values.parentDepartmentId || undefined,
          });

          if (error) {
            console.error('Error creating department:', error);
            message.error('Failed to create department');
            return;
          }

          if (data?.createDepartment) {
            const newDepartment = {
              id: data.createDepartment.id, // Convert UUID to number for local state
              name: data.createDepartment.name,
              description: data.createDepartment.description || '',
            };
            setDepartments([...departments, newDepartment]);
            message.success('Department created successfully');
          }
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
      case "departments":
        return <DepartmentForm form={form} departments={departments} />;
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
  );
}
