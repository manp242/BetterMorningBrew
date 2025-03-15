import { scraperProduct } from "./scrapper.js";
import { summarizeAndDB } from "./scrapper.js";
import nodeCron from "node-cron";
import { emptyDB } from "./scrapper.js"; // Ensure node-fetch is installed

let numberOfArticles = 10;
let url = "https://www.cnbc.com/technology/";

const projectRunner = async function () {
  console.log("hi");

  //// runs every one
  const taskHourly = nodeCron.schedule("*/200 * * * * *", async () => {
    const scrappedArticles = await scraperProduct(url);
    await summarizeAndDB(scrappedArticles);
  });

  setTimeout(() => {
    console.log("Stopping the hourly task");
    taskHourly.stop();
  }, 60000);
};
projectRunner();
