import sqlite3 from "sqlite3";
import nodemailer from "nodemailer";
import nodeCron from "node-cron";
const sqlite3Verbose = sqlite3.verbose(); // Ensure node-fetch is installed
let sql;
const db = new sqlite3.Database(
  "./RESTRUCTURE/db2.db",
  sqlite3Verbose.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);
const googleKey = "jsuogdekgfkyjpsh";
// const apiKey = process.env.RESENDMAIL;
// console.log(apiKey);
const timeToSend = "32 21 * * *";
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
  info: (all) => {
    return {
      from: "<patelman242@gmail.com>", // sender address
      to: "patelman242@gmail.com", // list of receivers
      subject: "SUMMARY OF NEWS - I gotcu bro", // Subject line
      html: `${customEmail(all)}`, // html body
    };
  },
};

////// sends the email
export default function sendEmail() {
  sql = `SELECT * FROM dataTable`;
  db.all(sql, [], (err, all) => {
    if (err) return console.log(err.message);
    try {
      ///// sends at scheduled time
      nodeCron.schedule(timeToSend, async () => {
        const transporter = nodemailer.createTransport(CONFIG.tranpost);
        // console.log("t");
        console.log(transporter);
        await transporter.sendMail(CONFIG.info(all));
      }),
        { scheduled: true, timezone: "America/New_York" };
    } catch (err) {
      if (err) return console.log(err.message);
    }
  });
}

let customEmail = function (all) {
  let html = ` <tr>
            <td style="padding: 20px;">
                <p style="font-size: 20px; margin: 0 0 10px;">Hello Reader,</p>
                <p style="font-size: 20px; margin: 0 0 10px;">Here are this week's most important stories, curated just for you.</p>
            </td>
        </tr>`;
  for (let i = 0; i < all.length; i++) {
    html += `<tr>
            <td style="padding: 0 20px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #3498db; border-radius: 2px;">
                            <h2 style="color: #2c3e50; margin: 0 0 10px; font-size: 20px;">${all[i].articleName}</h2>
                            <p style="font-size: 14px; line-height: 22px; margin: 0 0 15px;">${all[i].summarizedArticle}</p>
                            <p style="font-size: 14px; line-height: 22px; margin: 0 0 15px;">${all[i].articleTime}</p>
                            <a href="${all[i].articleUrl}" style="background-color: #3498db; color: #ffffff; text-decoration: none; padding: 8px 15px; border-radius: 4px; font-size: 14px; display: inline-block; ">Read More</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>`;
  }
  return html;
  ///call the send the mail. Get the customized stuff above.
};
