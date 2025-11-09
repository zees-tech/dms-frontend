import {
  GetFilesDocument,
  GetFilesQuery,
  CreateFileDocument,
  CreateFileMutation,
  CreateFileInput,
} from "./generated/graphql";

// Server-side GraphQL client that accepts authorization token
const createServerGraphqlClient = (authToken?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add Authorization header if token is provided
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return {
    baseURL: process.env.GRAPHQL_ENDPOINT || "https://devwk.blueraiz.com/graphql",
    headers,
  };
};

export const getFilesServer = async (authToken?: string): Promise<{
  data: GetFilesQuery | null;
  error: Error | null;
}> => {
  try {
    const client = createServerGraphqlClient(authToken);
    
    const response = await fetch(client.baseURL, {
      method: "POST",
      headers: client.headers,
      body: JSON.stringify({
        query: GetFilesDocument.loc?.source.body,
      }),
    });

    const result = await response.json();
    return { data: result.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

export const createFileServer = async (
  input: CreateFileInput,
  authToken?: string
): Promise<{
  data: CreateFileMutation | null;
  error: Error | null;
}> => {
  try {
    const client = createServerGraphqlClient(authToken);
    
    const response = await fetch(client.baseURL, {
      method: "POST",
      headers: client.headers,
      body: JSON.stringify({
        query: CreateFileDocument.loc?.source.body,
        variables: { input },
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      return { data: null, error: new Error(result.errors[0]?.message || "GraphQL error") };
    }

    return { data: result.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};
