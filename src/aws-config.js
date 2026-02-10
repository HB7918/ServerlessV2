import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  API: {
    GraphQL: {
      endpoint: 'https://x2aoavmtzvbe7oagrpsesclsge.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-tjsipkh7ovcurc2ox4ar43ysr4'
    }
  }
};

// Configure Amplify
Amplify.configure(amplifyConfig);

export default amplifyConfig;
