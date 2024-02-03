const express = require('express');
const cors = require('cors');
const TodoRouter = require('./router/Todo');

const app = express();

app.use(express.json());
app.use(cors());
app.use(TodoRouter);

module.exports = app;