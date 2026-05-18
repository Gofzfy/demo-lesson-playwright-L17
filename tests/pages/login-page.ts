import { expect, Locator, Page } from '@playwright/test'
import { OrderPage } from './order-page'
import { SERVICE_URL } from '../../config/env-data'
import { BasePage } from './base-page'
import { Button } from '../atoms/Button'

export class LoginPage extends BasePage {
  readonly signInButton: Button
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly valError: Locator

  constructor(page: Page) {
    super(page, SERVICE_URL)
    this.signInButton = new Button(page.getByTestId('signIn-button'))
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    this.valError = page.getByTestId('username-input-error')
  }

  async signIn(username: string, password: string) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
    return new OrderPage(this.page)
  }

  async checkInnerComponents(): Promise<void> {
    await expect(this.usernameField).toBeVisible()
    await expect(this.passwordField).toBeVisible()
    await this.signInButton.checkVisible(true)
  }

  async checkValidationError(index: number, visible: boolean): Promise<void> {
    await expect(this.valError.nth(index)).toBeVisible({ visible })
  }

  async checkLoginBtnEnabled(enabled: boolean): Promise<void> {
    await this.signInButton.checkEnabled(enabled)
  }

  async validationByClassIndex(index: number): Promise<Locator> {
    return this.page
      .locator('[class="login__fieldset fieldset"]')
      .nth(index)
      .locator('[class*="form-error"]')
  }
}
