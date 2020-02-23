const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/user.js');

const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
