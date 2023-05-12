const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUser } = require('../SQLFunctions/queries');


authRouter.post('/login', async (req, res) => {
    let { username, password } = req.body
    let user = await getUser(username, password)
    if (user === undefined) {
        return res.status(400).send('Incorrect Username or password')
    }
    else {
        const token = await jwt.sign({ name: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
        res.json({ "token": token, username: user.username, password: user.password, timestamp: user.timestamp })
    }

})


module.exports = authRouter;
