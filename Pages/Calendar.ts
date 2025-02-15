import { expect, type Locator, type Page } from "@playwright/test";
import { MonthsOfTheYear } from "../utils/constants";

export class RandomOrgCalendarPage {
  readonly page: Page;
  readonly amountInput: Locator;
  readonly startDayOption: Locator;
  readonly startMonthOption: Locator;
  readonly startYearOption: Locator;
  readonly endDayOption: Locator;
  readonly endMonthOption: Locator;
  readonly endYearOption: Locator;
  readonly getDatesButton: Locator;
  readonly datRangeResultsText: Locator
  dateRange: string[];
  headerResults: Locator;
  readonly requestedRangeErrorMessage: Locator;

  /**
   * Constructs an instance of the Calendar page object.
   * 
   * @param page - The Playwright Page object used to interact with the web page.
   * 
   * @property {Locator} amountInput - Locator for the input field where the amount is entered.
   * @property {Locator} startDayOption - Locator for the dropdown to select the start day.
   * @property {Locator} startMonthOption - Locator for the dropdown to select the start month.
   * @property {Locator} startYearOption - Locator for the dropdown to select the start year.
   * @property {Locator} endDayOption - Locator for the dropdown to select the end day.
   * @property {Locator} endMonthOption - Locator for the dropdown to select the end month.
   * @property {Locator} endYearOption - Locator for the dropdown to select the end year.
   * @property {Locator} getDatesButton - Locator for the button to get the dates.
   * @property {Locator} datRangeResultsText - Locator for the text displaying the date range results.
   */
  constructor(page: Page) {
    this.page = page;
    this.amountInput = this.page.locator('input[name="num"]');
    this.startDayOption = this.page.locator('select[name="start_day"]');
    this.startMonthOption = this.page.locator('select[name="start_month"]');
    this.startYearOption = this.page.locator('select[name="start_year"]');
    this.endDayOption = this.page.locator('select[name="end_day"]');
    this.endMonthOption = this.page.locator('select[name="end_month"]');
    this.endYearOption = this.page.locator('select[name="end_year"]');
    this.getDatesButton = this.page.getByRole('button', { name: 'Get Dates' })
    this.datRangeResultsText = this.page.locator('text=It was picked randomly out').or(this.page.locator('text=They were picked randomly out'));
    this.requestedRangeErrorMessage = this.page.locator('text=Error: The number of requested dates must be an integer in the [1,25] interval');
  }
  /**
   * Navigates to the Calendar page and validates the page title.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation and validation are complete.
   */
  async navigateToCalendarPage(){
    await this.page.goto('/calendar-dates/');
    this.validatePageTitle("RANDOM.ORG - Calendar Date Generator");
  }

  /**
   * Validates that the current page title matches the expected title.
   *
   * @param pageTitle - The expected title of the page.
   * @throws Will throw an error if the current page title does not match the expected title.
   */
  async validatePageTitle(pageTitle: string){
    const currentPageTitle = await this.page.title();
    expect(currentPageTitle, `The Calendar Date Generator page should have title "${pageTitle}", but instead shows as: ${currentPageTitle}`).toBe(pageTitle);
  }

  /**
   * Sets the amount of dates to generate.
   *
   * @param {number} amount - The number of dates to set.
   * @throws Will throw an error if the amount input field is not visible.
   * @returns {Promise<void>} A promise that resolves when the amount has been set.
   */
  async setAmountOfDatesToGenerate(amount: number){
    expect(await this.amountInput.isVisible(), "The amount input field is not visible.").toBe(true);
    await this.amountInput.fill(amount.toString());
  }

  /**
   * Sets the start date by selecting the day, month, and year from the respective dropdown options.
   *
   * @param day - The day of the month to be selected.
   * @param month - The month of the year to be selected, represented by the `MonthsOfTheYear` enum.
   * @param year - The year to be selected.
   * @returns A promise that resolves when the date has been set.
   */
  async setStartDate(day: number, month: MonthsOfTheYear, year: number){


    expect(await this.startDayOption.isVisible(), "The start day option is not visible.").toBe(true);
    expect(await this.startDayOption.isEnabled(), "The start day option is not enabled.").toBe(true);
    await this.startDayOption.selectOption({ label: day.toString() });
    await this.startMonthOption.selectOption({ label: month });
    await this.startYearOption.selectOption({ label: year.toString() });
  }

  /**
   * Sets the end date by selecting the specified day, month, and year.
   *
   * @param day - The day of the month to set as the end date.
   * @param month - The month of the year to set as the end date. This should be a value from the `MonthsOfTheYear` enum.
   * @param year - The year to set as the end date.
   * @returns A promise that resolves when the end date has been set.
   */
  async setEndDate(day: number, month: MonthsOfTheYear, year: number){
    await this.endDayOption.selectOption({ label: day.toString() });
    await this.endMonthOption.selectOption({ label: month });
    await this.endYearOption.selectOption({ label: year.toString() });
  }

  /**
   * Validates that the header displays the correct amount of calendar dates.
   *
   * @param amountofDates - The expected number of calendar dates to be displayed in the header.
   * @throws Will throw an error if the header is not visible or if it displays an incorrect amount of dates.
   */
  async validateDateResultHeader(amountofDates: number){
    
    const headerText = amountofDates === 1 
      ? "Here is your calendar date:" 
      : `Here are your ${amountofDates} calendar dates:`;
    this.headerResults = this.page.locator(`p:has-text("${headerText}")`);


    await expect(this.headerResults,"The header locator is either not visible or displaying the incorrect amount of expected dates.").toBeVisible();
  }

  /**
   * Collects the dates that are displayed on the calendar.
   * 
   * This method locates the date text element using an XPath selector,
   * verifies its visibility, and then extracts and processes the text
   * to obtain an array of date strings.
   * 
   * @throws Will throw an error if the date text element is not visible.
   * 
   * @returns {Promise<void>} A promise that resolves when the dates have been collected.
   */
  async collectDatesThatAreDisplayed(): Promise<void>{
    const dateTextElement = this.headerResults.locator('xpath=following-sibling::p').first();
    expect(await dateTextElement.isVisible(), "The date text element is not visible.").toBe(true);
    const dateText = await dateTextElement.innerText();
    this.dateRange = dateText.trim().split('\n').map(date => date.trim());
  }

  /**
   * Validates the number of dates received on the calendar page.
   *
   * @param amountOfDates - The expected number of dates to be validated.
   * @throws Will throw an error if the number of dates received does not match the expected amount.
   */
  async validateAmountOfDatesReceived(amountOfDates: number){
    expect(this.dateRange.length, `The number of dates received should be ${amountOfDates}, but instead received ${this.dateRange.length}`).toBe(amountOfDates);
  }

  /**
   * Validates that all dates in the `dateRange` array fall within the specified start and end dates.
   *
   * @param startDate - The start date of the range in string format.
   * @param endDate - The end date of the range in string format.
   * @throws Will throw an error if any date in the `dateRange` array is not within the specified range.
   */
  async validateDatesAreGeneratedCorrectly(){
    await this.collectDatesThatAreDisplayed();
    var startAndEndDate = await this.getDatesFromText();
    const startDate = new Date(startAndEndDate[0]);
    const endDate = new Date(startAndEndDate[1]);
    this.dateRange.forEach(date => {
      const currentDate = new Date(date);
      expect(currentDate >= startDate && currentDate <= endDate, `The date ${date} is not within the range of ${startDate} and ${endDate}`).toBe(true);
    });
  }

  /**
   * Extracts the start and end dates from the text displayed on the page.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array containing the start and end dates as strings.
   * @throws Will throw an error if the dates are not found in the text.
   */
  async getDatesFromText(): Promise<string[]>{
    const dateText = await this.datRangeResultsText.innerText();
    const startIndex = dateText.indexOf("between ") + "between ".length;
    const endIndex = dateText.indexOf(" and ");
    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Dates were not found in the explanation text in the results page.");
    }
    const start = dateText.substring(startIndex, endIndex).trim();
    let end = dateText.substring(endIndex + " and ".length).trim();
    if (end.endsWith(".")) {
      end = end.slice(0, -1);
    }
    return [start, end];
  }


  /**
   * Validates that the error message indicating the integer range is visible.
   * 
   * @throws Will throw an error if the requested range error message is not visible.
   */
  async validateErrorMessage(){
    await expect(this.requestedRangeErrorMessage, "The error message to display the integer range is not visible.").toBeVisible();
  }
}
