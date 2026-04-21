import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'

test.describe('Homework 17: Additional tests practice', () => {
  test('Login page username input validation', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.usernameField.fill('1')
    await loginPage.checkValidationError(0, true)
    await loginPage.checkLoginBtnEnabled(false)
    await loginPage.usernameField.fill(faker.person.firstName())
    await loginPage.checkValidationError(0, false)
    await loginPage.checkLoginBtnEnabled(false)
  })

  test('Login page password input validation', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.passwordField.fill('1')
    await loginPage.checkValidationError(1, true)
    await loginPage.checkLoginBtnEnabled(false)
    await loginPage.passwordField.fill(faker.word.sample(8))
    await loginPage.checkValidationError(1, false)
    await loginPage.checkLoginBtnEnabled(false)
  })

  test('Login page username and password input validation', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.usernameField.fill('1')
    await loginPage.passwordField.fill('1')
    await loginPage.checkValidationError(0, true)
    await loginPage.checkValidationError(1, true)
    await loginPage.checkLoginBtnEnabled(false)
  })

  test('Login validation trough DOM tree navigation + index', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    const userValidation = await loginPage.validationByClassIndex(0)
    await loginPage.usernameField.fill('1')
    await expect(userValidation).toHaveClass('form-error form-error_active')
    await loginPage.usernameField.fill('123')
    await expect(userValidation).toHaveClass('form-error undefined')

    const passwordValidation = await loginPage.validationByClassIndex(1)
    await loginPage.passwordField.fill('12345678')
    await expect(passwordValidation).toHaveClass('form-error undefined')
    await loginPage.passwordField.fill('1')
    await expect(passwordValidation).toHaveClass('form-error form-error_active')
  })
})
