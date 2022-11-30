const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const methods = {
    async auth(req, res, next) {
        try {
            const { firstname, lastname, email, password, picturePath, friends, location, occupation } = req.body;

            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            //file
            const file = req.file;

            const newUser = new User({
                firstname,
                lastname,
                email,
                password: hashPassword,
                picturePath: file.filename,
                friends,
                location,
                occupation,
                viewedProfile: Math.floor(Math.random() * 100),
                impressions: Math.floor(Math.random() * 100),
            });

            //save new user
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);

        } catch (error) {
            res.status(500).json({ error: "this user already exist" });
            console.log(error.status, error.message);
        }
    },
}

module.exports = { ...methods }