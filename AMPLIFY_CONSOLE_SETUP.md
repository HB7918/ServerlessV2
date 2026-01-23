# Add Comments API via AWS Amplify Console

Since your app is already deployed on AWS Amplify, follow these steps to add the GraphQL API through the console:

## Step-by-Step Guide

### 1. Open AWS Amplify Console

1. Go to: https://console.aws.amazon.com/amplify/
2. Sign in with your AWS account
3. Click on your app: **ServerlessV2**

### 2. Add GraphQL API

1. In the left sidebar, click **Backend environments**
2. Click **Get started** or **Add backend**
3. Select **GraphQL API**

### 3. Configure API

- **API name**: `commentsapi`
- **Authorization mode**: **API key**
- **API key expiration**: `365` days
- Click **Next**

### 4. Add Schema

Copy and paste this schema:

```graphql
type Comment @model @auth(rules: [{ allow: public }]) {
  id: ID!
  screenName: String! @index(name: "byScreen", queryField: "commentsByScreen")
  text: String!
  author: String!
  timestamp: AWSTimestamp!
}
```

Click **Create**

### 5. Deploy

- Click **Deploy**
- Wait for deployment to complete (2-3 minutes)

### 6. Get API Configuration

After deployment:

1. Click on **API** in the backend
2. Copy the following values:
   - **GraphQL endpoint URL**
   - **API Key**
   - **AWS Region**

### 7. Create aws-exports.js

Create a file `src/aws-exports.js` with this content (replace with your values):

```javascript
const awsconfig = {
  aws_project_region: 'us-east-1', // Your region
  aws_appsync_graphqlEndpoint: 'https://xxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-xxxxxxxxxxxxxxxxxxxxxxxxxx',
};

export default awsconfig;
```

### 8. Update main.jsx

I'll update the code to initialize Amplify automatically.

### 9. Test

1. Push changes to GitHub
2. Amplify will auto-deploy
3. Open your app
4. Go to Collection Groups
5. Add a comment
6. Open in another browser - comments should sync!

## Alternative: Download Configuration

After creating the API in Amplify Console:

1. Click **Download aws-exports.js**
2. Save it to `src/aws-exports.js`
3. Push to GitHub

## Troubleshooting

**Can't find Backend environments?**
- Make sure you're in the Amplify Console (not Amplify Studio)
- Look for "Backend environments" in the left sidebar

**API not working?**
- Check browser console for errors
- Verify aws-exports.js has correct values
- Check API key hasn't expired

**Need help?**
Let me know and I can guide you through each step!
