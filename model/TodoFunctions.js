const TodoSchema = require('./Todo');

async function createTodoToDatabase(data) {
    if (!data.title || data.title === '') {
        return {
            message: "Fields Required"
        };
    }

    const newTodo = new TodoSchema({
        title: data.title,
        description: data.description,
        completed: false,
    });

    console.log(newTodo);

    await newTodo.save();

    return {
        message: 'Created Successfully',
        todo: newTodo
    };
}

async function getTodoFromDatabase(TodoID) {
    const Todo = await TodoSchema.findById(TodoID);

    if (!Todo) {
        return {
            message: "Todo Not Found."
        };
    } else {
        return {
            messgae: "Todo Found.",
            Todo: Todo,
        };
    }
}

async function getTodosFromDatabase() {
    const data = await TodoSchema.find();

    if (data.length === 0) {
        return {
            message: "Not Todos yet, Add your First Todo."
        };
    } else {
        return {
            message: "There are your Todos.",
            Todos: data
        };
    }
}

async function updateTodoInDatabase(data, TodoID) {
    try {
        const Todo = await TodoSchema.findOneAndUpdate({ _id: TodoID }, {
            $set: {
                title: data.title,
                description: data.description,
                completed: data.completed,
            }
        },
            { new: true });

        return {
            message: "Updated Successfully.",
            Todo
        };
    } catch (err) {
        return {
            message: "Error Happened."
        };
    }
}

async function makeTodoCompletedOrNotInDatabase(TodoID) {
    try {
        const Todo = await TodoSchema.findById(TodoID);

        Todo.completed = !Todo.completed;

        await Todo.save();

        return {
            message: "Updated Successfully.",
            Todo
        };

    } catch (err) {
        return {
            message: "Error Happened."
        };
    }
}

async function deleteTodoFromDatabase(TodoID) {
    const deletedTodo = await TodoSchema.findById(TodoID);

    console.log(deletedTodo);

    if (!deletedTodo) {
        return {
            message: "Error Happened."
        };
    } else {
        await TodoSchema.deleteOne({ _id: TodoID });

        return {
            message: 'Todo Deleted.'
        };
    }
}

module.exports = {
    createTodoToDatabase,
    getTodoFromDatabase,
    getTodosFromDatabase,
    updateTodoInDatabase,
    makeTodoCompletedOrNotInDatabase,
    deleteTodoFromDatabase
};