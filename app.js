const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model('Article', articleSchema);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/articles", (req, res) => {
    Article.find((err, foundArticles) => {
        res.send(foundArticles);
    });
});

app.listen(3000, () => { console.log('Server started on Port Number 3000') });