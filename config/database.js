const mongoose = require('mongoose');

const connect_to_db = () => {
    mongoose.connect(process.env.MONGOOSE_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('db connected successfully');
    }).catch(err => {
        console.log(err.message);
    })
}

module.exports = connect_to_db;