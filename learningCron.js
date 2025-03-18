import dotenv from "dotenv";
dotenv.config();
import nodeCron from "node-cron";
import nodemailer from "nodemailer";

const googleKey = process.env.GOOGLE_PASS;
console.log(googleKey);
console.log("Starting cron job that runs every 5 seconds...");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "patelman242@gmail.com",
    pass: googleKey,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "<patelman242@gmail.com>", // sender address
    to: "patelman242@gmail.com", // list of receivers
    subject: "WSUPP", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

/// rungs every second
const taskHourly = nodeCron.schedule("*/500 * * * * *", () => {
  console.log(`running task every min`);
});

/// starts running the task
taskHourly.start();

// Example: Stop the hourly task after 2 minutes
setTimeout(() => {
  console.log("Stopping the hourly task");
  taskHourly.stop();
}, 600000);
