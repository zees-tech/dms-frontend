"use client";

import { useState, useEffect } from "react";
import { getPermissions, getAssignedPermissions, CreatePermissionAssignment, RemovePermissionAssignment } from "../../../../../apiComponent/graphql/permission";
import { getFolders } from "../../../../../apiComponent/graphql/folder";
import AccessControlSection from "./AccessControlSection";
import { AssigneeInfo as GraphQLAssigneeInfo, AssignmentType } from "../../../../../apiComponent/graphql/generated/graphql";
import { useTheme } from "@/contexts/ThemeContext";

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

interface AssignedPermission {
  id: string;
  assignedToId: string;
  assignmentType: AssignmentType;
  folderPermission?: {
    folderId: string;
    permissionId: string;
  };
}

interface PermissionAssignment {
  [folderId: string]: {
    [permissionId: string]: boolean;
  };
}

interface AccessControlTabProps {
  assignees: GraphQLAssigneeInfo[];
  onEditRole: (assignee: GraphQLAssigneeInfo) => void;
  onDeleteRole: (id: number) => void;
  onEditUserGroup: (assignee: GraphQLAssigneeInfo) => void;
  onDeleteUserGroup: (id: number) => void;
}

export default function AccessControlTab({
  assignees,
  onEditRole,
  onDeleteRole,
  onEditUserGroup,
  onDeleteUserGroup
}: AccessControlTabProps) {
  const { isDark, colorScheme } = useTheme();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [assignments, setAssignments] = useState<{ [assigneeId: string]: PermissionAssignment }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const roles = assignees.filter(a => a.type === "ROLE");
  const userGroups = assignees.filter(a => a.type === "GROUP");

  // Load permissions and folders
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load permissions
        const permissionsResult = await getPermissions();
        if (permissionsResult.error) {
          throw new Error(`Failed to load permissions: ${permissionsResult.error.message}`);
        }

        if (!permissionsResult.data) {
          const mockPermissions: Permission[] = [
            { id: "read", name: "Read", description: "Read access" },
            { id: "write", name: "Write", description: "Write access" },
            { id: "delete", name: "Delete", description: "Delete access" },
            { id: "share", name: "Share", description: "Share access" },
          ];
          setPermissions(mockPermissions);
          console.log(new Error("No permissions data received"));
        }
        else {
          permissionsResult.data.permissions && setPermissions(permissionsResult.data.permissions);
        }

        // For now, we'll use mock permissions since the actual structure isn't clear
        // In a real implementation, you would use the actual permissions from the API


        // Load folders
        const foldersResult = await getFolders();
        if (foldersResult.error) {
          throw new Error(`Failed to load folders: ${foldersResult.error.message}`);
        }
        if (foldersResult.data?.folders) {
          setFolders(foldersResult.data.folders);
        }

        // Load assignments for all assignees
        const assignmentPromises = assignees.map(async (assignee) => {
          const assignedResult = await getAssignedPermissions(assignee.id);
          if (assignedResult.data?.folderPermissionAssignmentsByAssignedToId) {
            const assignment: PermissionAssignment = {};

            assignedResult.data.folderPermissionAssignmentsByAssignedToId.forEach((ap: AssignedPermission) => {
              if (ap.folderPermission) {
                const { folderId, permissionId } = ap.folderPermission;
                if (!assignment[folderId]) {
                  assignment[folderId] = {};
                }
                assignment[folderId][permissionId] = true;
              }
            });

            return { assigneeId: assignee.id, assignment };
          }
          return { assigneeId: assignee.id, assignment: {} };
        });

        const assignmentResults = await Promise.all(assignmentPromises);
        const assignmentsMap: { [assigneeId: string]: PermissionAssignment } = {};
        assignmentResults.forEach(result => {
          assignmentsMap[result.assigneeId] = result.assignment;
        });

        setAssignments(assignmentsMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [assignees]);

  const handlePermissionChange = async (
    assigneeId: string,
    folderId: string,
    permissionId: string,
    checked: boolean
  ) => {
    try {
      if (checked) {
        // Create permission assignment
        const result = await CreatePermissionAssignment({
          assignedToId: assigneeId,
          folderId: folderId,
          permissionId: permissionId,
          assignmentType: AssignmentType.Role
        });

        if (result.error) {
          throw new Error(`Failed to assign permission: ${result.error.message}`);
        }
      } else {
        // Remove permission assignment
        const result = await RemovePermissionAssignment({
          assignedToId: assigneeId,
          folderId: folderId,
          permissionId: permissionId,
          assignmentType: AssignmentType.Role
        });

        if (result.error) {
          throw new Error(`Failed to remove permission: ${result.error.message}`);
        }
      }

      // Update local state
      setAssignments(prev => ({
        ...prev,
        [assigneeId]: {
          ...prev[assigneeId],
          [folderId]: {
            ...prev[assigneeId]?.[folderId],
            [permissionId]: checked
          }
        }
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update permission");
    }
  };

  return (
    <div className="space-y-8">
      {/* Roles Section */}
      <div>
        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
          Roles ({roles.length})
        </h3>
        <AccessControlSection
          assigneeList={roles}
          title="Roles"
          permissions={permissions}
          folders={folders}
          assignments={assignments}
          loading={loading}
          error={error}
          onPermissionChange={handlePermissionChange}
        />
      </div>

      {/* User Groups Section */}
      <div>
        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
          User Groups ({userGroups.length})
        </h3>
        <AccessControlSection
          assigneeList={userGroups}
          title="User Groups"
          permissions={permissions}
          folders={folders}
          assignments={assignments}
          loading={loading}
          error={error}
          onPermissionChange={handlePermissionChange}
        />
      </div>
    </div>
  );
}
