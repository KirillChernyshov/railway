const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const userRouter = require('./routers/user.js');
const trainRouter = require('./routers/train.js');

const port = 5000;
const app = express();

//app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
app.use(userRouter);
app.use(trainRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
