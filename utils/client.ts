import axios from "axios";
import { Token } from "graphql";

const httpClient = axios.create({
  baseURL: "/api",
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");
  const refresh_token = "";
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.refresh_token = `${refresh_token}`;
  }
  return config;
});

const graphqlClient = axios.create({
  baseURL: "/api/graphql/", // Will be rewritten to https://devwk.blueraiz.com/graphql by Next.js
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization token if available
graphqlClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");
  const refresh_token = "";
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.refresh_token = `${refresh_token}`;
  }
  return config;
});

const localClient = axios.create({});

localClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");
  const refresh_token = "";
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.refresh_token = `${refresh_token}`;
  }
  return config;
});

const createServerClient = async (
  clientType: "graphql" | "http",
  token: string,
  refresh_token: string | "",
  baseUrl: "/api" | ""
) => {
  const ss_Client =
    clientType == "graphql"
      ? axios.create({
          baseURL: `${"https://devwk.blueraiz.com/dms"}/graphql/`, // Will be rewritten to https://devwk.blueraiz.com/graphql by Next.js
          headers: {
            "Content-Type": "application/json",
          },
        })
      : axios.create({
          baseURL: baseUrl,
        });
  // Attach Authorization token if available
  ss_Client.interceptors.request.use((config) => {
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.refresh_token = `${refresh_token}`;
    }
    console.log("🛰️ Client Request:");
    console.log("➡️ URL:", config.baseURL + (config.url || ""));
    console.log("➡️ Method:", config.method?.toUpperCase());
    console.log("➡️ Headers:", config.headers);
    console.log("➡️ Body:", config.data); // Body of POST/PUT requests
    return config;
  });
  return ss_Client;
};

export { graphqlClient, httpClient, localClient, createServerClient };
