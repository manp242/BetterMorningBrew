import { scraperProduct } from "./scrapper.js";
import { summarizeAndDB } from "./scrapper.js";
import { emptyDB } from "./scrapper.js"; // Ensure node-fetch is installed
import { main } from "./email.js";
import nodeCron from "node-cron";

let numberOfArticles = 10;
let url = "https://www.cnbc.com/technology/";

const projectRunner = async function () {
  ////// scrappes and sends the email
  let scrappedArticles = await scraperProduct(url);
  let dataToSend = await summarizeAndDB(scrappedArticles);
  await main(dataToSend);
};
emptyDB();
projectRunner();
