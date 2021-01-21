const axios = require('axios');
const cheerio = require('cheerio');

const testURL = "insert nyt article url here";

axios.get(testURL).then((res) => {
    const $ = cheerio.load(res.data);

    console.log("\n");
    console.log($("#site-content").find("h1").text());
    const articleTitle = $("#site-content").find("h1").text();

    console.log("\n");
    console.log($("#site-content").find("#article-summary").text());
    const articleSummary = $("#site-content").find("#article-summary").text();

    console.log("\n");
    console.log($("#site-content").find(".css-4z5zii").text())
    const articleAuthors = $("#site-content").find(".css-4z5zii").text();


    console.log("\n");
    console.log($("#site-content").find(".last-byline").text());
    const authorName = $("#site-content").find(".last-byline").text();

    console.log("\n");
    console.log($(`img[title="${authorName}"]`).attr("src"));
    const authorPicture = $(`img[title="${authorName}"]`).attr("src");

    console.log("\n");
    console.log($("li").find("time").text());

    console.log("\n");
    const articleSections = []
    $(`section[name = articleBody]`).find("p").each(function (i, el) {
        articleSections[i] = $(this).html();
    }); 

    console.log(articleSections);

    // console.log($(`section[name = articleBody]`).html());
    // const articleCopy = $(`section[name = articleBody]`).html();
    
    
  });
