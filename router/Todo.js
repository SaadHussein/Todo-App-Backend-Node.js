const express = require('express');
const TodoRouter = express.Router();
const { createTodo, getTodo, getTodos, updateTodo, makeTodoCompletedOrNot, deleteTodo } = require('../controller/Todo');

TodoRouter.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello, Welcome to Todo Backend."
    });
});

TodoRouter.post('/createTodo', createTodo);
TodoRouter.get('/getTodo/:id', getTodo);
TodoRouter.get('/getTodos', getTodos);
TodoRouter.put('/:id/updateTodo', updateTodo);
TodoRouter.get('/:id/makeTodoCompletedOrNot', makeTodoCompletedOrNot);
TodoRouter.delete('/deleteTodo/:id', deleteTodo);

module.exports = TodoRouter;