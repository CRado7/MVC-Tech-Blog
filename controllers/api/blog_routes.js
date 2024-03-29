const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            attributes: ['id', 'title', 'post', 'date_created'],
            order: [['date_created', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    include: {
                        model: Comment,
                        attributes: ['comment', 'date_created'],
                        include: {
                            model: User,
                            attributes: ['username'],
                        },
                    },
                },
            ],
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            attributes: ['id', 'title', 'post', 'date_created'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    include: {
                        model: Comment,
                        attributes: ['comment', 'date_created'],
                        include: {
                            model: User,
                            attributes: ['username'],
                        },
                    },
                },
            ],
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData[0]) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;