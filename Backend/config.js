const mongoose = require('mongoose');

const uri = 'mongodb+srv://udaybhaskarmathangi:mX0W7b1UMwwUP6Ph@ub2002.carusdb.mongodb.net/?retryWrites=true&w=majority&appName=UB2002';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const secret = 'supersecretkey';

module.exports = { mongoose, secret };
