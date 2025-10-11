import {
  GetFoldersDocument,
  GetFoldersQuery,
  CreateFolderDocument,
  CreateFolderMutation,
  CreateFolderInput,
} from "./generated/graphql";
import { graphqlClient } from "../../utils/client";
import { print } from "graphql";

export const getFolders = async (): Promise<{
  data: GetFoldersQuery | null;
  error: Error | null;
}> => {
  try {
    const response = await graphqlClient.post<{
      data?: GetFoldersQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(GetFoldersDocument)
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

export const createFolder = async (
  input: CreateFolderInput
): Promise<{
  data: CreateFolderMutation | null;
  error: Error | null;
}> => {
  try {
    const response = await graphqlClient.post<{
      data?: CreateFolderMutation;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(CreateFolderDocument),
      variables: { input },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};
