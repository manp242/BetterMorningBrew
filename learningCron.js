import dotenv from "dotenv";
dotenv.config();
import nodeCron from "node-cron";
import nodemailer from "nodemailer";

const googleKey = process.env.GOOGLE_PASS;
console.log(googleKey);
console.log("Starting cron job that runs every 5 seconds...");

const CONFIG = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "patelman242@gmail.com",
    pass: googleKey,
  },
};
const info = function (articles) {
  // console.log(articles + "INIANFNSF");
  return {
    from: "<patelman242@gmail.com>", // sender address
    to: "patelman242@gmail.com", // list of receivers
    subject: "WSUPP", // Subject line
    text: "Hello world?", // plain text body
    html: `articles: ${articles}`, // html body
  };
};

const transporter = nodemailer.createTransport(CONFIG);

// async..await is not allowed in global scope, must use a wrapper
export async function main(articles) {
  // send mail with defined transport object
  console.log(articles + "articlasfasfsafasfses");
  await transporter.sendMail(info(articles));
  console.log("Message sent: %s", info);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

/// rungs every second
// const taskHourly = nodeCron.schedule("*/500 * * * * *", () => {
//   console.log(`running task every min`);
// });

// /// starts running the task
// taskHourly.start();

// // Example: Stop the hourly task after 2 minutes
// setTimeout(() => {
//   console.log("Stopping the hourly task");
//   taskHourly.stop();
// }, 600000);
