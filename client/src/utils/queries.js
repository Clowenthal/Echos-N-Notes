import { gql } from '@apollo/client';  // Import gql function from Apollo Client

// GraphQL query to get all blog posts
export const GET_BLOG_POSTS = gql`
  query getBlogPosts {
    getBlogPosts {
      _id
      title
      content
      author {
        username
      }
      createdAt
    }
  }
`;

// GraphQL query to get a single blog post by ID
export const GET_POST_BLOG = gql`
  query getPostBlog($id: ID!) {
    getPostBlog(id: $id) {
      _id
      title
      content
      author {
        username
      }
      createdAt
      comments {
        _id
        commentText
        createdAt
        username
      }
    }
  }
`;

// GraphQL query to get all users
export const GET_USERS = gql`
  {
    users {
      _id
      username
      email
    }
  }
`;

// GraphQL query to get a single user by ID
export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;
