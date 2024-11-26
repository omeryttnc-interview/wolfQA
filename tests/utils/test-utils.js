import { expect } from "@playwright/test";
import { TIME } from "./constants";

export const assertTime = (timeList, isAll) => {
  let secondsList = [];
  let howManyTested = 0;

  timeList.map((item) => {
    // to be able to identify I split time digit and time unit ex: 2 hours ago
    const time = item.split(" ")[0];
    const unit = item.split(" ")[1];

    // and convert all time to second to have single unit to compare
    if (unit == TIME.SECOND || unit == TIME.SECONDS) {
      secondsList.push(time);
    } else if (unit == TIME.MINUTE || unit == TIME.MINUTES) {
      secondsList.push(time * 60);
    } else if (unit == TIME.HOUR || unit == TIME.HOURS) {
      secondsList.push(time * 60 * 60);
    } else if (unit == TIME.DAY || unit == TIME.DAYS) {
      secondsList.push(time * 60 * 60 * 24);
    }
  });

  // I left trigger to test 10 articles on the last (4th) page
  const howManyTurn = isAll == true ? secondsList.length : 10;

  for (let i = 0; i < howManyTurn - 1; i++) {
    // i assert if it is sorted correctly because if it is first one should be equal or smaller than next one
    expect(secondsList[i] <= secondsList[i + 1]).toBeTruthy();

    // to able to test how many assertion tested I record assertion amount
    howManyTested++;
  }

  // for each list either we have 30 or 10 articles but total assortion amount always less than 1
  // like I am having 29 assertions to test 30 articles and 9 assertions to test 10 articles,
  //therefore I added 1 after completing loop
  howManyTested++;

  // and returned assortion amount
  return howManyTested;
};
