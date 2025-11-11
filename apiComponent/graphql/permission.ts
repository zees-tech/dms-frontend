import {
  PermissionAssigneesQuery,
  PermissionAssigneesDocument,
  AssigneeInfoFilterInput,
  PermissionListDocument,
  PermissionListQuery,
  HasPermissionsDocument,
  HasPermissionsQuery,
  PermissionFilterInput,
  PermissionType,
} from "./generated/graphql";
import { graphqlClient } from "../../utils/client";
import { print } from "graphql";

export const getPermissionsAssigneeList = async (
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{ data: PermissionAssigneesQuery | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: PermissionAssigneesQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(PermissionAssigneesDocument),
      variables: {
        AssigneeInfoFilterInput: {
          and: [
            {
              type: {
                neq: "USER",
              },
            },
            {
              name: {
                neq: "sys-admin",
              },
            },
          ],
        } as AssigneeInfoFilterInput,
      },
    });
    return {
      data: response.data?.data || null,
      error: null,
    };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

export const getPermissions = async (
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{ data: PermissionListQuery | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: PermissionListQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(PermissionListDocument),
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

const hasPermissions = async (
  entityId: string,
  _for: PermissionType,
  where: PermissionFilterInput | null = null,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{ data: HasPermissionsQuery | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: HasPermissionsQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(HasPermissionsDocument),
      variables: {
        entityId,
        _for,
        where,
      },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

export const hasPermission = async (
  entityId: string,
  action: 'create' | 'read' | 'update' | 'delete',
  where: PermissionFilterInput | null = null,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<boolean> => {
  try {
    const { data, error } = await hasPermissions(entityId, PermissionType.Folder, where, client);
    if (error) throw error;
    return (
      data?.hasPermissions.some((p) => p.allowed.some((a) => a == action)) ??
      false
    );
  } catch (err) {
    console.error("Error checking permission:", err);
    return false;
  }
};
