const axios = require('axios');
const cheerio = require('cheerio');

let articleLink = "";
const article = new Object();

axios.get(articleLink).then((res) => {
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
