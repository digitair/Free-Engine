// const rp = require('request-promise');
// const cheerio = require('cheerio');

// exports.scrapeUpworkData = (req, res, next) => {
//   const baseSelector = 'div.up-card-section:nth-child';

//   const getPrice = ($, i) => {
//     return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > strong:nth-child(1)`).html();
//   }
//   const getName = ($, i) => {
//     return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1) > div:nth-child(1)`).html();
//   }
//   const getDescription = ($, i) => {
//     return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2) > strong:nth-child(1)`).html();
//   }
//   const getDetails = ($, i, j) => {
//     let skills = [];
//     $(`${baseSelector}(${i+1})  > div:nth-child(2) > div:nth-child(1) > div:nth-child(4)`).each((index, element) => {
//       skills.push($(element).text().trim());
//     });
//     return skills;
//   }
//   const getLink = ($, i) => {
//     return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)`).attr('data-qa-freelancer-ciphertext');
//   }
//   const getImage = ($, i) => {
//     return $(`${baseSelector}(${i+1})`).find('img').map((i, el) => $(el).attr('src')).get();
//   }
//   const getCity = ($, i) => {
//     return $(`${baseSelector}(${i+1}) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > span:nth-child(2)`).html();
//   }

//   async function scrapeData() {
//     let html = await rp(`https://api.crawlbase.com/?token=${process.env.CRAWLER_API_KEY}&url=https%3A%2F%2Fwww.upwork.com%2Fsearch%2Fprofiles%2F%3Floc%3Dfrance%26q%3D${req.query.argument}`);
//     let $ = cheerio.load(html);
//     let data = []

//     for ( let i = 0; i < $('div.up-card-section').length; i++) {
//       let childrenData = [];
//       childrenData.push(
//         ...[
//           getPrice($, i), 
//           getName($, i), 
//           getDescription($, i),
//           getLink($, i), 
//           getImage($, i), 
//           getCity($, i),
//           getDetails($, i)
//         ]
//       )
//       data.push(childrenData)
//     }
//     await res.status(200).send(data)
//     return data;
//   }
//   scrapeData()
// }