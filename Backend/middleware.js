const jwt = require('jsonwebtoken');
const { secret } = require('./config');

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization');

    if (!token) return res.sendStatus(403);

    try {
        const user = jwt.verify(token, secret);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('Invalid Token');
    }
}

module.exports = { authenticateJWT };
