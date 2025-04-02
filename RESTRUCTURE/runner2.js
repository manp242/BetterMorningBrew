import { scrapper } from "./scrapper2.js";
import addingToDB from "./db2.js";

const url = "https://www.cnbc.com/technology/";

const run = async function (url) {
  // Call Scrapper and summarized it
  console.log("hi");
  let scrappedItems = await scrapper(url);
  // Call db2
  await addingToDB(scrappedItems);
  /// Send Email
};

run(url);
