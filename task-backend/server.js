const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// 数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'task_crud',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// 添加任务
app.post('/tasks', (req, res) => {
    const { title, assignee, description } = req.body;
    const sql = 'INSERT INTO tasks (title, assignee, description) VALUES (?, ?, ?)';
    db.query(sql, [title, assignee, description], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id: result.insertId, title, assignee, description });
    });
});

// 获取所有任务
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// 更新任务
app.put('/tasks/:id', (req, res) => {
    const { title, assignee, description } = req.body;
    const sql = 'UPDATE tasks SET title = ?, assignee = ?, description = ? WHERE id = ?';
    db.query(sql, [title, assignee, description, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Task updated successfully' });
    });
});

// 删除任务
app.delete('/tasks/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Task deleted successfully' });
    });
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
