const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUser, deleteUser } = require('../SQLFunctions/queries');


authRouter.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await getUser(username, password)
        if (user) {
            const token = await jwt.sign({ name: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
            res.json({ "token": token, username: user.username, password: user.password, timestamp: user.timestamp })
        }
        else {
            return res.status(400).send('Incorrect Username or password')
        }
    } catch (error) {
        res.json(500)
    }

})
authRouter.get('/get-user', async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await getUser(username, password)
        if (user) {
            res.json({ username: user.username, password: user.password, timestamp: user.timestamp })
        }
        else {
            return res.status(400).send('Incorrect Username or password')
        }
    } catch (error) {
        res.json(500)
    }

})

authRouter.delete('/delete-user', async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await getUser(username, password)
        if (user) {
            let user = await deleteUser(username, password)
            if (user === 1) {
                res.json(`${username} delete successfully`)
            }
            else {
                res.json(`Error deleting user`)
            }
        }
        else {
            return res.status(400).send('Incorrect Username or password')
        }
    } catch (error) {
        res.json(500)
    }

})


module.exports = authRouter;
