import { print } from "graphql";
import {
  GetUsersDocument,
  GetUsersQuery,
  UserFilterInput,
  UserSortInput,
} from "./generated/graphql";
import { graphqlClient } from "../../utils/client";

export const GetUsers = async (
  skip: number,
  take: number,
  where: UserFilterInput | null = null,
  order: [UserSortInput] | null = null,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{ data: GetUsersQuery | null; error: Error | null }> => {
  try {
    where = {
      ...where,
      role: { name: { neq: "sys-admin" } },
    };
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: GetUsersQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(GetUsersDocument),
      variables: { skip, take, where, order },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};
