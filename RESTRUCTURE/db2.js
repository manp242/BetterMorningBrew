///// SETTING UP DB
import sqlite3 from "sqlite3";
const sqlite3Verbose = sqlite3.verbose(); // Ensure node-fetch is installed
let sql;
const db = new sqlite3.Database(
  "./RESTRUCTURE/db2.db",
  sqlite3Verbose.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
  }
);
// sql = `CREATE TABLE dataTable(articleName, articleSummary, timePosted, articleUrl)`;
// db.run(sql);
export default async function addingToDB(items) {
  console.log("in addingDB");
  for (const item of items) {
    /// item is each { articleUrl: "...", id: 1, articleName: "...", }
    // select all the articlesNames
    sql = `SELECT articleName FROM dataTable`;
    db.all(sql, [], (err, rows) => {
      if (err) return console.error(err.message);
      //// get a array for all the articleNames
      const existingNames = rows.map((r) => r.articleName);
      // console.log(existingNames);
      if (!existingNames.includes(item.articleName)) {
        sql = `INSERT INTO dataTable(articleName, summarizedArticle, articleTime, articleUrl) VALUES (?,?,?,?)`;
        db.run(
          sql,
          [
            item.articleName,
            item.summarizedArticle,
            item.articleTime,
            item.articleUrl,
          ],
          (err) => {
            if (err) return console.error(err.message);
          }
        );
      }
    });
  }
}
