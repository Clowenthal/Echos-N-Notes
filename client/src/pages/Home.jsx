import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      body
      author {
        name
      }
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Music Blog</h1>
      <ul>
        {data.posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p><i>by {post.author.name}</i></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
