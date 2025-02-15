import { test, expect } from '@playwright/test';
import { RandomOrgCalendarPage } from '../Pages/Calendar';

test.beforeEach(async ({ page }) => {
  const calendarPage = new RandomOrgCalendarPage(page);
  await calendarPage.validatePageTitle("RANDOM.ORG - Calendar Date Generator");
});

