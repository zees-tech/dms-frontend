import { print } from "graphql";
import {
  GetRolesDocument,
  GetRolesQuery,
  RoleSortInput,
  RoleFilterInput,
} from "./generated/graphql";
import { graphqlClient } from "../../utils/client";

export const getClientRoles = async (
  order: Array<RoleSortInput> | null = null,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{ data: GetRolesQuery | null; error: Error | null }> => {
  try {
    const where: RoleFilterInput = {
        name: { neq: "sys-admin" },
    };
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: GetRolesQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(GetRolesDocument),
      variables: { where, order },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};
