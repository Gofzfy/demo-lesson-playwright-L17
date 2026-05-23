import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'

export class NotFoundPage extends BasePage {
  readonly container: Locator

  constructor(page: Page) {
    super(page, SERVICE_URL)
    this.container = this.page.getByTestId('orderNotFound-container')
  }

  async checkVisible(visible: boolean): Promise<void> {
    await expect(this.container).toBeVisible({ visible })
  }
}
