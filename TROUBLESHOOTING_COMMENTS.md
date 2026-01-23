# Troubleshooting Comments Feature

## Current Status

The comments feature is integrated with AWS AppSync GraphQL API. If you see "Failed to load comments" error, follow these steps to diagnose and fix the issue.

## Step 1: Check Browser Console

1. Open your app in the browser
2. Open Developer Tools (F12 or Cmd+Option+I)
3. Go to the **Console** tab
4. Look for error messages starting with ❌

Common errors and solutions:

### Error: "Network error" or "Failed to fetch"
**Cause**: API endpoint is incorrect or unreachable
**Fix**: Verify the endpoint URL in `src/aws-exports.js`

### Error: "Unauthorized" or "Not authorized"
**Cause**: API key is invalid or expired
**Fix**: Generate a new API key in AppSync console

### Error: "Cannot query field 'listComments'"
**Cause**: GraphQL schema doesn't match the queries
**Fix**: Follow Step 2 to verify schema

## Step 2: Verify AppSync Schema

1. Go to AWS AppSync Console: https://console.aws.amazon.com/appsync/
2. Select your API (ID: `ufkhgetqfvcwph6mhwdffuhvsy`)
3. Click **Schema** in the left sidebar
4. Verify the schema matches this:

```graphql
type Comment @model @auth(rules: [{ allow: public }]) {
  id: ID!
  screenName: String! @index(name: "byScreen", queryField: "commentsByScreen")
  text: String!
  author: String!
  timestamp: AWSTimestamp!
}
```

**Important**: The `@model` directive should auto-generate:
- `listComments` query
- `createComment` mutation
- `deleteComment` mutation
- `onCreateComment` subscription

If the schema is different, update it and click **Save Schema**.

## Step 3: Test API Directly in AppSync Console

1. In AppSync Console, click **Queries** in the left sidebar
2. Try this query:

```graphql
query ListComments {
  listComments {
    items {
      id
      screenName
      text
      author
      timestamp
    }
  }
}
```

3. Click the **Play** button
4. You should see a response like:

```json
{
  "data": {
    "listComments": {
      "items": []
    }
  }
}
```

If you get an error here, the schema needs to be fixed.

## Step 4: Test Creating a Comment

In the AppSync Queries console, try:

```graphql
mutation CreateComment {
  createComment(input: {
    screenName: "test"
    text: "Test comment"
    author: "Test User"
    timestamp: 1234567890
  }) {
    id
    screenName
    text
    author
    timestamp
  }
}
```

If this works, the API is configured correctly!

## Step 5: Verify API Configuration

Check `src/aws-exports.js`:

```javascript
const awsconfig = {
  API: {
    GraphQL: {
      endpoint: 'https://x2aoavmtzvbe7oagrpsesclsge.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-tjsipkh7ovcurc2ox4ar43ysr4'
    }
  }
};
```

Verify:
- ✅ Endpoint URL is correct (from AppSync console)
- ✅ Region matches your AppSync API region
- ✅ API key is valid (check expiration in AppSync console)

## Step 6: Check Network Requests

1. Open Developer Tools
2. Go to **Network** tab
3. Filter by "graphql"
4. Try adding a comment
5. Click on the request to see:
   - Request payload (should show the mutation)
   - Response (should show the created comment or error)

## Common Issues and Fixes

### Issue: "API key expired"
**Solution**: 
1. Go to AppSync Console → Settings → API Keys
2. Create a new API key
3. Update `src/aws-exports.js` with the new key
4. Commit and push to GitHub

### Issue: "Schema mismatch"
**Solution**:
1. Copy the schema from `amplify-schema.graphql`
2. Paste it in AppSync Console → Schema
3. Click **Save Schema**
4. Wait for deployment (1-2 minutes)

### Issue: "CORS error"
**Solution**:
AppSync should handle CORS automatically. If you see CORS errors:
1. Check that the API endpoint URL is correct
2. Verify you're using HTTPS (not HTTP)

### Issue: Comments work but don't sync between browsers
**Solution**:
This means subscriptions aren't working. Check:
1. Browser console for subscription errors
2. AppSync Console → Monitoring → Subscriptions
3. Verify the subscription filter is correct

## Testing Checklist

- [ ] Schema is deployed in AppSync
- [ ] Can query `listComments` in AppSync console
- [ ] Can create comment in AppSync console
- [ ] API key is valid (not expired)
- [ ] `src/aws-exports.js` has correct endpoint and key
- [ ] Browser console shows "✅ AWS Amplify configured"
- [ ] No errors in browser console when loading comments
- [ ] Can add a comment in the app
- [ ] Comment appears in DynamoDB table
- [ ] Comment syncs to other browser tabs

## Still Not Working?

If you've tried all the above and it's still not working, check the browser console logs. The app now logs detailed information:

- `Fetching comments for screen: [screenName]` - When loading comments
- `✅ Comments loaded successfully: [count]` - When comments load
- `❌ Error fetching comments:` - When there's an error (with details)
- `Creating comment: [comment]` - When creating a comment
- `✅ Comment created:` - When comment is created successfully

Share these logs to help diagnose the issue!

## Alternative: Use Amplify CLI

If manual setup is too complex, you can use Amplify CLI to set everything up automatically:

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add API
amplify add api

# Deploy
amplify push
```

See `AWS_AMPLIFY_SETUP.md` for detailed instructions.
