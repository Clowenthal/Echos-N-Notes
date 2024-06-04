import React from 'react';
import PropTypes from 'prop-types';
import { PostContainer, PostTitle, PostContent, PostAuthor, PostDate } from './styles/PostStyles';

const Post = ({ title, content, author, createdAt }) => (
  <PostContainer>
    <PostTitle>{title}</PostTitle>
    <PostContent>{content}</PostContent>
    <PostAuthor>By {author.username}</PostAuthor>
    <PostDate>on {new Date(createdAt).toLocaleDateString()}</PostDate>
  </PostContainer>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
