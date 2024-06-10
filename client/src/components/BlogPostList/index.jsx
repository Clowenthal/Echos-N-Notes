import { Link } from 'react-router-dom'; // Import Link component for navigation

function BlogPostList({ posts, title }) {
	if (!posts.length) {
		return <h3>No Comments Yet</h3>;
	}

	return (
		<div>
			<h3>{title}</h3>
			{posts.map((post) => (
				<div key={post._id} className="card mb-3">
					<h4 className="card-header bg-primary text-light p-2 m-0">
						{post.author.username} <br />
						<span style={{ fontSize: '1rem' }}>
							Created on {post.createdAt}
						</span>
					</h4>
					<div className="card-body bg-light p-2">
						<p>{post.content}</p>
					</div>
					<Link
						className="btn btn-primary btn-block btn-squared"
						to={`/blogPost/${post._id}`}
					>
						Join the discussion on this post.
					</Link>
				</div>
			))}
		</div>
	);
}

export default BlogPostList; // Export BlogPostList component
