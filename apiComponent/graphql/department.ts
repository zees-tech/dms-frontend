import { print } from "graphql";
import {
  CreateDepartmentDocument,
  CreateDepartmentMutation,
  CreateDepartmentInput,
  GetDepartmentsDocument,
  GetDepartmentsQuery,
  DepartmentFilterInput,
  DepartmentSortInput,
} from "./generated/graphql";
import { graphqlClient } from "../../utils/client";

export const CreateDepartment = async (
  input: CreateDepartmentInput,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{ data: CreateDepartmentMutation | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: CreateDepartmentMutation;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(CreateDepartmentDocument),
      variables: { input },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

export const GetDepartments = async (
  skip: number,
  take: number,
  where: DepartmentFilterInput | null = null,
  order: [DepartmentSortInput] | null = null,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{ data: GetDepartmentsQuery | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: GetDepartmentsQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(GetDepartmentsDocument),
      variables: { skip, take, where, order },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};
