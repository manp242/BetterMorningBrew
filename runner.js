import { scraperProduct } from "./scrapper.js";
import { summarizeAndDB } from "./scrapper.js";
import { emptyDB } from "./scrapper.js"; // Ensure node-fetch is installed
import { main } from "./email.js";
import nodeCron from "node-cron";

let url = "https://www.cnbc.com/technology/";

// const projectRunner = async function () {
//   ////// scrappes and sends the email

//   let scrappedArticles = await scraperProduct(url);
//   let waitin = await nodeCron.schedule("*/2 * * * *", async () => {
//     console.log("running a task every two minutes");
//   });
//   waitin;
//   let dataToSend = await summarizeAndDB(scrappedArticles);
//   await main(dataToSend);
// };
// emptyDB();
// projectRunner();

const ffn = async function () {
  console.log("inside ffn");
  if (scrappedArticles != undefined) {
    let dataToSend = await summarizeAndDB(scrappedArticles);
    await main(dataToSend);
    console.log("finished");
  }
};
let scrappedArticles;
let i = 0;
////////////////////////// scrapes every 30 minutes
let job = nodeCron.schedule("*/1 * * * *", async () => {
  scrappedArticles = await scraperProduct(url);
  i++;
  console.log("running" + i + "time");
  //////// run is 5 times from i=0, i=1, i=2.... so for 30 * 4 = 2 hours
  if (i == 4) {
    ffn();
    job.stop();
  }
});
