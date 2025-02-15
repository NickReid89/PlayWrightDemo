import { test } from '@playwright/test'
import { RandomOrgCalendarPage } from '../Pages/Calendar'
import faker from 'faker'

test.beforeEach(async ({ page }) => {
  const calendarPage = new RandomOrgCalendarPage(page);
  await calendarPage.navigateToCalendarPage()
});

test('Verify Random Date Picker is working', async ({ page }) => {
  const calendarPage = new RandomOrgCalendarPage(page)

  await test.step('Set the amount of dates to generate', async () => {
    await calendarPage.setAmountOfDatesToGenerate(4)
  });

  await test.step('Set the initial date in the first date picker', async () => {
    await calendarPage.setStartDate(5, "January", 2024)
  });

  await test.step('Set the final date in the second date picker', async () => {
    await calendarPage.setEndDate(25, "November", 2025)
  });

  await test.step('Click the "Get Dates" button', async () => {
    await calendarPage.getDatesButton.click()
  });

  await test.step('Verify the dates are displayed', async () => {
    await calendarPage.validateDateResultHeader(4)
    await calendarPage.validateDatesAreGeneratedCorrectly()
  });
});


  test('Verify Maximum quantity for the Random Date Picker is working', async ({ page }) => {
    const calendarPage = new RandomOrgCalendarPage(page)

    await test.step('Set the amount of dates to generate', async () => {
      await calendarPage.setAmountOfDatesToGenerate(25)
    });

    await test.step('Set the initial date in the first date picker', async () => {
      await calendarPage.setStartDate(5, "January", 2024)
    });

    await test.step('Set the final date in the second date picker', async () => {
      await calendarPage.setEndDate(25, "November", 2025)
    });

    await test.step('Click the "Get Dates" button', async () => {
      await calendarPage.getDatesButton.click()
    });

    await test.step('Verify the dates are displayed', async () => {
      await calendarPage.validateDateResultHeader(25)
      await calendarPage.validateDatesAreGeneratedCorrectly()
    });
  });

  test('Verify Minimum quantity for the Random Date Picker is working', async ({ page }) => {
    const calendarPage = new RandomOrgCalendarPage(page)

    await test.step('Set the amount of dates to generate', async () => {
      await calendarPage.setAmountOfDatesToGenerate(1)
    });

    await test.step('Set the initial date in the first date picker', async () => {
      await calendarPage.setStartDate(5, "January", 2024)
    });

    await test.step('Set the final date in the second date picker', async () => {
      await calendarPage.setEndDate(25, "November", 2025)
    });

    await test.step('Click the "Get Dates" button', async () => {
      await calendarPage.getDatesButton.click()
    });

    await test.step('Verify the dates are displayed', async () => {
      await calendarPage.validateDateResultHeader(1)
      await calendarPage.validateDatesAreGeneratedCorrectly()
    });
  });

  test('Verify values under 1 quantity for the Random Date Picker will throw an error', async ({ page }) => {
    const calendarPage = new RandomOrgCalendarPage(page)

    await test.step('Set the amount of dates to generate', async () => {
      await calendarPage.setAmountOfDatesToGenerate(0)
    });

    await test.step('Set the initial date in the first date picker', async () => {
      await calendarPage.setStartDate(5, "January", 2024)
    });

    await test.step('Set the final date in the second date picker', async () => {
      await calendarPage.setEndDate(25, "November", 2025)
    });

    await test.step('Click the "Get Dates" button', async () => {
      await calendarPage.getDatesButton.click()
    });

    await test.step('Verify the error message is displayed', async () => {
      await calendarPage.validateErrorMessage();
    });
  });

  test('Verify values over 25 quantity for the Random Date Picker will throw an error', async ({ page }) => {
    const calendarPage = new RandomOrgCalendarPage(page)

    await test.step('Set the amount of dates to generate', async () => {
      await calendarPage.setAmountOfDatesToGenerate(26)
    });

    await test.step('Set the initial date in the first date picker', async () => {
      await calendarPage.setStartDate(5, "January", 2024)
    });

    await test.step('Set the final date in the second date picker', async () => {
      await calendarPage.setEndDate(25, "November", 2025)
    });

    await test.step('Click the "Get Dates" button', async () => {
      await calendarPage.getDatesButton.click()
    });

    await test.step('Verify the error message is displayed', async () => {
      await calendarPage.validateErrorMessage();
    });
  });

  test('Verify a random value between 1 and 25 (Inclusive) quantity for the Random Date Picker will throw an error', async ({ page }) => {
    const calendarPage = new RandomOrgCalendarPage(page)
    var quantityAmount = faker.datatype.number({ min: 1, max: 25 })

    await test.step('Set the amount of dates to generate', async () => {
      await calendarPage.setAmountOfDatesToGenerate(quantityAmount)
    });

    await test.step('Set the initial date in the first date picker', async () => {
      await calendarPage.setStartDate(5, "January", 2024)
    });

    await test.step('Set the final date in the second date picker', async () => {
      await calendarPage.setEndDate(25, "November", 2025)
    });

    await test.step('Click the "Get Dates" button', async () => {
      await calendarPage.getDatesButton.click()
    });

    await test.step('Verify the dates are displayed', async () => {
      await calendarPage.validateDateResultHeader(quantityAmount)
      await calendarPage.validateDatesAreGeneratedCorrectly()
    });
  });
