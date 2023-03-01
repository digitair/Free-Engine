const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeCodementorData = (req, res, next) => {
  const baseSelector = 'html > body > div > div > main > section > div:nth-child(2) > div:nth-child';

  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > a > b`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(3)`).html();
  }
  const getText = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(4)`).html();
  }
  const getStacks = ($, i) => {
    const stacks = []
    for (let j = 0; j < $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(5) > a`).length; j++) {
      stacks.push($(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(5) > a:nth-child(${j+1})`).html());
    }
    return stacks
  }
  const getLink = ($, i) => {
    const hrefSelector = `${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > a`;
    return $(hrefSelector).attr('href')
  }
  const getImage = ($, i) => {
    const srcSelector = `${baseSelector}(${i+1}) > div:nth-child(1) > div > div > img`
    return $(srcSelector).attr('src')
  }
  const getRating = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1) > b`).html();
  }

  async function scrapeData() {
    let argument = decodeURIComponent(req.query.argument)
    let formatedArgument = argument.replaceAll(" ", "-")
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY_JS}&url=https%3A%2F%2Fwww.codementor.io%2Ffreelance%2F${formatedArgument}`);
    let $ = cheerio.load(html);
    let data = []

    for ( let i = 0; i < $('html > body > div > div > main > section > div:nth-child(2) > div').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getName($, i), 
          getDescription($, i),
          // getText($, i),
          getStacks($, i),
          getLink($, i), 
          getImage($, i), 
          getRating($, i),
        ]
      )
      data.push(childrenData);
    }
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}