function BlogPostDetails({ comments }) {
	return (
		<div>
			<h3>Comments</h3>
			{comments.map((comment) => (
				<div key={comment._id}>
					<p>{comment.commentText}</p>
					<p>
						By: {comment.commentAuthor} on{' '}
						{new Date(comment.createdAt).toLocaleDateString()}
					</p>
				</div>
			))}
		</div>
	);
}

export default BlogPostDetails;