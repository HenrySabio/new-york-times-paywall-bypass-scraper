const axios = require('axios');
const cheerio = require('cheerio');

const testURL = "Enter url of NYT article you want to scrape";

axios.get(testURL).then((res) => {
    const $ = cheerio.load(res.data);
    console.log($("#site-content").find("h1").text());
  });
