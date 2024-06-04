import React from 'react';
import PropTypes from 'prop-types';
import { CommentContainer, CommentContent, CommentAuthor, CommentDate } from './styles/CommentStyles';

const Comment = ({ content, author, createdAt }) => (
  <CommentContainer>
    <CommentContent>{content}</CommentContent>
    <CommentAuthor>{author.username}</CommentAuthor>
    <CommentDate> on {new Date(createdAt).toLocaleDateString()}</CommentDate>
  </CommentContainer>
);

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Comment;
