const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const e = require('express');

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

// Routes targetting all the articles

app.route("/articles")
    .get((req, res) => {
        Article.find((err, foundArticles) => {
            if (err) {
                res.send(err);
            } else {
                res.send(foundArticles);
            }
        });
    })

    .post((req, res) => {
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
    })

    .delete((req, res) => {
        Article.deleteMany((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully Deleted all the articles");
            }
        });
    });

// Routes targetting a specific article

app.route("/articles/:articleTitle")
    .get((req, res) => {
        Article.findOne({ title: req.params.articleTitle }, (err, foundArticle) => {
            if (err) {
                res.send(err);
            } else {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("Nothing found");
                }
            }
        });
    })

    .put((req, res) => {
        Article.update({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content }, { overwrite: true }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully Updated the article");
            }
        });
    })

    .patch((req, res) => {
        Article.update({ title: req.params.articleTitle }, { $set: req.body }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully Updated the article");
            }
        });
    })

    .delete((req, res) => {
        Article.deleteOne({ title: req.params.articleTitle }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Successfully Deleted a single Article");
            }
        })
    });

app.listen(3000, () => { console.log('Server started on Port Number 3000') });