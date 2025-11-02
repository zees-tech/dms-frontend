import {
  PermissionAssigneesQuery,
  PermissionAssigneesDocument,
  AssigneeInfoFilterInput,
  PermissionListDocument,
  PermissionListQuery,
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

// export const getAssignedPermissions = async (
//   assignedToId: string,
//   client: Axios.AxiosInstance | undefined = undefined
// ): Promise<{ data: AssignedPermissionQuery | null; error: Error | null }> => {
//   try {
    
//     if (!client) client = graphqlClient;
//     const response = await graphqlClient.post<{
//       data?: AssignedPermissionQuery;
//       errors?: Array<{ message: string }>;
//     }>("", {
//       query: print(AssignedPermissionDocument),
//       variables: { assignedToId },
//     });
//     return {
//       data: response.data?.data || null,
//       error: null,
//     };
//   } catch (err) {
//     return { data: null, error: err as Error };
//   }
// };

// export const CreatePermissionAssignment = async (
//   input: AssignPermissionToFolderEntityInput,
//   client: Axios.AxiosInstance | undefined = undefined
// ): Promise<{ data: CreateAccessMutation | null; error: Error | null }> => {
//   try {
//     if (!client) client = graphqlClient;
//     const response = await client.post<{
//       data?: CreateAccessMutation;
//       errors?: Array<{ message: string }>;
//     }>("", {
//       query: print(CreateAccessDocument),
//       variables: { AssignPermissionToFolderEntityInput: input },
//     });
//     return { data: response.data?.data || null, error: null };
//   } catch (err) {
//     return { data: null, error: err as Error };
//   }
// };

// export const RemovePermissionAssignment = async (
//   input: RemoveFolderPermissionAssignmentInput,
//   client: Axios.AxiosInstance | undefined = undefined
// ): Promise<{ data: boolean | null; error: Error | null }> => {
//   try {
//     if (!client) client = graphqlClient;
//     const response = await client.post<{
//       data?: { removeFolderPermissionAssignmentByEntity: boolean };
//       errors?: Array<{ message: string }>;
//     }>("", {
//       query: print(RemoveAccessDocument),
//       variables: { RemoveFolderPermissionAssignmentInput: input },
//     });
//     return {
//       data:
//         response.data?.data?.removeFolderPermissionAssignmentByEntity || null,
//       error: null,
//     };
//   } catch (err) {
//     return { data: null, error: err as Error };
//   }
// };
