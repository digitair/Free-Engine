const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeLehibouData = (req, res, next) => {
  const baseSelector = 'html > body > main > div:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li:nth-child';

  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(3) > 
      div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h3`
    ).text()
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(3) > 
      div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > 
      a:nth-child(3) > highlight-element:nth-child(1) > div:nth-child(1) > span:nth-child(1)`
    ).text();
  }
  const getLink = ($, i) => {
    const hrefSelector = `${baseSelector}(${i+1}) > a`;
    return $(hrefSelector).attr('href')
  }
  const getImage = ($, i) => {
    const srcSelector = `${baseSelector}(${i+1}) > div:nth-child(3) > 
      div:nth-child(1) > img`
    return $(srcSelector).attr('src')
  }
  const getCity = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(3) > 
      div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(4)`
    ).text();
  }
  
  async function scrapeData() {
    let argument = decodeURIComponent(req.query.argument)
    let formatedArgument = argument.replaceAll(" ", "+")
    let encodedArgument = encodeURI(formatedArgument)
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY_JS}&url=https%3A%2F%2Fwww.lehibou.com%2Frecherche%3Fage_max%3D100%26age_min%3D0%26availability%3Dfalse%26availabilityMonth%3Dfalse%26city%3D%26country%3DFrance%26keyword%3D${encodedArgument}%26langue%3D%26latitude%3D%26longitude%3D%26price_max%3D100000%26price_min%3D0%26relocation%3Dtrue`);
    let $ = cheerio.load(html);
    let data = []

    for ( let i = 0; i < $('html > body > main > div:nth-child(2) > div:nth-child(2) > ul:nth-child(1) > li').length; i++) {
      if ( i === 2) {
        continue
      }
      let childrenData = [];
      childrenData.push(
        ...[
          getName($, i), 
          getDescription($, i),
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