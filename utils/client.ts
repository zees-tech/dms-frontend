import axios from "axios";

const httpClient = axios.create({
  baseURL: "/api",
});

httpClient.interceptors.request.use((config) => {
  const token = ''
  const refresh_token = ''
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
  const token = ''
  const refresh_token = ''
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.refresh_token = `${refresh_token}`;
  }
  return config;
});

export{ graphqlClient, httpClient };