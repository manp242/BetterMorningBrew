import summarizer from "./summarizer.js";
import { By, Builder, Browser } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
let allArticles = {};
let numberOfArticles = 2;

export async function scrapper(url) {
  //// store all the scrapedData
  const INFO = [];

  // loads browser -- ensuring it's headless
  let page = await new Builder()
    .forBrowser(Browser.FIREFOX)
    .setChromeOptions(new chrome.Options().addArguments("--headless"))
    .build();
  await page.get(url);

  /// get all the titles
  let titles = await page.findElements(By.className("Card-title"));
  ////// LOOP thru all the titles and insure u max out at numofArticles
  for (let i = 0; i < numberOfArticles && i < titles.length; i++) {
    let temp = {};
    titles = await page.findElements(By.className("Card-title"));
    await titles[i].click();
    console.log(await page.getCurrentUrl());
    temp["articleUrl"] = await page.getCurrentUrl();
    temp["id"] = i + 1;
    temp["articleName"] = await page
      .findElement(By.className("ArticleHeader-headline"))
      .getText();
    /// initially ste articleContent to none and then add to it as you parse thru all the groups
    temp["articleContent"] = "";
    let groups = await page.findElements(By.className("group"));
    for (let group of groups) {
      let paragraphs = await page.findElements(By.css("p"));
      for (let p of paragraphs) {
        let txt = await p.getText();
        temp["articleContent"] += txt;
      }
    }
    ////// add to summarizedArticle
    temp["summarizedArticle"] = await summarizer(temp["articleContent"]);

    temp["articleTime"] = await page
      .findElement(By.css(`time[data-testid="published-timestamp"]`))
      .getAttribute("datetime");

    console.log(temp);
    INFO.push(temp);
    await page.navigate().back();
  }
  //scrape the article
  await page.quit();
  return INFO;
}
