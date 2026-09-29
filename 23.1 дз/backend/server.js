const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todo_db')
    .then(() => {
        console.log('MongoDB підключено');
    })
    .catch((error) => {
        console.log('Помилка MongoDB:', error);
    });

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            completed: false
        });

        const savedTodo = await todo.save();

        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: 'Не вдалося створити завдання' });
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Завдання не знайдено' });
        }

        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: 'Не вдалося оновити завдання' });
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Завдання не знайдено' });
        }

        res.json({ message: 'Завдання видалено' });
    } catch (error) {
        res.status(400).json({ message: 'Не вдалося видалити завдання' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});