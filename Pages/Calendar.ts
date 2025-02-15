import { expect, type Locator, type Page } from "@playwright/test";

export class RandomOrgCalendarPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async validatePageTitle(pageTitle: string){
    const currentPageTitle = await this.page.title();
    expect(currentPageTitle, `The Calendar Date Generator page should have title "${pageTitle}", but instead shows as: ${currentPageTitle}`).toBe(pageTitle);
  }
}
