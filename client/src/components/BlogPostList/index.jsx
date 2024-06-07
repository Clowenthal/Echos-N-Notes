import React from 'react';  // Import React library
import { Link } from 'react-router-dom';  // Import Link component for navigation
import { useQuery } from '@apollo/client';  // Import useQuery hook from Apollo Client
import { GET_BLOG_POSTS } from '../utils/queries';  // Import GET_BLOG_POSTS query

function BlogPostList() {
  // Use Apollo Client's useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_BLOG_POSTS);

  if (loading) return <p>Loading...</p>;  // Show loading message while fetching
  if (error) return <p>Error: {error.message}</p>;  // Show error message if fetch fails

  return (
    <div>
      {data.blogPosts.map(post => (  // Map over blog posts and render them
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Posted by {post.user.username} on {new Date(post.date).toLocaleDateString()}</p>
          <Link to={`/post/${post.id}`}>Read More</Link>  // Link to individual blog post
        </div>
      ))}
    </div>
  );
}

export default BlogPostList;  // Export BlogPostList component
