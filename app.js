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
        if (err) {
            res.send(err);
        } else {
            res.send(foundArticles);
        }
    });
});

app.post("/articles", (req, res) => {
    // console.log(req.body.title);
    // console.log(req.body.content);
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Succesfully added to the database");
        }
    });
});

app.delete("/articles", (req, res) => {
    Article.deleteMany((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send("Successfully Deleted all the articles");
        }
    })
})

app.listen(3000, () => { console.log('Server started on Port Number 3000') });