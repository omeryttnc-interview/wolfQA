import BasePage from "./BasePage";
class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.sortToNewest = ".pagetop a[href='newest']";
    this.articleText = ".age a[href]";
    this.more = ".morelink";
  }
  async goTo() {
    await this.page.goto("/");
  }

  async clickSortToNewest() {
    await this.click(this.sortToNewest);
  }

  async getAllArticleTimeInfoText() {
    return await this.getAllInnerText(this.articleText);
  }

  async clickMoreArticle() {
    await this.click(this.more);
  }
}

module.exports = HomePage;
