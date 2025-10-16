"use client";

import { Spin, Alert } from "antd";
import AssigneePanel from "./AssigneePanel";

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

import { AssignmentType } from "../../../../../apiComponent/graphql/generated/graphql";

interface AssigneeInfo {
  id: string;
  name: string;
  type: AssignmentType;
  description?: string | null;
}

interface PermissionAssignment {
  [folderId: string]: {
    [permissionId: string]: boolean;
  };
}

interface AccessControlSectionProps {
  assigneeList: AssigneeInfo[];
  title: string;
  permissions: Permission[];
  folders: Folder[];
  assignments: { [assigneeId: string]: PermissionAssignment };
  loading: boolean;
  error: string | null;
  onPermissionChange: (assigneeId: string, folderId: string, permissionId: string, checked: boolean) => void;
}

export default function AccessControlSection({ 
  assigneeList, 
  title, 
  permissions, 
  folders, 
  assignments, 
  loading, 
  error, 
  onPermissionChange 
}: AccessControlSectionProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        closable
        onClose={() => {}}
      />
    );
  }

  if (folders.length === 0 || permissions.length === 0) {
    return (
      <Alert
        message="No Data"
        description="No folders or permissions found to display access controls."
        type="info"
        showIcon
      />
    );
  }

  if (assigneeList.length === 0) {
    return (
      <Alert
        message={`No ${title} Found`}
        description={`There are no ${title.toLowerCase()} to display access controls for.`}
        type="info"
        showIcon
      />
    );
  }

  return (
    <div className="space-y-4">
      {assigneeList.map((assignee) => (
        <AssigneePanel
          key={assignee.id}
          assignee={assignee}
          permissions={permissions}
          folders={folders}
          assignments={assignments}
          onPermissionChange={onPermissionChange}
        />
      ))}
    </div>
  );
}
