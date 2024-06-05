import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        blogComment
        createdAt
      }
    }
  }
`;

export const QUERY_BLOGS = gql`
  query getBlogs {
    blogs {
      _id
      blogComment
      blogAuthor
      createdAt
    }
  }
`;

export const QUERY_POST_BLOG = gql`
  query getPostBlog($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      blogComment
      blogAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
