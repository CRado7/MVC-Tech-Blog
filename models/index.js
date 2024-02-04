const User = require('./user');
const Comment = require('./comment');
const Blog = require('./blog');

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = { User, Blog, Comment};