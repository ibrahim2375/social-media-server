//models
const User = require('../../../../models/User');
const Post = require('../../../../models/Post');
const express = require('express');
const router = express.Router();

//?://///////////////////////////////READ///////////////////////////////
// get all posts
router.get('/', async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json(posts);
});

//get user posts 
router.get('/:userId', async (req, res, next) => {
    const userPosts = await Post.find({ userId: req.params.userId });
    if (userPosts.length == 0) {
        return res.status(200).json({ msg: "no posts yet" });
    }
    res.status(200).json(userPosts);
});

module.exports = router;