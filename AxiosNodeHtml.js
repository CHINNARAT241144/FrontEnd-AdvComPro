const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser'); 

const base_url = "http://localhost:3000"

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));


app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books'); // แก้ไข URL
        res.render("books", { books: response.data }); // สมมติว่าเราจะเรนเดอร์รายชื่อหนังสือที่หน้าแรก
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.get("/books/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("books", { book: response.data }); // ใช้ชื่อให้สอดคล้อง
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author };
        await axios.post(base_url + '/books', data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("update", { book: response.data }); // ใช้ชื่อให้สอดคล้อง
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.post("/update/:id", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author };
        await axios.put(base_url + '/books/' + req.params.id, data); // แก้ไข URL
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/books/' + req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.listen(5500, () => {
    console.log('Server started on port 5500');
});
