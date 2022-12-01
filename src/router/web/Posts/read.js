//models
const User = require('../../../../models/User');
const Post = require('../../../../models/Post');
const express = require('express');
const router = express.Router();

//?://///////////////////////////////READ///////////////////////////////
// get all posts
router.get('/', async (req, res, next) => {
    await Post.find().sort({ createdAt: -1 }).then((result) => {
        if (!result) {
            res.status(200).json({ msg: "there is no posts" });
        }
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err)

    });
});

//get user posts 
router.get('/:userId', async (req, res, next) => {
    const userPosts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    if (userPosts.length == 0) {
        return res.status(200).json({ msg: "no posts yet" });
    }
    res.status(200).json(userPosts);
});

module.exports = router;