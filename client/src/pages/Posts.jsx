import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      author {
        name
      }
      comments {
        id
        text
        author {
          name
        }
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation AddComment($text: String!, $postId: ID!) {
    addComment(text: $text, postId: $postId) {
      id
      text
      author {
        name
      }
    }
  }
`;

const Post = ({ match }) => {
  const { id } = match.params;
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });
  const [text, setText] = useState('');
  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      const { post } = cache.readQuery({ query: GET_POST, variables: { id } });
      cache.writeQuery({
        query: GET_POST,
        variables: { id },
        data: {
          post: {
            ...post,
            comments: [...post.comments, addComment]
          }
        }
      });
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment({ variables: { text, postId: id } });
      setText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{data.post.title}</h1>
      <p>{data.post.body}</p>
      <p><i>by {data.post.author.name}</i></p>
      <h2>Comments</h2>
      <ul>
        {data.post.comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <p><i>by {comment.author.name}</i></p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Post;
