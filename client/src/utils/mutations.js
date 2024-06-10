import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BLOG_POST = gql`
  mutation addBlogPost($userId: ID!, $title: String!, $content: String!) {
    addBlogPost(userId: $userId, title: $title, content: $content) {
      _id
      title
      content
      createdAt
      user {
        username
      }
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $blogPostId: ID!,
    $commentText: String!,
    $commentAuthor: String!
  ) {
    addComment(
      blogPostId: $blogPostId,
      commentText: $commentText,
      commentAuthor: $commentAuthor
    ) {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
`;
