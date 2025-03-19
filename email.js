import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const googleKey = process.env.GOOGLE_PASS;
console.log(googleKey);

const art = function (articles) {
  if (!articles) return "";
  let temp = JSON.stringify(articles);
  let temp2 = JSON.parse(temp);
  let temp3 = "";
  for (let [key, value] of Object.entries(temp2)) {
    temp3 += key + " ::::::::: " + value + "<br>";
  }
  return temp3;
};

const CONFIG = {
  tranpost: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "patelman242@gmail.com",
      pass: googleKey,
    },
  },
  info: (articles) => {
    return {
      from: "<patelman242@gmail.com>", // sender address
      to: "patelman242@gmail.com", // list of receivers
      subject: "WSUPP", // Subject line
      text: "Hello world?", // plain text body
      html: `articles: ${art(articles)}`, // html body
    };
  },
};

const transporter = nodemailer.createTransport(CONFIG.tranpost);

export async function main(articles) {
  // send mail with defined transport object
  if (!articles) {
    console.log("No articles provided");
    return;
  }
  let info = await transporter.sendMail(CONFIG.info(articles));
  console.log("Message sent: %s", info);
}

// Only call main if this file is being run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  main().catch(console.error);
}
