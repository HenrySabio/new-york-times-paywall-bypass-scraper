const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.static("express"));

// default URL for website
app.use('/', function (req, res) {
    //__dirname : It will resolve to your project folder.
    console.log(req.body);
    console.log(req.body.test);
    const request = req.body.test;
    const article = new Object();


    axios.get(request).then((res) => {
        const $ = cheerio.load(res.data);
        article.title = $("#site-content").find("h1").text();
        article.articlePicture = $("picture").find("source").attr("srcset");
        article.summary = $("#site-content").find("#article-summary").text();
        article.multiAuthors = $("#site-content").find(".css-4z5zii").text();
        article.singleAuthor = $("#site-content").find(".last-byline").text();
        article.authorPicture = $(`img[title="${article.singleAuthor}"]`).attr("src");

        article.writeDate = []
        $(`time`).find("span").each(function (i, el) {
            article.writeDate[i] = $(this).text();
        });

        article.content = []
        $(`section[name = articleBody]`).find("p").each(function (i, el) {
            article.content[i] = $(this).html();
        });

        console.log(article);
    });
});


const server = http.createServer(app);
const port = 3000;

server.listen(port);
console.debug('Server listening on port ' + port);