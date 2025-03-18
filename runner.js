import { scraperProduct } from "./scrapper.js";
import { summarizeAndDB } from "./scrapper.js";
import nodeCron from "node-cron";
import { emptyDB } from "./scrapper.js"; // Ensure node-fetch is installed

let numberOfArticles = 10;
let url = "https://www.cnbc.com/technology/";

const projectRunner = async function () {
  console.log("hi");

  let scrappedArticles = await scraperProduct(url);
  await summarizeAndDB(scrappedArticles);
  //// runs every one
  const taskHourly = nodeCron.schedule("*/45 * * * *", async () => {
    scrappedArticles = await scraperProduct(url);
    await summarizeAndDB(scrappedArticles);
  });
  taskHourly.start();

  setTimeout(() => {
    console.log("Stopping the hourly task");
    taskHourly.stop();
  }, 6 * 60 * 60 * 1000);
};
emptyDB();
projectRunner();
