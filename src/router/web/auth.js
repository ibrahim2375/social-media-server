const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth_controller = require('../../controller/auth');

//file sorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "-" + file.originalname );
    }
});

const upload = multer({ storage });

router.post('/', upload.single("picture"), auth_controller.auth);

module.exports = router;