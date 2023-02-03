//Sending Blue API
const SibApiV3sdk = require("sib-api-v3-sdk");
require('dotenv').config();

exports.sendEmail = (req, res, next) => {
  const email = req.query.email;
  const payload = req.query.payload;  

  const mailContent = () => {
    const payloadToArray = Array.from(payload.split(","))
    let content = ""
    for (let i = 0; i < payloadToArray.length - 1; i++) {
      content +=  `
        <p>${payloadToArray[i]}:
        <a href="${payloadToArray[i + 1]}">${payloadToArray[i + 1]}</a></p>
        `
      i += 1
    }
    return (
      content
    )
  }

  // auth + config + content
  let defaultClient = SibApiV3sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_API_KEY;

  let tranEmailApi = new SibApiV3sdk.TransactionalEmailsApi()

  let sender = {
    email: 'germain@digit-air.com',
    name: 'admin',
  }
  let receivers = [
    {
        email: email,
    },
  ]
  tranEmailApi
    .sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Voici les nouvelles Marketplaces !',
        textContent: `
          Voici les nouvelles marketplaces.
          `,
        htmlContent: `
          <h1>Nouvelles marketplaces</h1>
          ${mailContent()}
          <p></p>
          <h2>A Bientôt sur <a href="https://search-marketplace.com">search-marketplace.com</a></h2>
          `,
        params: {
            role: 'Frontend',
        },
    })
    .then(console.log)
    .catch(console.log)
}
