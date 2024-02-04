const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const user = [
    {
        username: 'john_doe',
        password: 'password'
    },
    {
        username: 'jane_doe',
        password: 'password123'
    },
    {
        username: 'jim_doe',
        password: 'password456'
    },
]

const blog = [
    {
        title: 'First Blog',
        post: 'This is the first blog post',
        user_id: 1
    },
    {
        title: 'Second Blog',
        post: 'This is the second blog post',
        user_id: 2
    },
    {
        title: 'Third Blog',
        post: 'This is the third blog post',
        user_id: 3
    },
]