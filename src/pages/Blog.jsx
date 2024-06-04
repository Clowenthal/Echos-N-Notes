import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import Post from '../components/Post';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <Post key={post.id} title={post.title} content={post.content} author={post.author} createdAt={post.createdAt} />
      ))}
    </div>
  );
};

export default Blog;
