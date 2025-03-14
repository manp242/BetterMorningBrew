// const sqlite3 = require("sqlite3").verbose();
// let sql;

// /// connecting to db
// const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err) return console.error(err.message);
// });
// ////create table
// // sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, article_name, article_summary)`;
// // db.run(sql);
// //// dropp table
// ////////// db.run("DROP TABLE users");

// //// INSERT DATA INTO TABLE
// // sql = `INSERT INTO users(article_name, article_summary) VALUES (?,?)`;
// // db.run(sql, ["article3", "summary3"], (err) => {
// //   if (err) return console.error(err.message);
// // });

// /// UPDATE USERS DATA
// // sql = `UPDATE users SET article_name = ? WHERE id = ?`;
// // db.run(sql, ["article4", 4], (err) => {
// //   if (err) return console.error(err.message);
// // });

// /// DELETE THE DATA
// sql = `DELETE * FROM users`;
// db.run(sql, (err) => {
//   if (err) return console.error(err.message);
// });

// ///// QUERY THE DATA
// sql = `SELECT * FROM users`;
// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   rows.forEach((row) => {
//     console.log(row);
//   });
// });
