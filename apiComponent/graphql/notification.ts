import { print } from "graphql";
import {
  GetMyNotificationsDocument,
  GetMyNotificationsQuery,
  NotificationFilterInput,
} from "./generated/graphql";

import { graphqlClient } from "../../utils/client";

export const GetNotifications = async (
  skip: number,
  take: number,
  filter: NotificationFilterInput | null = null,
  client: Axios.AxiosInstance | undefined = undefined
): Promise<{ data: GetMyNotificationsQuery | null; error: Error | null }> => {
  try {
    if (!client) client = graphqlClient;
    const response = await client.post<{
      data?: GetMyNotificationsQuery;
      errors?: Array<{ message: string }>;
    }>("", {
      query: print(GetMyNotificationsDocument),
      variables: { skip, take, filter },
    });
    return { data: response.data?.data || null, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
};

// export const MarkNotificationAsRead = async (
//   notificationId: string,
//   client: Axios.AxiosInstance | undefined = undefined
// ): Promise<{
//   data: MarkNotificationAsReadMutation | null;
//   error: Error | null;
// }> => {
//   try {
//     if (!client) client = graphqlClient;
//     const response = await client.post<{
//       data?: MarkNotificationAsReadMutation;
//       errors?: Array<{ message: string }>;
//     }>("", {
//       query: print(MarkNotificationAsReadDocument),
//       variables: { notificationId },
//     });
//     return { data: response.data?.data || null, error: null };
//   } catch (err) {
//     return { data: null, error: err as Error };
//   }
// };

// export const MarkAllNotificationsAsRead = async (
//   client: Axios.AxiosInstance | undefined = undefined
// ): Promise<{
//   data: MarkAllNotificationsAsReadMutation | null;
//   error: Error | null;
// }> => {
//   try {
//     if (!client) client = graphqlClient;
//     const response = await client.post<{
//       data?: MarkAllNotificationsAsReadMutation;
//       errors?: Array<{ message: string }>;
//     }>("", {
//       query: print(MarkAllNotificationsAsReadDocument),
//     });
//     return { data: response.data?.data || null, error: null };
//   } catch (err) {
//     return { data: null, error: err as Error };
//   }
// };
