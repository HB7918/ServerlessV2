import { Amplify } from 'aws-amplify';

// TODO: Replace with your AWS Amplify configuration
// Get this after running: amplify init && amplify add api
const amplifyConfig = {
  Auth: {
    region: 'us-east-1', // Your AWS region
    userPoolId: 'YOUR_USER_POOL_ID',
    userPoolWebClientId: 'YOUR_USER_POOL_WEB_CLIENT_ID',
  },
  API: {
    GraphQL: {
      endpoint: 'YOUR_APPSYNC_ENDPOINT',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'YOUR_API_KEY'
    }
  }
};

// Configure Amplify
Amplify.configure(amplifyConfig);

export default amplifyConfig;
