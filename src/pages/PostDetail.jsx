import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getCommentsForPost } from '../services/api';
import Post from '../components/Post';
import Comment from '../components/Comment';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPost(id);
      setPost(fetchedPost);
    };

    const fetchComments = async () => {
      const fetchedComments = await getCommentsForPost(id);
      setComments(fetchedComments);
    };

    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <Post title={post.title} content={post.content} author={post.author} createdAt={post.createdAt} />
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} content={comment.content} author={comment.author} createdAt={comment.createdAt} />
      ))}
    </div>
  );
};

export default PostDetail;
