// Import utils
import testContext from '@utils/testContext';

// Import commonTests
import {createOrderByCustomerTest} from '@commonTests/FO/classic/order';

// Import pages
// Import BO pages
import orderMessagesPage from '@pages/BO/customerService/orderMessages';
import orderPageMessagesBlock from '@pages/BO/orders/view/messagesBlock';
// Import FO pages
import {orderHistoryPage} from '@pages/FO/classic/myAccount/orderHistory';

import {
  boDashboardPage,
  boLoginPage,
  boOrdersPage,
  type BrowserContext,
  dataCustomers,
  dataEmployees,
  dataPaymentMethods,
  dataProducts,
  FakerOrder,
  foClassicCheckoutOrderConfirmationPage,
  foClassicHomePage,
  foClassicLoginPage,
  foClassicMyAccountPage,
  type OrderHistoryMessage,
  type OrderMessage,
  type Page,
  utilsDate,
  utilsPlaywright,
} from '@prestashop-core/ui-testing';

import {expect} from 'chai';

const baseContext: string = 'functional_BO_orders_orders_viewAndEditOrder_messagesBlock';

/*
Pre-condition :
- Create order by default customer
Scenario :
- Go to view order page
- Send message and check message block( messages number, employee icon, date, sender)
- Check message in FO
- Uncheck display to customer and send message then check( messages number, message text, employee icon, date, sender)
- Check that the message is not visible in FO
- Send message from FO and check it on BO ( messages number, Message text, employee icon, date, sender)
- Check configure predefined message link
 */

describe('BO - Orders - View and edit order : Check messages block', async () => {
  let browserContext: BrowserContext;
  let page: Page;
  let textMessage: string = '';

  const today: string = utilsDate.getDateFormat('mm/dd/yyyy');
  const messageData: OrderMessage = {orderMessage: 'Delay', displayToCustomer: true, message: ''};
  const secondMessageData: OrderMessage = {orderMessage: 'Delay', displayToCustomer: false, message: 'test message visibility'};
  // New order by customer data
  const orderByCustomerData: FakerOrder = new FakerOrder({
    customer: dataCustomers.johnDoe,
    products: [
      {
        product: dataProducts.demo_1,
        quantity: 1,
      },
    ],
    paymentMethod: dataPaymentMethods.wirePayment,
  });
  const messageToSendData: OrderHistoryMessage = {product: '', message: 'Test customer message'};

  // Pre-condition - Create order by default customer
  createOrderByCustomerTest(orderByCustomerData, `${baseContext}_preTest_1`);

  // before and after functions
  before(async function () {
    browserContext = await utilsPlaywright.createBrowserContext(this.browser);
    page = await utilsPlaywright.newTab(browserContext);
  });

  after(async () => {
    await utilsPlaywright.closeBrowserContext(browserContext);
  });

  // 1 - Go to view order page
  describe('Go to view order page', async () => {
    it('should login in BO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'loginBO', baseContext);

      await boLoginPage.goTo(page, global.BO.URL);
      await boLoginPage.successLogin(page, global.BO.EMAIL, global.BO.PASSWD);

      const pageTitle = await boDashboardPage.getPageTitle(page);
      expect(pageTitle).to.contains(boDashboardPage.pageTitle);
    });

    it('should go to \'Orders > Orders\' page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToOrdersPage', baseContext);

      await boDashboardPage.goToSubMenu(
        page,
        boDashboardPage.ordersParentLink,
        boDashboardPage.ordersLink,
      );
      await boOrdersPage.closeSfToolBar(page);

      const pageTitle = await boOrdersPage.getPageTitle(page);
      expect(pageTitle).to.contains(boOrdersPage.pageTitle);
    });

    it('should reset all filters', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'resetOrderTableFilters1', baseContext);

      const numberOfOrders = await boOrdersPage.resetAndGetNumberOfLines(page);
      expect(numberOfOrders).to.be.above(0);
    });

    it(`should filter the Orders table by 'Customer: ${dataCustomers.johnDoe.lastName}'`, async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'filterByCustomer1', baseContext);

      await boOrdersPage.filterOrders(page, 'input', 'customer', dataCustomers.johnDoe.lastName);

      const textColumn = await boOrdersPage.getTextColumn(page, 'customer', 1);
      expect(textColumn).to.contains(dataCustomers.johnDoe.lastName);
    });

    it('should view the order', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'orderPageMessagesBlock1', baseContext);

      await boOrdersPage.goToOrder(page, 1);

      const pageTitle = await orderPageMessagesBlock.getPageTitle(page);
      expect(pageTitle).to.contains(orderPageMessagesBlock.pageTitle);
    });
  });

  // 2 - Send message and check messages block
  describe('Send message and check messages block on BO', async () => {
    it('should send message', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'sendMessage', baseContext);

      const textMessage = await orderPageMessagesBlock.sendMessage(page, messageData);
      expect(textMessage).to.equal(orderPageMessagesBlock.commentSuccessfullMessage);
    });

    it('should check that the messages number is equal to 1', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkMessageNumber1', baseContext);

      const messagesNumber = await orderPageMessagesBlock.getMessagesNumber(page);
      expect(messagesNumber).to.be.equal(1);
    });

    it('should check that the message is visible and get it', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkMessage1', baseContext);

      const isVisible = await orderPageMessagesBlock.isMessageVisible(page);
      expect(isVisible).to.eq(true);
    });

    it('should check the message sender and the date', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkSenderAndDate1', baseContext);

      textMessage = await orderPageMessagesBlock.getTextMessage(page);
      expect(textMessage).to.contains(`Me ${today}`);
    });

    it('should check the employee icon, the message date and the message sender', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkEmployeeIcon1', baseContext);

      const isVisible = await orderPageMessagesBlock.isEmployeeIconVisible(page);
      expect(isVisible).to.eq(true);
    });
  });

  // 3 - Check message in FO
  describe('Check message in FO', async () => {
    it('should view my shop', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToFoToCheckStatus1', baseContext);

      // Click on view my shop
      page = await orderPageMessagesBlock.viewMyShop(page);
      // Change FO language
      await foClassicHomePage.changeLanguage(page, 'en');

      const isHomePage = await foClassicHomePage.isHomePage(page);
      expect(isHomePage, 'Fail to open FO home page').to.eq(true);
    });

    it('should go to login page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToLoginPageFoToCheckStatus1', baseContext);

      await foClassicHomePage.goToLoginPage(page);

      const pageTitle = await foClassicLoginPage.getPageTitle(page);
      expect(pageTitle, 'Fail to open FO login page').to.contains(foClassicLoginPage.pageTitle);
    });

    it('should sign in with default customer', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'signInFo1', baseContext);

      await foClassicLoginPage.customerLogin(page, dataCustomers.johnDoe);

      const isCustomerConnected = await foClassicLoginPage.isCustomerConnected(page);
      expect(isCustomerConnected, 'Customer is not connected').to.eq(true);
    });

    it('should go to orders history page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToOrderHistoryPage1', baseContext);

      await foClassicHomePage.goToMyAccountPage(page);
      await foClassicMyAccountPage.goToHistoryAndDetailsPage(page);

      const pageTitle = await orderHistoryPage.getPageTitle(page);
      expect(pageTitle, 'Fail to open order history page').to.contains(orderHistoryPage.pageTitle);
    });

    it('should go to the first order in the list and check order message', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkOrderMessageBlock1', baseContext);

      await orderHistoryPage.goToDetailsPage(page, 1);

      const isBoxMessagesVisible = await orderHistoryPage.isBoxMessagesSectionVisible(page);
      expect(isBoxMessagesVisible, 'Box messages is not visible!').to.eq(true);

      const isMessageRowVisible = await orderHistoryPage.isMessageRowVisible(page);
      expect(isMessageRowVisible, 'Message is not visible!').to.eq(true);
    });

    it('should check the message text', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkOrderMessageBlock2', baseContext);

      const message = await orderHistoryPage.getMessageRow(page);
      expect(message)
        .to.contain(today)
        .and.to.contain(`${dataEmployees.defaultEmployee.firstName} ${dataEmployees.defaultEmployee.lastName}`)
        .and.to.contain(textMessage.substring(0, textMessage.indexOf('Me') - 1));
    });

    it('should sign out from FO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'signOutFO2', baseContext);

      await foClassicCheckoutOrderConfirmationPage.logout(page);

      const isCustomerConnected = await foClassicCheckoutOrderConfirmationPage.isCustomerConnected(page);
      expect(isCustomerConnected, 'Customer is connected').to.eq(false);
    });
  });

  // 4 - Send second message and uncheck display to customer
  describe('Uncheck display to customer and send message', async () => {
    it('should go back to BO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToBo1', baseContext);

      // Close page and init page objects
      page = await foClassicCheckoutOrderConfirmationPage.closePage(browserContext, page, 0);

      const pageTitle = await orderPageMessagesBlock.getPageTitle(page);
      expect(pageTitle).to.contains(orderPageMessagesBlock.pageTitle);
    });

    it('should send second message', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'sendMessage1', baseContext);

      const textMessage = await orderPageMessagesBlock.sendMessage(page, secondMessageData);
      expect(textMessage).to.equal(orderPageMessagesBlock.commentSuccessfullMessage);
    });

    it('should check that messages number is equal to 2', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkMessageNumber2', baseContext);

      const messagesNumber = await orderPageMessagesBlock.getMessagesNumber(page);
      expect(messagesNumber).to.be.equal(2);
    });

    it('should check that the second message is visible', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkMessage2', baseContext);

      const isVisible = await orderPageMessagesBlock.isMessageVisible(page, 2);
      expect(isVisible).to.eq(true);
    });

    it('should check that the employee icon is private', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkEmployeeIcon2', baseContext);

      const isVisible = await orderPageMessagesBlock.isEmployeePrivateIconVisible(page, 2);
      expect(isVisible).to.eq(true);
    });

    it('should check the sender message and the date', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkSenderAndDate2', baseContext);

      textMessage = await orderPageMessagesBlock.getTextMessage(page, 2);
      expect(textMessage, 'Sender or date is incorrect!').to.contains(`Me ${today}`);
    });
  });

  // 5 - Check that the second message is not visible on FO
  describe('Check that the second message is not visible on FO', async () => {
    it('should view my shop', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToFoToCheckStatus2', baseContext);

      // Click on view my shop
      page = await orderPageMessagesBlock.viewMyShop(page);
      // Change FO language
      await foClassicHomePage.changeLanguage(page, 'en');

      const isHomePage = await foClassicHomePage.isHomePage(page);
      expect(isHomePage, 'Fail to open FO home page').to.eq(true);
    });

    it('should go to login page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToLoginPageFoToCheckStatus2', baseContext);

      await foClassicHomePage.goToLoginPage(page);

      const pageTitle = await foClassicLoginPage.getPageTitle(page);
      expect(pageTitle, 'Fail to open FO login page').to.contains(foClassicLoginPage.pageTitle);
    });

    it('should sign in with default customer', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'signInFo2', baseContext);

      await foClassicLoginPage.customerLogin(page, dataCustomers.johnDoe);

      const isCustomerConnected = await foClassicLoginPage.isCustomerConnected(page);
      expect(isCustomerConnected, 'Customer is not connected').to.eq(true);
    });

    it('should go to orders history page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToOrderHistoryPage2', baseContext);

      await foClassicHomePage.goToMyAccountPage(page);
      await foClassicMyAccountPage.goToHistoryAndDetailsPage(page);

      const pageTitle = await orderHistoryPage.getPageTitle(page);
      expect(pageTitle, 'Fail to open order history page').to.contains(orderHistoryPage.pageTitle);
    });

    it('should go to the first order in the list and check that new message is not visible', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkOrderMessageBlock3', baseContext);

      await orderHistoryPage.goToDetailsPage(page, 1);

      // New message is on the first row
      const message = await orderHistoryPage.getMessageRow(page, 1);
      expect(message, 'Second message is not visible!').to.not.contain(secondMessageData.message);
    });
  });

  // 6 - Send message from FO and check it on BO
  describe('Send message from FO and check it on BO', async () => {
    it('should send message', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'sendMessage2', baseContext);

      const alertMessage = await orderHistoryPage.sendMessage(page, messageToSendData);
      expect(alertMessage, 'Success message is not displayed!').to.equal(orderHistoryPage.messageSuccessSent);
    });

    it('should go back to BO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToBo2', baseContext);

      // Close page and init page objects
      page = await orderHistoryPage.closePage(browserContext, page, 0);

      const pageTitle = await orderPageMessagesBlock.getPageTitle(page);
      expect(pageTitle, 'Fail to go back to BO!').to.contains(orderPageMessagesBlock.pageTitle);
    });

    it('should reload the page and check that the messages number is equal to 3', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkMessageNumber3', baseContext);

      await orderPageMessagesBlock.reloadPage(page);

      const messagesNumber = await orderPageMessagesBlock.getMessagesNumber(page);
      expect(messagesNumber, 'Messages number is not correct!').to.be.equal(3);
    });

    it('should check that the third message is visible', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkThirdMessage', baseContext);

      const isVisible = await orderPageMessagesBlock.isMessageVisible(page, 3, 'customer');
      expect(isVisible, 'Message is not visible!').to.eq(true);
    });

    it('should check the message, the sender message and the date', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkSenderAndDate3', baseContext);

      textMessage = await orderPageMessagesBlock.getTextMessage(page, 3, 'customer');
      expect(textMessage, 'Sender or date is not correct!')
        .to.contains(`${dataCustomers.johnDoe.firstName} ${dataCustomers.johnDoe.lastName} ${today}`)
        .and.to.contains(messageToSendData.message);
    });
  });

  // 7 - Check configure predefined message link
  describe('Check \'Configure predefined messages\' link', async () => {
    it('should click on \'Configure predefined messages\' link', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkLink', baseContext);

      await orderPageMessagesBlock.clickOnConfigureMessageLink(page);

      const pageTitle = await orderMessagesPage.getPageTitle(page);
      expect(pageTitle, 'Order messages page is not opened!').to.contains(orderMessagesPage.pageTitle);
    });
  });
});
