import { test } from '../fixtures/delivery.fixture'

test.describe('Mocked order flows', () => {
  test('Order creation with fixture', async ({ OrdersMocked }) => {
    await OrdersMocked.createOrder()
    await OrdersMocked.checkSuccessfullyCreatedPopup()
  })

  test('Find order with fixture', async ({ OrdersMocked, Details, orderId }) => {
    await OrdersMocked.checkOrderFound(Number(orderId))
    await Details.checkVisible(true)
  })

  test('Not-found order with fixture', async ({ Orders, NotFound }) => {
    await NotFound.open()
    await Orders.checkOrderNotFound()
    await NotFound.checkVisible(true)
  })

  test('Logout with fixture', async ({ OrdersMocked, Login }) => {
    await OrdersMocked.createOrder()
    await OrdersMocked.confirmationPopupOKButton.click()
    await OrdersMocked.logoutButton.click()
    await Login.checkInnerComponents()
  })
})
