import { gql } from '@apollo/client';  // Import gql function from Apollo Client

// GraphQL mutation for login
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// GraphQL mutation for registration
export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
    }
  }
`;

// GraphQL mutation to add a new blog post
export const ADD_BLOG_POST = gql`
  mutation AddBlogPost($userId: ID!, $title: String!, $content: String!) {
    addBlogPost(userId: $userId, title: $title, content: $content) {
      id
      title
      content
      date
      user {
        username
      }
    }
  }
`;

// GraphQL mutation to add a comment to a blog post
export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $userId: ID!, $content: String!) {
    addComment(postId: $postId, userId: $userId, content: $content) {
      id
      content
      date
      user {
        username
      }
    }
  }
`;
