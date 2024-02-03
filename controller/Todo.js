const { createTodoToDatabase, getTodoFromDatabase, getTodosFromDatabase, updateTodoInDatabase, deleteTodoFromDatabase, makeTodoCompletedOrNotInDatabase } = require('../model/TodoFunctions');

async function createTodo(req, res) {
    const data = req.body;
    console.log(data);
    const response = await createTodoToDatabase(data);

    if (response.message === 'Fields Required') {
        return res.status(400).json({
            message: response.message,
        });
    } else {
        return res.status(200).json({
            message: response.message,
            todo: response.todo
        });
    }
}

async function getTodo(req, res) {
    const id = req.params.id;
    console.log(id);
    const response = await getTodoFromDatabase(id);

    if (response.message === "Todo Not Found.") {
        return res.status(400).json(response);
    } else {
        return res.status(200).json(response);
    }
}

async function getTodos(req, res) {
    const response = await getTodosFromDatabase();
    if (response.message === "Not Todos yet, Add your First Todo.") {
        return res.status(400).json(response);
    } else {
        return res.status(200).json(response);
    }
}

async function updateTodo(req, res) {
    const data = req.body;
    const id = req.params.id;

    const response = await updateTodoInDatabase(data, id);
    if (response.message === "Error Happened.") {
        return res.status(400).json(response);
    } else {
        return res.status(200).json(response);
    }
}

async function makeTodoCompletedOrNot(req, res) {
    const id = req.params.id;
    const response = await makeTodoCompletedOrNotInDatabase(id);

    if (response.message === 'Error Happened.') {
        return res.status(400).json(response);
    } else {
        return res.status(200).json(response);
    }
}

async function deleteTodo(req, res) {
    const id = req.params.id;
    const response = await deleteTodoFromDatabase(id);

    if (response.message === 'Error Happened.') {
        return res.status(400).json(response);
    } else {
        return res.status(200).json(response);
    }
}

module.exports = {
    createTodo,
    getTodo,
    getTodos,
    updateTodo,
    makeTodoCompletedOrNot,
    deleteTodo
};