# Comments Feature - Quick Start

## 🚀 Test It Now

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open browser console** (F12)

3. **Go to Collection Groups page**

4. **Click Comments button**

5. **Check console for**:
   - ✅ `AWS Amplify configured` 
   - ✅ `Comments loaded successfully`

## ❌ If You See Errors

### Error: "Cannot query field 'listComments'"
→ **Fix**: Update AppSync schema (see below)

### Error: "Unauthorized"
→ **Fix**: Update API key in `src/aws-exports.js`

### Error: "Network error"
→ **Fix**: Check endpoint URL in `src/aws-exports.js`

## 🔧 Update AppSync Schema

1. Go to: https://console.aws.amazon.com/appsync/
2. Select API: `ufkhgetqfvcwph6mhwdffuhvsy`
3. Click **Schema**
4. Paste this:

```graphql
type Comment @model @auth(rules: [{ allow: public }]) {
  id: ID!
  screenName: String! @index(name: "byScreen", queryField: "commentsByScreen")
  text: String!
  author: String!
  timestamp: AWSTimestamp!
}
```

5. Click **Save Schema**
6. Wait 2 minutes
7. Refresh your app

## 📝 Test in AppSync Console

1. AppSync Console → **Queries**
2. Run:

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

3. Should return: `{ "data": { "listComments": { "items": [] } } }`

## 🎯 What Changed

- Removed `createdAt` and `updatedAt` from queries
- Added detailed console logging
- Created test tools

## 📚 More Help

- **Detailed troubleshooting**: `TROUBLESHOOTING_COMMENTS.md`
- **Full status**: `COMMENTS_FEATURE_STATUS.md`
- **Test page**: Open `http://localhost:5173/test-appsync.html`

## ✅ Success Checklist

- [ ] Dev server running
- [ ] Console shows "AWS Amplify configured"
- [ ] No errors when opening comments
- [ ] Can add a comment
- [ ] Comment appears in the list
- [ ] Comment visible in AppSync/DynamoDB

## 🚢 Deploy

```bash
git add .
git commit -m "Fix comments GraphQL integration"
git push
```

AWS Amplify auto-deploys in 2-3 minutes.
