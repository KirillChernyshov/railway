const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const userRouter = require('./routers/user.js');
const trainRouter = require('./routers/train.js');
const carriageRouter = require('./routers/carriage.js');
const compositionRouter = require('./routers/composition.js');
const stationRouter = require('./routers/station.js');
const routeRouter = require('./routers/route.js');

const port = 5000;
const app = express();

//app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
app.use(userRouter);
app.use(trainRouter);
app.use(carriageRouter);
app.use(compositionRouter);
app.use(stationRouter);
app.use(routeRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
