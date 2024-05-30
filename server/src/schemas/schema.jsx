const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getPosts: [Post]
    getPost(id: ID!): Post
    getComments(postId: ID!): [Comment]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    createPost(title: String!, content: String!, authorId: ID!): Post
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Post
    createComment(content: String!, authorId: ID!, postId: ID!): Comment
    updateComment(id: ID!, content: String): Comment
    deleteComment(id: ID!): Comment
  }
`;

module.exports = typeDefs;
