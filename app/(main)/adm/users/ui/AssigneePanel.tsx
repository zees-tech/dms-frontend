"use client";

import { Collapse, Tag } from "antd";
import AccessControlTable from "./AccessControlTable";

const { Panel } = Collapse;

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

interface AssigneePanelProps {
  assignee: AssigneeInfo;
  permissions: Permission[];
  folders: Folder[];
  assignments: { [assigneeId: string]: PermissionAssignment };
  onPermissionChange: (assigneeId: string, folderId: string, permissionId: string, checked: boolean) => void;
}

export default function AssigneePanel({ 
  assignee, 
  permissions, 
  folders, 
  assignments, 
  onPermissionChange 
}: AssigneePanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Collapse ghost>
        <Panel 
          header={
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-lg">{assignee.name}</span>
                <Tag color={assignee.type === "ROLE" ? "blue" : "green"}>
                  {assignee.type}
                </Tag>
              </div>
              <div className="text-sm text-gray-500">
                {assignee.description || "No description"}
              </div>
            </div>
          }
          key={assignee.id}
        >
          <AccessControlTable
            assignee={assignee}
            permissions={permissions}
            folders={folders}
            assignments={assignments}
            onPermissionChange={onPermissionChange}
          />
        </Panel>
      </Collapse>
    </div>
  );
}
