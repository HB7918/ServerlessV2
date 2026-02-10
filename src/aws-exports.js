const awsconfig = {
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_APPSYNC_ENDPOINT || 'https://x2aoavmtzvbe7oagrpsesclsge.appsync-api.us-east-1.amazonaws.com/graphql',
      region: import.meta.env.VITE_APPSYNC_REGION || 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: import.meta.env.VITE_APPSYNC_API_KEY || 'da2-tjsipkh7ovcurc2ox4ar43ysr4'
    }
  }
};

// Also export individual values for direct API calls if needed
export const graphqlConfig = {
  endpoint: awsconfig.API.GraphQL.endpoint,
  apiKey: awsconfig.API.GraphQL.apiKey,
  region: awsconfig.API.GraphQL.region
};

export default awsconfig;
