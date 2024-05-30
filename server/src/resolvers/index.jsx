const userResolvers = require('./user');
const postResolvers = require('./post');
const commentResolvers = require('./comment');

const { mergeResolvers } = require('@graphql-tools/merge');

const resolvers = mergeResolvers([userResolvers, postResolvers, commentResolvers]);

module.exports = resolvers;
