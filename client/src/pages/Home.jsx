import React from 'react';  // Import React
import BlogPostList from '../components/BlogPostList/index';  // Import BlogPostList component

function Home() {
  return (
    <div>
      <h1>Welcome to Echos-N-Notes</h1>
      <BlogPostList />  // Render BlogPostList component
    </div>
  );
}

export default Home;  // Export Home component
