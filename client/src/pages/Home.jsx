import { Link } from 'react-router-dom';
import BlogPostList from '../components/BlogPostList/index'; // Import BlogPostList component
import BlogPostForm from '../components/BlogPostForm/index';
import { GET_BLOG_POSTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

const Home = () => {
	const { loading, data } = useQuery(GET_BLOG_POSTS);
	const posts = data?.blogPosts || [];

	return (
		<main>
			<div className="flex-row justify-center">
				<div
					className="col-12 col-md-10 mb-3 p-3"
					style={{ border: '1px dotted #1a1a1a' }}
				>
					{Auth.loggedIn() ? (
						<BlogPostForm />
					) : (
						<>
							<h3>Welcome!</h3>
							<h5>
								Please <Link to="/login">login</Link> or{' '}
								<Link to="/register">register.</Link>
							</h5>
						</>
					)}
				</div>
				<div className="col-12 col-md-8 mb-3">
					{loading ? (
						<div>Loading...</div>
					) : (
						<BlogPostList posts={posts} title="Browse Blog Post(s)..." />
					)}
				</div>
			</div>
		</main>
	);
};

export default Home; // Export Home component