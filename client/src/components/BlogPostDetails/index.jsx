import React from 'react';  // Import React library
import { useQuery } from '@apollo/client';  // Import useQuery hook from Apollo Client
import { useParams } from 'react-router-dom';  // Import useParams to get URL parameters
import { GET_BLOG_POST } from '../utils/queries';  // Import GET_BLOG_POST query

function BlogPostDetails() {
  const { id } = useParams();  // Get the blog post ID from the URL parameters
  const { loading, error, data } = useQuery(GET_BLOG_POST, { variables: { id } });  // Use Apollo Client's useQuery hook to fetch data

  if (loading) return <p>Loading...</p>;  // Show loading message while fetching
  if (error) return <p>Error: {error.message}</p>;  // Show error message if fetch fails

  const post = data.blogPost;  // Get the blog post data from the query result

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Posted by {post.user.username} on {new Date(post.date).toLocaleDateString()}</p>
      <h2>Comments</h2>
      {post.comments.map(comment => (  // Map over comments and render them
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>Commented by {comment.user.username} on {new Date(comment.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogPostDetails;  // Export BlogPostDetails component
