import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_POST_BLOG } from '../../utils/queries';  // Ensure this path is correct

function BlogPostDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST_BLOG, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const blogPost = data.getPostBlog;

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.content}</p>
      <p>By: {blogPost.author.username}</p>
      <p>Posted on: {new Date(blogPost.createdAt).toLocaleDateString()}</p>
      <div>
        <h3>Comments</h3>
        {blogPost.comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.commentText}</p>
            <p>By: {comment.username} on {new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPostDetails;