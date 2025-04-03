import { scrapper } from "./scrapper2.js";
import addingToDB from "./db2.js";
// import nodemailer from "nodemailer";
import nodeCron from "node-cron";
import sendEmail from "./email2.js";
const url = "https://www.cnbc.com/technology/";

const run = async function (url) {
  // Call Scrapper and summarized it
  console.log("hi");
  let num = 0;
  const cron = nodeCron.schedule("*/2 * * * *", async () => {
    // await console.log("running a task every two minutes");
    let scrappedItems = await scrapper(url);
    await addingToDB(scrappedItems);
    num++;
    console.log(num);
    if (num >= 2) {
      cron.stop();
      console.log("SEND EMAIL");
      await sendEmail();
      /////// run sending the email
    }
  });
  /// Send Email
};

run(url);
