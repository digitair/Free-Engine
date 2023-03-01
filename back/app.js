const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./router/user");
const sibApi = require("./controllers/sib")
const freelancesCrawlApi = require("./controllers/freelancesCrawler")
const freelancesFixnhourApi = require("./controllers/freelancesFixnhourScraper")
const freelancesLehibouApi = require("./controllers/freelancesLehibouScraper")
const freelancesArcdevApi = require("./controllers/freelancesArcdevScraper")
const freelancesCodementorApi = require("./controllers/freelancesCodementorScraper")
const freelancesTruelancerApi = require("./controllers/freelancesTruelancerScraper")

require('dotenv').config()

mongoose
  .connect(
    `${process.env.MONGO_CONNSTRING}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.get("/api/scrapeMaltData", freelancesCrawlApi.scrapeMaltData);
app.get("/api/scrapeFreelanceComData", freelancesCrawlApi.scrapeFreelanceComData);
app.get("/api/scrapeUpworkData", freelancesCrawlApi.scrapeUpworkData);
app.get("/api/scrapeFixnhourData", freelancesFixnhourApi.scrapeFixnhourData);
app.get("/api/scrapeLehibouData", freelancesLehibouApi.scrapeLehibouData);
app.get("/api/scrapeArcdevData", freelancesArcdevApi.scrapeArcdevData);
app.get("/api/scrapeCodementorData", freelancesCodementorApi.scrapeCodementorData);
app.get("/api/scrapeTruelancerData", freelancesTruelancerApi.scrapeTruelancerData);
app.post("/api/sendemail", sibApi.sendEmail);

module.exports = app;
