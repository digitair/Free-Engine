const rp = require('request-promise');
const cheerio = require('cheerio');

exports.scrapeFreelanceComData = (req, res, next) => {
  const baseSelector = 'a.w-full:nth-child';

  const getPrice = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(5) > span:nth-child(1) > span:nth-child(1)`).html();
  }
  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1)`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > span:nth-child(3)`).html();
  }
  const getLink = ($, i) => {
    return $(`${baseSelector}(${i+1})`).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getCity = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span:nth-child(2)`).html();
  }
  const getResultNumber = ($) => {
    return $(`.block`).html();
  }
  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fplateforme.freelance.com%2Fs%3Fq%3D${req.query.argument}`);
    let $ = cheerio.load(html);
    let data = []
    let resultNumber = getResultNumber($)

    for ( let i = 0; i < $('a.w-full').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getPrice($, i), 
          getName($, i), 
          getDescription($, i), 
          getLink($, i), 
          getImage($, i), 
          getCity($, i)
        ]
      )
      data.push(childrenData)
    }
    data.push(resultNumber)
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}

exports.scrapeFiverrData = (req, res, next) => {
  const baseSelector = 'div.gig-card-layout:nth-child';

  const getPrice = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > footer:nth-child(5) > a:nth-child(2) > span:nth-child(2)`).html();
  }
  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > h3:nth-child(3) > a:nth-child(1)`).html();
  }
  const getLink = ($, i) => {
    return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)`).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getResultNumber = ($) => {
    return $(`.m-r-4`).html();
  }
  
  async function scrapeData() {
    let encodedSearch = req.query.argument
    let reEncodeSearch = encodeURIComponent(encodedSearch)
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Ffr.fiverr.com%2Fsearch%2Fgigs%3Fquery%3D${reEncodeSearch}%26source%3Dtop-bar%26ref_ctx_id%3De485ce60aee4ba1447ace1bacd7bec2c%26search_in%3Deverywhere%26search-autocomplete-original-term%3D${reEncodeSearch}`);
    let $ = cheerio.load(html);
    let data = []
    let resultNumber = getResultNumber($)

    for ( let i = 0; i < $('div.gig-card-layout').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getPrice($, i), 
          getName($, i), 
          getDescription($, i), 
          getLink($, i), 
          getImage($, i), 
        ]
      )
      data.push(childrenData);
    }
    data.push(resultNumber)
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}

exports.scrapeMaltData = (req, res, next) => {
  const baseSelector = 'section.profile-card:nth-child';

  const getPrice = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(2) > 
      div:nth-child(1) > p:nth-child(1) > span:nth-child(1) > strong:nth-child(1)`).html();
  }
  const getName = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(1) > 
      div:nth-child(4) > p:nth-child(1)`).html();
  }
  const getDescription = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(2) > 
      div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1)`).html();
  }
  const getLink = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1)`).map((i, el) => $(el).attr('href')).get();
  }
  const getImage = ($, i) => {
    return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
  }
  const getCity = ($, i) => {
    return $(`${baseSelector}(${i+1}) > a:nth-child(1) > div:nth-child(1) > div:nth-child(4) > 
      div:nth-child(2) > div:nth-child(1) > p:nth-child(1) > span:nth-child(2)`).html();
  }
  const getResultNumber = ($) => {
    return $(`.search-header-query__title`).html();
  }
  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fwww.malt.fr%2Fs%3Fq%3D${req.query.argument}`);
    let $ = cheerio.load(html);
    let data = []
    let resultNumber = getResultNumber($)

    for ( let i = 0; i < $('section.profile-card').length; i++) {
      let childrenData = [];
      childrenData.push(
        ...[
          getPrice($, i), 
          getName($, i), 
          getDescription($, i), 
          getLink($, i), 
          getImage($, i), 
          getCity($, i),
        ]
      )
      data.push(childrenData);
    }
    data.push(resultNumber)
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}

exports.scrapeComeupData = (req, res, next) => {
  const baseSelector = 'ul.grid-listServices:nth-child';
  const childSelector = 'li:nth-child';

  const getPrice = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1) > 
      div:nth-child(2) > div:nth-child(3)`).html();
  }
  const getName = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1) > 
      div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > em:nth-child(2)`).html();
  }
  const getDescription = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1) > 
      div:nth-child(2) > a:nth-child(1)`).html();
  }
  const getLink = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1) > 
      div:nth-child(2) > a:nth-child(1)`).first().attr('href');
  }
  const getImage = ($, i, j) => {
    return $(`${baseSelector}(${i}) > ${childSelector}(${j+1}) > div:nth-child(1)`).find('img').first().attr('src');
  }
  const getResultNumber = ($) => {
    return $(`h2.title-L:nth-child(3)`).html();
  }
  
  async function scrapeData() {
    let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fcomeup.com%2Frecherche%3Fq%3D${req.query.argument}`);
    let $ = cheerio.load(html);
    let data = []
    let resultNumber = getResultNumber($)

    for ( let i = 0; i <= 3 ; i++) {
      if ( i = 1 ) {
        for ( let j = 0; j < 6; j++) {
          let childrenData = [];
          childrenData.push(
            ...[
              getPrice($, i, j), 
              getName($, i, j), 
              getDescription($, i, j), 
              getLink($, i, j), 
              getImage($, i, j), 
            ]
          )
          data.push(childrenData);
        }
      } if ( i = 3 ) {
        for ( let j = 0; j < 30; j++) {
          let childrenData = [];
          childrenData.push(
            ...[
              getPrice($, i, j), 
              getName($, i, j), 
              getDescription($, i, j), 
              getLink($, i, j), 
              getImage($, i, j), 
            ]
          )
          data.push(childrenData);
        }
      }
    }
    data.push(resultNumber)
    await res.status(200).send(data)
    return data;
  }
  scrapeData()
}
