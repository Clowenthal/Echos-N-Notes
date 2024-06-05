import { Link } from 'react-router-dom';

const BlogPostList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Blog Post Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {thought.blogAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                Commented on {thought.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.blogComment}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Comment On This Blog Post
            </Link>
          </div>
        ))}
    </div>
  );
};

export default BlogPostList;
