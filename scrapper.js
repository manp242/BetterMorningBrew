import sqlite3 from "sqlite3";
import puppeteer from "puppeteer";
import fetch from "node-fetch";

const sqlite3Verbose = sqlite3.verbose(); // Ensure node-fetch is installed
let sql;
//API
const apiKey = "cf2cfd36-d955-4950-aee0-83c7b3f5ff9b";
let numberOfArticles = 5;

// AWANLLM API Configuration
const AWANLLM_API_KEY = apiKey;
const apiUrl = "https://api.awanllm.com/v1/chat/completions";

//////// FUNCTIONS
// DB
const db = new sqlite3.Database(
  "./actual.db",
  sqlite3Verbose.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);
export async function scraperProduct(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  let all_Data = {};

  // Scrape first article only
  for (let i = 0; i < numberOfArticles; i++) {
    await page.waitForSelector(".Card-title");
    const titles = await page.$$(".Card-title");

    if (titles[i]) {
      // ensures no duplicate articles
      if (titles[i] in all_Data) {
        return;
      }
      const titleText = await page.evaluate((el) => el.innerText, titles[i]);
      console.log(`Scraping: ${titleText}`);

      await titles[i].click();
      await page.waitForSelector(".group", { timeout: 5000 }).catch(() => {});

      let currentArticleData = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".group"))
          .map((el) => el.innerText.trim())
          .join(" ")
          .replace(/\s+/g, " ");
      });
      all_Data[titleText] = currentArticleData;
    }

    await page.goBack({ waitUntil: "domcontentloaded" });
  }

  await browser.close();
  return all_Data; // Return scraped data
}

async function summarizeParagraph(paragraph) {
  const payload = {
    model: "Meta-Llama-3.1-8B-Instruct",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Please summarize the following paragraph:\n\n${paragraph}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 150,
    stream: false,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AWANLLM_API_KEY}`,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      return "Summary:", data.choices[0].message.content;
    } else {
      console.error("API Error:", data);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}

// **Run Scraper and Pass First Article to Summarization**
export async function summarizeAndDB(art) {
  let finalProduct = {}; // Moved finalProduct outside loop to store all articles
  const keys = Object.keys(art);
  console.log(keys);

  // looping thru each article and article summary at a time
  for (let i = 0; i < numberOfArticles; i++) {
    const articleTitle = keys[i];
    const articleContent = art[articleTitle];
    // console.log(`Summarizing article: ${articleTitle}`);
    const summary = await summarizeParagraph(articleContent);
    finalProduct[articleTitle] = summary;

    /// INSERTING TO DB
    sql = `INSERT INTO data(article_name, article_summary) VALUES (?, ?)`;
    db.run(sql, [articleTitle, summary.slice(36, -1)], (err) => {
      if (err) return console.error(err.message);
    });
  }
  sql = `SELECT * FROM data`;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(row);
    });
  });
  return finalProduct;
}

export const emptyDB = function () {
  sql = `DELETE FROM data`;
  console.log("empting");
  db.run(sql, [], (err) => {
    if (err) return console.error(err.message);
  });
};

emptyDB();

/// ALL DB SHIT
/*
///// CREATE TABLE
// sql = `CREATE TABLE data(id INTEGER PRIMARY KEY, article_name, article_summary)`;
// db.run(sql);

///// DROP TABLE
// db.run("DROP TABLE data");

//// INSERT DATA INTO TABLE

///// QUERY THE DATA
// sql = `SELECT * FROM users`;
// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   rows.forEach((row) => {
//     console.log(row);
//   });
// });
*/
