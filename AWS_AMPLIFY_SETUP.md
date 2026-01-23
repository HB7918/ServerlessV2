# AWS Amplify Setup for Shared Comments

## Quick Start Guide

### 1. Install Amplify CLI Globally

```bash
npm install -g @aws-amplify/cli
```

### 2. Configure Amplify (One-time setup)

```bash
amplify configure
```

Follow the prompts:
1. Sign in to AWS Console (opens in browser)
2. Create an IAM user with AdministratorAccess
3. Copy Access Key ID and Secret Access Key
4. Enter them in the terminal

### 3. Initialize Amplify in Your Project

```bash
amplify init
```

Configuration:
- Project name: `serverlessv2`
- Environment: `dev`
- Default editor: (your choice)
- App type: `javascript`
- Framework: `react`
- Source directory: `src`
- Distribution directory: `dist`
- Build command: `npm run build`
- Start command: `npm run dev`
- AWS Profile: (select the one you just created)

### 4. Add GraphQL API with DynamoDB

```bash
amplify add api
```

Configuration:
- Service: `GraphQL`
- API name: `commentsapi`
- Authorization mode: `API key`
- API key expiration: `365` (days)
- Additional auth types: `No`
- Conflict detection: `No`
- Schema template: `Blank Schema`

### 5. Use the Provided Schema

Copy the contents of `amplify-schema.graphql` to `amplify/backend/api/commentsapi/schema.graphql`

Or manually create the schema:

```graphql
type Comment @model @auth(rules: [{ allow: public }]) {
  id: ID!
  screenName: String! @index(name: "byScreen", queryField: "commentsByScreen")
  text: String!
  author: String!
  timestamp: AWSTimestamp!
}
```

### 6. Deploy to AWS

```bash
amplify push
```

This will:
- Create DynamoDB table `Comment`
- Create AppSync GraphQL API
- Generate API endpoint and API key
- Create `src/aws-exports.js` with configuration

Answer:
- Generate code: `Yes`
- Code generation language: `javascript`
- File pattern: `src/graphql/**/*.js`
- Generate all operations: `Yes`
- Max depth: `2`

### 7. Update Your App to Use Amplify

The GraphQL queries, mutations, and subscriptions are already created in:
- `src/graphql/queries.js`
- `src/graphql/mutations.js`
- `src/graphql/subscriptions.js`

### 8. Initialize Amplify in Your App

Update `src/main.jsx` to configure Amplify:

```javascript
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
```

### 9. Update CommentsPanel Component

The component is ready to use Amplify. You just need to import and use the GraphQL operations.

## Testing

1. Run your app: `npm run dev`
2. Navigate to Collection Groups
3. Click Comments button
4. Add a comment
5. Open in another browser/tab - comments sync in real-time!

## AWS Resources Created

- **DynamoDB Table**: `Comment-{env}`
- **AppSync API**: GraphQL endpoint
- **IAM Roles**: For AppSync to access DynamoDB
- **CloudWatch Logs**: For API monitoring

## Cost Estimate (Free Tier)

- **DynamoDB**: 25 GB storage, 25 RCU/WCU (enough for thousands of comments)
- **AppSync**: 250,000 query/mutation operations per month
- **Data Transfer**: 1 GB out per month

For a small app, this stays within AWS Free Tier.

## Useful Commands

```bash
# Check status of resources
amplify status

# View API details
amplify api console

# View DynamoDB table
amplify console api

# Update API after schema changes
amplify push

# Delete all resources
amplify delete
```

## Security Best Practices

### Current Setup (Development)
- Uses API Key authentication
- Anyone with the key can read/write
- Good for development/testing

### Production Setup (Recommended)

1. **Add Authentication**:
```bash
amplify add auth
```

2. **Update Schema** to require authentication:
```graphql
type Comment @model @auth(rules: [
  { allow: owner, operations: [create, update, delete] }
  { allow: public, operations: [read] }
]) {
  id: ID!
  screenName: String! @index(name: "byScreen")
  text: String!
  author: String!
  timestamp: AWSTimestamp!
  owner: String
}
```

3. **Push changes**:
```bash
amplify push
```

## Troubleshooting

### Error: "amplify: command not found"
```bash
npm install -g @aws-amplify/cli
```

### Error: "No credentials"
```bash
amplify configure
aws configure list
```

### Error: "GraphQL error"
- Check `src/aws-exports.js` exists
- Verify API key hasn't expired
- Check AppSync console for errors

### Comments not syncing
- Open browser console for errors
- Check Network tab for GraphQL requests
- Verify DynamoDB table has data in AWS Console

## Alternative: Manual AWS Setup

If you prefer not to use Amplify CLI, you can manually:
1. Create DynamoDB table in AWS Console
2. Create AppSync API
3. Configure resolvers
4. Get API endpoint and key
5. Update `src/aws-config.js`

Would you like instructions for manual setup instead?
