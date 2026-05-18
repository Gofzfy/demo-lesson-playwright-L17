import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'

export class OrderDetailsPage extends BasePage {
  readonly details: Locator

  constructor(page: Page) {
    super(page, SERVICE_URL)
    this.details = this.page.locator('.order-details')
  }

  async checkVisible(visible: boolean): Promise<void> {
    await expect(this.details).toBeVisible({ visible })
  }
}
