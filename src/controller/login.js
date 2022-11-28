const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const methods = {
    async login(req, res, next) {
        try {
            const {  email, password} = req.body;
            //check email
            const user = await User.findOne({ email: email });
            if (!user) { return res.status(400).json({ msg: 'user does not exist' }); }
            //check password
            const match = bcrypt.compare(password, user.password);
            if (!match) return res.status(400).json({ msg: 'password incorrect' });
            //succuss login
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY_USER);
            delete user.password;
            res.status(200).json({ token, user });

        } catch (error) {
            res.status(500).json({ error: error.message });
            // console.log(error.status, error.message);
        }
    },
}

module.exports = { ...methods }