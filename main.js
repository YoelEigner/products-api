const express = require('express');
const app = express();
const router = require("./routes/router");
require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');

const port = 3000;
const loginPort = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth/", authRouter);
app.use("/api/", router);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/api`);
})
app.listen(loginPort, () => {
    console.log(`Server listening at http://localhost:/${loginPort}/api/auth`);
})