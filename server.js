const express = require('express');
const router = require('./routes/index')
require('dotenv').config()

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 5456;


app.use('/', router)


app.listen(port, host, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app;