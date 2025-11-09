import {
  GetFilesDocument,
  GetFilesQuery,
  CreateFileDocument,
  CreateFileMutation,
  CreateFileInput,
  UpdateFileInput,
  UpdateFileMutation,
  UpdateFileDocument,
} from "./generated/graphql";
import { graphqlClient } from "../../utils/client";
import { print } from "graphql";

export const getFiles = async (
  folderId: string,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{
  data: GetFilesQuery | null;
  error: Error | null;
}> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: GetFilesQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(GetFilesDocument),
      variables: { folderId },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

export const createFile = async (
  input: CreateFileInput,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{
  data: CreateFileMutation | null;
  error: Error | null;
}> => {
  try {
    if (!client) {
      client = graphqlClient;
    }
    const response = await client.post<{
      data?: CreateFileMutation;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(CreateFileDocument),
      variables: { input },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    console.error("Create File Error: ", err);
    return { data: null, error: err as Error };
  }
};

export const updateFile = async (
  input: UpdateFileInput,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{
  data: UpdateFileMutation | null;
  error: Error | null;
}> => {
  try {
    if (!client) {
      client = graphqlClient;
    }
    const response = await client.post<{
      data?: UpdateFileMutation;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(UpdateFileDocument),
      variables: { input },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    console.error("Update File Error: ", err);
    return { data: null, error: err as Error };
  }
};
