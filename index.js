const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// สร้างการเชื่อมต่อกับ MySQL โดยใช้ข้อมูลจาก URL ที่ให้มา
const db = mysql.createConnection({
    host: 'autorack.proxy.rlwy.net',
    user: 'root',
    password: 'HAzitlVOOwwhBjUlHganJkhWeCGmqoxP',
    database: 'railway',
    port: 31267
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// CRUD สำหรับตาราง Customers

// อ่านข้อมูลลูกค้าทั้งหมด
app.get('/customers', (req, res) => {
    const sql = 'SELECT * FROM customers';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// อ่านข้อมูลลูกค้าตาม id
app.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM customers WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// เพิ่มข้อมูลลูกค้าใหม่
app.post('/customers', (req, res) => {
    const { firstname, lastName, email } = req.body;
    const sql = 'INSERT INTO customers (firstname, lastName, email) VALUES (?, ?, ?)';
    db.query(sql, [firstname, lastName, email], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Customer added', id: result.insertId });
    });
});

// แก้ไขข้อมูลลูกค้าตาม id
app.put('/customers/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastName, email } = req.body;
    const sql = 'UPDATE customers SET firstname = ?, lastName = ?, email = ? WHERE id = ?';
    db.query(sql, [firstname, lastName, email, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Customer updated' });
    });
});

// ลบข้อมูลลูกค้าตาม id
app.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM customers WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Customer deleted' });
    });
});

// CRUD สำหรับตาราง Books

// อ่านข้อมูลหนังสือทั้งหมด
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// อ่านข้อมูลหนังสือตาม id
app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM books WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// เพิ่มข้อมูลหนังสือใหม่
app.post('/books', (req, res) => {
    const { bookName, bookAuthor, bookDescription } = req.body;
    const sql = 'INSERT INTO books (bookName, bookAuthor, bookDescription) VALUES (?, ?, ?)';
    db.query(sql, [bookName, bookAuthor, bookDescription], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Book added', id: result.insertId });
    });
});

// แก้ไขข้อมูลหนังสือตาม id
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { bookName, bookAuthor, bookDescription } = req.body;
    const sql = 'UPDATE books SET bookName = ?, bookAuthor = ?, bookDescription = ? WHERE id = ?';
    db.query(sql, [bookName, bookAuthor, bookDescription, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Book updated' });
    });
});

// ลบข้อมูลหนังสือตาม id
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM books WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Book deleted' });
    });
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
