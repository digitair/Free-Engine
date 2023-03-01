const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeTruelancerData = (req, res, next) => {
  const baseSelector = 'html > body > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child';
  const getPrice = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(3) > 
      div > div:nth-child(1) > div > p`).html();
  }  
  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(1) > div > h3 > a`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(3) > p:nth-child(1)`).html();
  }
  const getStacks = ($, i) => {
    const stacks = []
    for (let j = 0; j < $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(4) > div > a`).length; j++) {
      stacks.push($(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(4) > div > a:nth-child(${j+1}) > span:nth-child(1)`).html());
    }
    return stacks
  }
  const getLink = ($, i) => {
    const hrefSelector = `${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(1) > div > h3 > a`;
    return $(hrefSelector).attr('href')
  }
  const getImage = ($, i) => {
    const srcSelector = `${baseSelector}(${i+1}) > div:nth-child(1) > div > div > span > div > span > img`
    return $(srcSelector).attr('src')
  }
  const getCity = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(2) > div:nth-child(2) > div > p > a`).html();
  }

  async function scrapeData() {
    let argument = decodeURIComponent(req.query.argument)
    let formatedArgument = argument.replaceAll(" ", "+")
    let encodedArgument = encodeURI(formatedArgument)
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fwww.truelancer.com%2Ffreelancers%3Fpage%3D1%26q%3D${encodedArgument}`);
    let $ = cheerio.load(html);
    let data = []

    for ( let i = 0; i < $('html > body > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getPrice($, i),
          getName($, i), 
          getDescription($, i),
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