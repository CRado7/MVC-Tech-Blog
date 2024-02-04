const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

router.get('/', (req, res) => {
    Blog.findAll({
        attributes: ['id', 'title', 'post', 'date'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'date'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbBlogData => res.json(dbBlogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post', 'date'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'date'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No blog found with this id' });
                return;
            }
            res.json(dbBlogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.status(403).json({ message: 'You are not authorized to create a blog. Please Login.' });
        return;
    }

    Blog.create({
        title: req.body.title,
        post: req.body.post,
        user_id: req.session.user_id
    })
        .then(dbBlogData => res.json(dbBlogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.status(403).json({ message: 'You are not authorized to update this blog. Please Login.' });
        return;
    }

    Blog.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No blog found with this id. Please Login.' });
                return;
            }
            res.json(dbBlogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.status(403).json({ message: 'You are not authorized to delete this blog' });
        return;
    }

    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No blog found with this id' });
                return;
            }
            res.json(dbBlogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;