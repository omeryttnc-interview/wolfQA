class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async getAllInnerText(selector) {
    return await this.page.locator(selector).allInnerTexts();
  }
}

export default BasePage;
