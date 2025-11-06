import { print } from "graphql";
import axios from "axios";
import {
  GetPendingRequestsDocument,
  GetPendingRequestsQuery,
  RequestFilterInput,
  RequestSortInput,
  GetRequestFlowDocument,
  GetRequestFlowQuery,
  ProcessRequestDocument,
  ProcessRequestMutation,
  RequestStepStatus,
} from "./generated/graphql";
import { graphqlClient } from "../../utils/client";

export const GetPendingRequests = async (
  skip: number,
  take: number,
  filter: RequestFilterInput | null = null,
  order: RequestSortInput | null = null,
  client: ReturnType<typeof axios.create> | undefined = undefined
): Promise<{ data: GetPendingRequestsQuery | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: GetPendingRequestsQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(GetPendingRequestsDocument),
      variables: { skip, take, filter, order },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

export const GetRequestFlow = async (
  client: ReturnType<typeof axios.create> | undefined = undefined
): Promise<{ data: GetRequestFlowQuery | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: GetRequestFlowQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(GetRequestFlowDocument),
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

export const ProcessRequest = async (
  requestId: string,
  action: "approve" | "reject",
  comments: string | null = null,
  reason: string | null = null,
  client: ReturnType<typeof axios.create> | undefined = undefined
): Promise<{ data: ProcessRequestMutation | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;

    // Map action strings to RequestStepStatus enum values
    const actionMap: Record<"approve" | "reject", RequestStepStatus> = {
      approve: RequestStepStatus.Approved,
      reject: RequestStepStatus.Rejected,
    };

    const response = await client.post<{
      data?: ProcessRequestMutation;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(ProcessRequestDocument),
      variables: {
        requestId,
        action: actionMap[action],
        comments,
        reason
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
