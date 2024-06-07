import { gql } from '@apollo/client';  // Import gql function from Apollo Client

// GraphQL query to get all blog posts
export const GET_BLOG_POSTS = gql`
  {
    blogPosts {
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

// GraphQL query to get a single blog post by ID
export const GET_BLOG_POST = gql`
  query BlogPost($id: ID!) {
    blogPost(id: $id) {
      id
      title
      content
      date
      user {
        username
      }
      comments {
        id
        content
        date
        user {
          username
        }
      }
    }
  }
`;

// GraphQL query to get all users
export const GET_USERS = gql`
  {
    users {
      id
      username
      email
    }
  }
`;

// GraphQL query to get a single user by ID
export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;
