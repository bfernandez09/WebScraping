const express = require('express');
const { openWebPage } = require('./index.js');

const app = express();

app.get('/', (req, res) => {
    openWebPage();
    res.send('Hello World!');
    }
);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    }
);

