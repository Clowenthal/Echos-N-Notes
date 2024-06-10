// server/schema/typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		blogPosts: [BlogPost]!
	}

	type BlogPost {
		_id: ID
		title: String
		content: String
		author: User
		createdAt: String
		comments: [Comment]!
	}

	type Comment {
		_id: ID
		commentText: String
		commentAuthor: String
		createdAt: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		user(username: String!): User
		blogPosts(username: String): [BlogPost]
		blogPost(blogPostId: ID!): BlogPost
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		addBlogPost(title: String!, content: String!): BlogPost
		addComment(
			blogPostId: ID!
			commentText: String!
			commentAuthor: String!
		): BlogPost
		removeBlogPost(blogPostId: ID!): BlogPost
		removeComment(blogPostId: ID!, commentId: ID!): BlogPost
	}
`;

module.exports = typeDefs;