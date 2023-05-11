const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');


authRouter.post('/login', async (req, res) => {
    let { username, password } = req.body
    if (username !== 'admin' && password !== 'admin') {
        return res.status(400).send('Incorrect Username or password')
    }
    else {
        const token = await jwt.sign({ name: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
        res.json({ "token": token })
    }

})


module.exports = authRouter;
