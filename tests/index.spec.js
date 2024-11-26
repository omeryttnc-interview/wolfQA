// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
import test, { expect } from "@playwright/test";
import { assertTime } from "./utils";
import HomePage from "../pages/HomePage";

test("should validate that EXACTLY the first 100 articles are sorted from newest to oldest", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.goTo();
  // assert if page is loaded
  expect(page.url()).toContain("ycombinator");

  // click new button to sort date
  await homePage.clickSortToNewest();
  let howManyTested = 0;

  // we need to work on 4 different pages each page has 30 articles and as requirement was asking for
  // 100 articles, we will check 10 articles from 4th page so 30+30+30+10
  for (let i = 0; i < 4; i++) {
    // get all article time info in an object
    const allArticleTimeInfoText = await homePage.getAllArticleTimeInfoText();
    // assert if it is sorted, we will check differently at the 4 page therefore I left trigger
    // and keep record how many articles tested
    howManyTested += assertTime(
      await allArticleTimeInfoText,
      i < 3 ? true : false
    );

    // click to go next page, no need to click on next button at the 4th page
    i < 3 ? await homePage.clickMoreArticle() : "";
  }
  // assert if we are checking 100 articles
  expect(howManyTested == 100).toBeTruthy();
});
