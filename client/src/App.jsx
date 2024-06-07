import React from 'react';  // Import React
import { Route, Switch } from 'react-router-dom';  // Import Route and Switch components from React Router
import Navbar from './components/Navbar/index';  // Import Navbar component
import Home from './pages/Home';  // Import Home page component
import BlogPost from './pages/BlogPost';  // Import BlogPost page component
import Login from './pages/Login';  // Import Login page component
import Register from './pages/Register';  // Import Register page component
import ErrorPage from './pages/ErrorPage';  // Import ErrorPage component
import Footer from './components/Footer/index';  // Import Footer component

function App() {
  return (
    <div className="App">
      <Navbar />  // Render Navbar component
      <Switch>
        <Route exact path="/" component={Home} />  // Route for Home page
        <Route path="/post/:id" component={BlogPost} />  // Route for BlogPost page
        <Route path="/login" component={Login} />  // Route for Login page
        <Route path="/register" component={Register} />  // Route for Register page
        <Route component={ErrorPage} />  // Route for any other path to show ErrorPage
      </Switch>
      <Footer />  // Render Footer component
    </div>
  );
}

export default App;  // Export App component

