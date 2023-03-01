const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeArcdevData = (req, res, next) => {
  const baseSelector = 'div.sc-22c23639-0:nth-child';

  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > a:nth-child(2) > div:nth-child(1)`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(3)`).html();
  }
  const getText = ($, i) => {
    return $(`${baseSelector}(${i+1}) > p:nth-child(4)`).html();
  }
  const getStacks = ($, i) => {
    const stacks = []
    for (let j = 0; j < $(`${baseSelector}(${i+1}) > div:nth-child(5) > a`).length; j++) {
      stacks.push($(`${baseSelector}(${i+1}) > div:nth-child(5) > a:nth-child(${j+1})`).html());
    }
    return stacks
  }
  const getLink = ($, i) => {
    const hrefSelector = `${baseSelector}(${i+1}) > div:nth-child(1) > a:nth-child(2)`;
    return $(hrefSelector).attr('href')
  }
  const getImage = ($, i) => {
    const srcSelector = `${baseSelector}(${i+1}) > div:nth-child(1) > img:nth-child(1)`
    return $(srcSelector).attr('src')
  }
  const getCity = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > a:nth-child(2)`).html();
  }

  async function scrapeData() {
    let argument = decodeURIComponent(req.query.argument)
    let formatedArgument = argument.replaceAll(" ", "-")
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Farc.dev%2Fremote-freelance-developers%2Ffrance%2F${formatedArgument}`);
    let $ = cheerio.load(html);
    let data = []

    for ( let i = 0; i < $('div.sc-22c23639-0').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getName($, i), 
          getDescription($, i),
          getText($, i),
          getStacks($, i),
          getLink($, i), 
          getImage($, i), 
          getCity($, i),
        ]
      )
      data.push(childrenData);
    }
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}