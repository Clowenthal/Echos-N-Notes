import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BLOG_POST } from '../../utils/mutations';
import { GET_BLOG_POSTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const BlogPostForm = () => {
	const [blogPostTitle, setBlogPostTitle] = useState('');
	const [blogPostText, setBlogPostText] = useState('');

	const [addBlogPost, { error }] = useMutation(ADD_BLOG_POST, {
		refetchQueries: [GET_BLOG_POSTS, 'getBlogPosts'],
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await addBlogPost({
				variables: {
					title: blogPostTitle,
					content: blogPostText,
				},
			});

			setBlogPostTitle('');
			setBlogPostText('');
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === 'blogPostTitle') {
			setBlogPostTitle(value);
		} else {
			setBlogPostText(value);
		}
	};

	return (
		<div>
			<h3>Enter a new post:</h3>

			{Auth.loggedIn() ? (
				<form className="align-center" onSubmit={handleFormSubmit}>
					<div className="col-12">
						<input
							name="blogPostTitle"
							placeholder="Enter a post title here"
							value={blogPostTitle}
							className="form-input w-100"
							style={{ lineHeight: '1.5', resize: 'vertical' }}
							onChange={handleChange}
						></input>
					</div>
					<div className="col-12">
						<textarea
							name="blogPostText"
							placeholder="Enter your valuable content here..."
							value={blogPostText}
							className="form-input w-100"
							style={{ lineHeight: '1.5', resize: 'vertical' }}
							onChange={handleChange}
						></textarea>
					</div>

					<div className="col-12">
						<button className="btn btn-primary btn-block py-3" type="submit">
							Add Post
						</button>
					</div>
					{error && (
						<div className="col-12 my-3 bg-danger text-white p-3">
							{error.message}
						</div>
					)}
				</form>
			) : (
				<p>
					You need to be logged in to add a post. Please{' '}
					<Link to="/login">login</Link> or{' '}
					<Link to="/register">register.</Link>
				</p>
			)}
		</div>
	);
};

export default BlogPostForm;
