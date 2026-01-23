// GraphQL mutations for comments
export const createComment = /* GraphQL */ `
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      screenname
      text
      author
      timestamp
    }
  }
`;

export const updateComment = /* GraphQL */ `
  mutation UpdateComment($input: UpdateCommentInput!) {
    updateComment(input: $input) {
      screenname
      text
      author
      timestamp
    }
  }
`;

export const deleteComment = /* GraphQL */ `
  mutation DeleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      screenname
      text
      author
      timestamp
    }
  }
`;
