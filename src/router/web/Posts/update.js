//models
const User = require('../../../../models/User');
const Post = require('../../../../models/Post');
const express = require('express');
const router = express.Router();

//?://///////////////////////////////UPDATE///////////////////////////////////
router.patch('/:id/like', async (req, res, next) => {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    const Liked = post.likes.get(userId);
    if (Liked) {
        post.likes.delete(userId);
    } else {
        post.likes.set(userId, true);
    }
    const updatePost = await Post.findByIdAndUpdate(req.params.id,
        { likes: post.likes },
        { new: true }
    );
    res.status(200).json(updatePost);
});
router.put('/:id/comment', async (req, res, next) => {
    const { userId, comment } = req.body;
    // const post = await Post.findById(req.params.id);
    // post.comments.push({ userId, comment })
    const updatePost = await Post.findByIdAndUpdate(req.params.id,
        { $push: { comments: { userId, comment } } },
        { new: true }
    );
    res.status(200).json(updatePost);
});

module.exports = router;