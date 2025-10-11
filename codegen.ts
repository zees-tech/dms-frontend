import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://devwk.blueraiz.com/dms/graphql/schema.graphql",
  documents: ["./apiComponent/graphql/**/*.graphql"],
  generates: {
    "./apiComponent/graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
