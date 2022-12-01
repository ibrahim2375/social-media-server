//models
const User = require('../../../../models/User');
const Post = require('../../../../models/Post');
const express = require('express');
const router = express.Router();
const multer = require('multer');

//file sorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

//?://////////////////////////////////WRITE///////////////////////////////
//create a new post
router.post('/', upload.single('picture'), async (req, res, next) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);

        //file
        const file = req.file;
        if (!file) {
            const newPost = new Post({
                userId,
                firstname: user.firstname,
                lastname: user.lastname,
                location: user.location,
                description,
                userPicturePath: user.picturePath,
                picturePath: null,
                likes: {},
                comments: [],
            })
            await newPost.save();
            const post = await Post.find().sort({ createdAt: -1 });
            res.status(201).json(post);
        } else {
            const newPost = new Post({
                userId,
                firstname: user.firstname,
                lastname: user.lastname,
                location: user.location,
                description,
                userPicturePath: user.picturePath,
                picturePath: file.filename,
                likes: {},
                comments: [],
            })
            await newPost.save();
            const post = await Post.find().sort({ createdAt: -1 });;
            res.status(201).json(post);
        }


    } catch (e) {
        return res.status(404).json({ msg: e.message });
    }

})

module.exports = router;