import nodeCron from "node-cron";

console.log("Starting cron job that runs every 5 seconds...");

// // Save the returned schedule objects
// const task5Seconds = nodeCron.schedule("*/5 * * * * *", () => {
//   console.log(`running task every 5 seconds`, new Date());
// });

/// rungs every second
const taskHourly = nodeCron.schedule("*/1 * * * * *", () => {
  console.log(`running task every hour`);
});

/// starts running the task
taskHourly.start();

// Example: Stop the hourly task after 2 minutes
setTimeout(() => {
  console.log("Stopping the hourly task");
  taskHourly.stop();
}, 6000);
