const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    //load index page
    res.render('index');
});

// default URL for website
app.post('/article', function (req, res) {
    let article = new Object();
    const request = req.body.url;

    axios.get(request, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        },
    })
        .then(response => {
            const $ = cheerio.load(response.data);
            article.url = request;
            article.title = $('#site-content')
                .find('h1')
                .text();
            article.heroImg = $('[data-testid="photoviewer-children"] picture')
                .find('img')
                .attr('src');
            article.summary = $('#site-content')
                .find('#article-summary')
                .text();
            article.singleAuthor = $('#site-content')
                .find('span.last-byline')
                .text();
            article.authorPicture = $(`img[title="${article.singleAuthor}"]`).attr('src');

            article.writeDate = []
            $(`time`)
                .find('span')
                .each(function (i, el) {
                    article.writeDate[i] = $(this).text();
                });

            article.content = []
            $(`section[name = articleBody]`)
                .find("p")
                .each(function (i, el) {
                    article.content[i] = $(this).text();
                });

            res.render('article', { article });
        })
        //catch axios error
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});