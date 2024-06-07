import { Link } from 'react-router-dom';

const BlogPostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h3>No Blog Post Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {post.blogAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                Commented on {post.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{post.blogComment}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              Comment On This Blog Post
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogPostList;
