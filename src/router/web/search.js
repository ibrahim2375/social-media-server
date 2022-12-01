const User = require('../../../models/User');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const search = req.body.search;
        await User.find({
            $or: [
                { firstname: { $regex: '.*' + search + '.*' } },
                { lastname: { $regex: '.*' + search + '.*' } },
            ]
        }).then((user) => {
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

module.exports = router;