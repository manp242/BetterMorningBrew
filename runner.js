import { scraperProduct } from "./scrapper.js";
import { summarizeAndDB } from "./scrapper.js";
import { emptyDB } from "./scrapper.js"; // Ensure node-fetch is installed

let numberOfArticles = 10;
let url = "https://www.cnbc.com/technology/";

const projectRunner = async function () {
  // scrape articles and return a Object of articleName and articleSummary
  const scrappedArticles = await scraperProduct(url);
  /// Summarize Article and Adding To DB
  summarizeAndDB(scrappedArticles);
};
console.log("hi");
projectRunner();
