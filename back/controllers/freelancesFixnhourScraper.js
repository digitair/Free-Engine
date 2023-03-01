const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeFixnhourData = (req, res, next) => {
  const baseSelector = 'div.fw-card:nth-child';

  const getPrice = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > ul:nth-child(3) > li:nth-child(1)`).html();
  }
  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(1) > 
      div:nth-child(1) > a:nth-child(1)`
    ).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(2)`).html();
  }
  const getDescriptionDetails = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(3) > div:nth-child(1) > p:nth-child(1)`).html()
  }
  const getLink = ($, i) => {
    const hrefSelector = `${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(1) a[href]`;
    return $(hrefSelector).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getCity = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > ul:nth-child(3) > li:nth-child(3)`).html();
  }
  
  async function scrapeData() {
    let argument = decodeURIComponent(req.query.argument)
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY_JS}&url=https%3A%2F%2Fwww.fixnhour.com%2Ftalent%2Ffind-talent%2F${argument}`);
    let $ = cheerio.load(html);
    let data = []

    for ( let i = 0; i < $('div.fw-card').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getPrice($, i), 
          getName($, i), 
          getDescription($, i),
          getDescriptionDetails($, i), 
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