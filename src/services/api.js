import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export const getPosts = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        getPosts {
          id
          title
          content
          author {
            username
          }
          createdAt
        }
      }
    `,
  });
  return data.getPosts;
};

export const getPost = async (id) => {
  const { data } = await client.query({
    query: gql`
      query {
        getPost(id: "${id}") {
          id
          title
          content
          author {
            username
          }
          createdAt
        }
      }
    `,
  });
  return data.getPost;
};

export const getCommentsForPost = async (postId) => {
  const { data } = await client.query({
    query: gql`
      query {
        getComments(postId: "${postId}") {
          id
          content
          author {
            username
          }
          createdAt
        }
      }
    `,
  });
  return data.getComments;
};

export const createComment = async (content, authorId, postId) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation {
        createComment(content: "${content}", authorId: "${authorId}", postId: "${postId}") {
          id
          content
          author {
            username
          }
          createdAt
        }
      }
    `,
  });
  return data.createComment;
};

export const register = async (username, email, password) => {
  const response = await client.mutate({
    mutation: gql`
      mutation {
        register(username: "${username}", email: "${email}", password: "${password}") {
          id
          username
          email
          token
        }
      }
    `,
  });
  return response.data.register;
};

export const login = async (email, password) => {
  const response = await client.mutate({
    mutation: gql`
      mutation {
        login(email: "${email}", password: "${password}") {
          id
          username
          email
          token
        }
      }
    `,
  });
  return response.data.login;
};
