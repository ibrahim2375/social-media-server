const User = require('../../../models/User');
const express = require('express');
const router = express.Router();
//authenticate user
const authenticate = require('../../../middleware/authenticate');

//get user
router.get('/:id', async (req, res, next) => {
    try {
        await User.findById(req.params.id).then((user) => {
            if (!user) {
                return res.status(403).json({ msg: 'user does not exist' });
            } else {

                return res.status(200).json(user);
            }
        }).catch((e) => {
            return res.status(403).json({ msg: e.message });
        });

    } catch (e) {
        return res.status(404).json({ msg: e.message });
    }

});

//get user friends info
router.get('/:id/friends', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(({ _id, firstname, lastname, location, occupation, picturePath }) => {
            return { _id, firstname, lastname, location, occupation, picturePath };
        });
        res.status(200).json(formattedFriends);

    } catch (e) {
        return res.status(404).json({ msg: e.message });
    }

});
//add remove friend
router.get('/:id/:friendId', async (req, res, next) => {
    try {
        const { id, friendId } = req.params;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // check if friend id is exist or not
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        //return data to front end

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(({ _id, firstname, lastname, location, occupation, picturePath }) => {
            return { _id, firstname, lastname, location, occupation, picturePath };
        });

        res.status(200).json(formattedFriends);

    } catch (e) {
        return res.status(404).json({ msg: e.message });
    }

});

module.exports = router;