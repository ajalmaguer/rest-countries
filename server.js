const express = require('express');
const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// setup
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());


// routes
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



// handle errors
app.use(function (err, req, res, next) {
    console.log('err =', err);
    res.status(404).send('not found');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`);
});
