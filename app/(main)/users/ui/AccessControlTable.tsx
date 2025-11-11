"use client";

import { Table, Checkbox } from "antd";

interface Permission {
  id: string;
  name: string;
  description?: string | null;
}

interface Folder {
  id: string;
  name: string;
  description?: string | null;
  parentId?: string;
}

import { AssigneeInfo } from "@/apiComponent/graphql/generated/graphql";

// interface AssigneeInfo {
//   id: string;
//   name: string;
//   type: AssignmentType;
//   description?: string | null;
// }

interface PermissionAssignment {
  [folderId: string]: {
    [permissionId: string]: boolean;
  };
}

interface TableRowData {
  key: string;
  assigneeId: string;
  assigneeName: string;
  folderId: string;
  folderName: string;
  folderDescription?: string | null;
  [permissionId: string]: boolean | string | null | undefined;
}

interface AccessControlTableProps {
  assignee: AssigneeInfo;
  permissions: Permission[];
  folders: Folder[];
  assignments: { [assigneeId: string]: PermissionAssignment };
  onPermissionChange: (assigneeId: string, folderId: string, permissionId: string, checked: boolean) => void;
}

export default function AccessControlTable({ 
  assignee, 
  permissions, 
  folders, 
  assignments, 
  onPermissionChange 
}: AccessControlTableProps) {
  // Check if the current assignee is an admin role
  const isAdminRole = assignee.type === "ROLE" && assignee.name.toLowerCase() === "admin";

  const columns = [
    {
      title: 'Folder',
      dataIndex: 'folderName',
      key: 'folderName',
      fixed: 'left' as const,
      width: 200,
      render: (text: string, record: TableRowData) => (
        <div>
          <div className="font-medium">{text}</div>
          {record.folderDescription && (
            <div className="text-xs text-gray-500">{record.folderDescription}</div>
          )}
        </div>
      ),
    },
    ...permissions.map(permission => ({
      title: (
        <div className="text-center">
          <div className="font-medium">{permission.name}</div>
          {permission.description && (
            <div className="text-xs text-gray-500">{permission.description}</div>
          )}
        </div>
      ),
      dataIndex: permission.id,
      key: permission.id,
      width: 120,
      align: 'center' as const,
      render: (checked: boolean, record: TableRowData) => (
        <Checkbox
          checked={checked}
          disabled={isAdminRole}
          onChange={(e) => onPermissionChange(
            record.assigneeId,
            record.folderId,
            permission.id,
            e.target.checked
          )}
        />
      ),
    })),
  ];

  const dataSource: TableRowData[] = folders.map(folder => {
    const rowData: TableRowData = {
      key: `${assignee.id}-${folder.id}`,
      assigneeId: assignee.id,
      assigneeName: assignee.name,
      folderId: folder.id,
      folderName: folder.name,
      folderDescription: folder.description,
    };

    permissions.forEach(permission => {
      rowData[permission.id] = assignments[assignee.id]?.[folder.id]?.[permission.id] || false;
    });

    return rowData;
  });

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 800 }}
        size="middle"
        rowClassName={(record) => `border-b border-gray-200 dark:border-gray-700`}
      />
    </div>
  );
}
