import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

test('Login test plus order page status button check', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await expect(orderPage.statusButton).toBeVisible()
})

test('Login and order page components check', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkInnerComponents()
})

test('Create order test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.createOrder()
})

test('Validation test on order creation', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.nameInput.fill('1')
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.checkCreateOrderBtnEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill('2')
  await orderPage.checkCreateOrderBtnEnabled(false)

  await orderPage.nameInput.fill(faker.person.firstName())
  await orderPage.phoneInput.fill(faker.phone.number())
  await orderPage.checkCreateOrderBtnEnabled(true)
})

test('Logout test', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.logoutButton.click()
  await loginPage.checkInnerComponents()
})
