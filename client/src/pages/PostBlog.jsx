// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import BlogPostList from '../components/BlogPostList/index';
import BlogPostDetails from '../components/BlogPostDetails/index';
import { GET_POST_BLOG } from '../utils/queries';

const BlogPost = () => {
	const { blogPostId } = useParams();
	const { loading, data } = useQuery(GET_POST_BLOG, {
		variables: { blogPostId: blogPostId },
	});

	const blogPost = data?.blogPost || {};
	console.log('blogPost', blogPost);
	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="my-3">
			<h3 className="card-header bg-dark text-light p-2 m-0">
				{blogPost.title} <br />
				<span style={{ fontSize: '1rem' }}>
					Wanted to share this Blog Post {blogPost.createdAt}
				</span>
			</h3>
			<div className="bg-light py-4">
				<blockquote
					className="p-4"
					style={{
						fontSize: '1.5rem',
						fontStyle: 'italic',
						border: '2px dotted #1a1a1a',
						lineHeight: '1.5',
					}}
				>
					{blogPost.content}
				</blockquote>
			</div>

			{/* <div className="my-5">
				<BlogPostList comments={blogPost.comments} />
			</div> */}
			<div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
				<BlogPostDetails comments={blogPost.comments} />
			</div>
		</div>
	);
};

export default BlogPost; // Export BlogPost component
