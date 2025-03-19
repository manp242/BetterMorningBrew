import { scraperProduct, sendEmail } from "./scrapper.js";
import { summarizeAndDB } from "./scrapper.js";
import nodeCron from "node-cron";
import { emptyDB } from "./scrapper.js"; // Ensure node-fetch is installed
import { main } from "./email.js";

let numberOfArticles = 10;
let url = "https://www.cnbc.com/technology/";

const projectRunner = async function () {
  let scrappedArticles = await scraperProduct(url);
  let dataToSend = await summarizeAndDB(scrappedArticles);
  // console.log(dataToSend);
  await main(dataToSend);

  setTimeout(() => {
    console.log("Stopping the hourly task");
    taskHourly.stop();
  }, 6 * 60 * 60 * 1000);
};
emptyDB();
projectRunner();
