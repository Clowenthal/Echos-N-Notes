import BlogPostList from '../components/BlogPostList/index';  // Import BlogPostList component
import BlogPostDetails from '../components/BlogPostDetails/index';
import { GET_BLOG_POSTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Home = () => {
  const { loading, data } = useQuery(GET_BLOG_POSTS);
  const posts = data?.getBlogPosts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <BlogPostDetails />
          </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BlogPostList 
              posts={posts}
              title="Browse Blog Post(s)..."
              />
          )}
          </div>
        </div>
      </main>
  );
};

export default Home;  // Export Home component
