const express = require('express');
const morgan = require('morgan');

require('./db/mongoose');
const userRoute = require('./util/userRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(userRoute);

app.listen(port, () => {
    console.log('Server up and running on port: ' + port);
})

