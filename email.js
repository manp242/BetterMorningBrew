import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import nodeCron from "node-cron";

const googleKey = process.env.GOOGLE_PASS;
const timeToSend = "20 16 * * *";
console.log(timeToSend);
const art = function (articles) {
  if (!articles) return "";
  let html = `
        <tr>
            <td style="padding: 20px;">
                <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px;">Hello Reader,</p>
                <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px;">Here are this week's most important stories, curated just for you.</p>
            </td>
        </tr>
        `;
  for (let [key, value] of Object.entries(articles)) {
    html += `
        <tr>
            <td style="padding: 0 20px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #3498db; border-radius: 2px;">
                            <h2 style="color: #2c3e50; margin: 0 0 10px; font-size: 20px;">${key}</h2>
                            <p style="font-size: 14px; line-height: 22px; margin: 0 0 15px;">${value}</p>
                            <a href="https://cnn.com/technology" style="background-color: #3498db; color: #ffffff; text-decoration: none; padding: 8px 15px; border-radius: 4px; font-size: 14px; display: inline-block; ">Read More</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>`;
  }
  return html;
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

export async function main(articles) {
  const transporter = nodemailer.createTransport(CONFIG.tranpost);

  nodeCron.schedule(timeToSend, async () => {
    // send mail with defined transport object
    if (!articles) {
      console.log("No articles provided");
      return;
    }
    let info = await transporter.sendMail(CONFIG.info(articles));
    console.log("Message sent: %s", info);
  }),
    { scheduled: true, timezone: "America/New_York" };
}

// Only call main if this file is being run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  main().catch(console.error);
}
