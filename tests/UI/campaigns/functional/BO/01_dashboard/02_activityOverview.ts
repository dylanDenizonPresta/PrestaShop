// Import utils
import helper from '@utils/helpers';
import testContext from '@utils/testContext';

// Import BO pages
import dashboardPage from '@pages/BO/dashboard';
import statsPage from '@pages/BO/stats';
import shoppingCartsPage from '@pages/BO/orders/shoppingCarts';
import ordersPage from '@pages/BO/orders';
import {viewOrderBasePage} from '@pages/BO/orders/view/viewOrderBasePage';
import merchandiseReturnsPage from '@pages/BO/customerService/merchandiseReturns';
import monitoringPage from '@pages/BO/catalog/monitoring';
import productsPage from '@pages/BO/catalog/productsV2';
import createProductPage from '@pages/BO/catalog/productsV2/add';
import customerServicePage from '@pages/BO/customerService/customerService';
import productCommentsPage from '@pages/BO/modules/productComments';
import newsletterSubscriptionPage from '@pages/BO/modules/psEmailSubscription';
import customersPage from '@pages/BO/customers';

// Import FO pages
import {homePage} from '@pages/FO/home';
import {loginPage as foLoginPage} from '@pages/FO/login';
import productPage from '@pages/FO/product';
import {cartPage} from '@pages/FO/cart';
import checkoutPage from '@pages/FO/checkout';
import orderConfirmationPage from '@pages/FO/checkout/orderConfirmation';
import {myAccountPage} from '@pages/FO/myAccount';
import {orderHistoryPage} from '@pages/FO/myAccount/orderHistory';
import orderDetailsPage from '@pages/FO/myAccount/orderDetails';
import foMerchandiseReturnsPage from '@pages/FO/myAccount/merchandiseReturns';
import {contactUsPage} from '@pages/FO/contactUs';
import addCustomerPage from '@pages/BO/customers/add';

// Import common tests
import loginCommon from '@commonTests/BO/loginBO';
import {enableMerchandiseReturns, disableMerchandiseReturns} from '@commonTests/BO/customerService/merchandiseReturns';
import {deleteProductV2Test} from '@commonTests/BO/catalog/product';
import {deleteCustomerTest} from '@commonTests/BO/customers/customer';

// Import data
import Customers from '@data/demo/customers';
import PaymentMethods from '@data/demo/paymentMethods';
import OrderStatuses from '@data/demo/orderStatuses';
import Orders from '@data/demo/orders';
import ProductData from '@data/faker/product';
import MessageData from '@data/faker/message';
import CustomerData from '@data/faker/customer';

import {expect} from 'chai';
import type {BrowserContext, Page} from 'playwright';

const baseContext: string = 'functional_BO_dashboard_activityOverview';

describe('BO - Dashboard : Activity overview', async () => {
  let browserContext: BrowserContext;
  let page: Page;
  let activeShoppingCarts: number;
  let numberOfReturnExchanges: number;
  let ordersNumber: number;
  let outOfStockProductNumber: number;
  let messagesNumber: number;
  let newCustomersNumber: number;
  let newSubscriptionsNumber: number;
  let totalSubscribersNumber: number;

  // Data to create product out of stock
  const productData: ProductData = new ProductData({
    type: 'standard',
    quantity: 0,
    status: true,
  });

  const contactUsData: MessageData = new MessageData({
    firstName: Customers.johnDoe.firstName,
    lastName: Customers.johnDoe.lastName,
    subject: 'Customer service',
    emailAddress: Customers.johnDoe.email,
    reference: Orders.firstOrder.reference,
  });

  const createCustomerData: CustomerData = new CustomerData({newsletter: true});

  enableMerchandiseReturns(baseContext);

  // before and after functions
  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);
    page = await helper.newTab(browserContext);
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  describe('Check Online visitor & Active shopping carts', async () => {
    it('should login in BO', async function () {
      await loginCommon.loginBO(this, page);
    });

    it('should click on Online visitor link and check stats page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnlineVisitors', baseContext);

      await dashboardPage.clickOnOnlineVisitorsLink(page);

      const pageTitle = await statsPage.getPageTitle(page);
      expect(pageTitle).to.eq(statsPage.pageTitle);
    });

    it('should go back to dashboard page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard', baseContext);

      await statsPage.goToDashboardPage(page);

      const pageTitle = await dashboardPage.getPageTitle(page);
      expect(pageTitle).to.eq(dashboardPage.pageTitle);
    });

    it('should click on Active shopping carts link and check shopping carts page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickActiveShoppingCarts', baseContext);

      await dashboardPage.clickOnActiveShoppingCartsLink(page);

      const pageTitle = await shoppingCartsPage.getPageTitle(page);
      expect(pageTitle).to.eq(shoppingCartsPage.pageTitle);
    });

    it('should go back to dashboard page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

      await shoppingCartsPage.goToDashboardPage(page);

      const pageTitle = await dashboardPage.getPageTitle(page);
      expect(pageTitle).to.eq(dashboardPage.pageTitle);
    });

    it('should get the number of active shopping carts', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'getNumberOfActiveShoppingCarts', baseContext);

      activeShoppingCarts = await dashboardPage.getActiveShoppingCarts(page);
    });
  });

  describe('Create new order and check Active shopping carts number', async () => {
    it('should view my shop', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToFO', baseContext);

      page = await dashboardPage.viewMyShop(page);
      await homePage.changeLanguage(page, 'en');

      const isHomePage = await homePage.isHomePage(page);
      expect(isHomePage, 'Fail to open FO home page').to.eq(true);
    });

    it('should go to login page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToLoginFO', baseContext);

      await homePage.goToLoginPage(page);

      const pageTitle = await foLoginPage.getPageTitle(page);
      expect(pageTitle, 'Fail to open FO login page').to.contains(foLoginPage.pageTitle);
    });

    it('should sign in with default customer', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'sighInFO', baseContext);

      await foLoginPage.customerLogin(page, Customers.johnDoe);

      const isCustomerConnected = await foLoginPage.isCustomerConnected(page);
      expect(isCustomerConnected, 'Customer is not connected').to.eq(true);
    });

    it('should add product to cart', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'addProductToCart', baseContext);

      // Go to home page
      await foLoginPage.goToHomePage(page);
      // Go to the first product page
      await homePage.goToProductPage(page, 1);
      // Add the product to the cart
      await productPage.addProductToTheCart(page);

      const notificationsNumber = await cartPage.getCartNotificationsNumber(page);
      expect(notificationsNumber).to.be.equal(1);
    });

    it('should go to delivery step', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToDeliveryStep', baseContext);

      // Proceed to checkout the shopping cart
      await cartPage.clickOnProceedToCheckout(page);

      // Address step - Go to delivery step
      const isStepAddressComplete = await checkoutPage.goToDeliveryStep(page);
      expect(isStepAddressComplete, 'Step Address is not complete').to.eq(true);
    });

    it('should go to payment step', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goToPaymentStep', baseContext);

      // Delivery step - Go to payment step
      const isStepDeliveryComplete = await checkoutPage.goToPaymentStep(page);
      expect(isStepDeliveryComplete, 'Step Address is not complete').to.eq(true);
    });

    it('should choose payment method and confirm the order', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'confirmOrder', baseContext);

      // Payment step - Choose payment step
      await checkoutPage.choosePaymentAndOrder(page, PaymentMethods.wirePayment.moduleName);

      // Check the confirmation message
      const cardTitle = await orderConfirmationPage.getOrderConfirmationCardTitle(page);
      expect(cardTitle).to.contains(orderConfirmationPage.orderConfirmationCardTitle);
    });

    it('should go back to BO', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToBo', baseContext);

      // Close page and init page objects
      page = await orderConfirmationPage.closePage(browserContext, page, 0);
      await shoppingCartsPage.reloadPage(page);

      const pageTitle = await dashboardPage.getPageTitle(page);
      expect(pageTitle).to.contains(dashboardPage.pageTitle);
    });

    it('should check the number of active shopping carts', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkActiveShoppingCarts', baseContext);

      const newActiveShoppingCarts = await dashboardPage.getActiveShoppingCarts(page);
      expect(newActiveShoppingCarts).to.eq(activeShoppingCarts + 1);
    });
  });

  describe('Check currently pending block', async () => {
    describe('Check orders', async () => {
      it('should get Orders number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getOrdersNumber', baseContext);

        ordersNumber = await dashboardPage.getOrdersNumber(page);
      });

      it('should click on Orders link', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'clickOnOrdersLink', baseContext);

        await dashboardPage.clickOnOrdersLink(page);

        const pageTitle = await ordersPage.getPageTitle(page);
        expect(pageTitle).to.contains(ordersPage.pageTitle);
      });

      it('should change the first order status to Processing in progress', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'changeOrderStatus1', baseContext);

        const textResult = await ordersPage.setOrderStatus(page, 1, OrderStatuses.processingInProgress);
        expect(textResult).to.equal(ordersPage.successfulUpdateMessage);
      });

      it('should go back to dashboard page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

        await shoppingCartsPage.goToDashboardPage(page);

        const pageTitle = await dashboardPage.getPageTitle(page);
        expect(pageTitle).to.eq(dashboardPage.pageTitle);
      });

      it('should check Orders number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getOrdersNumber', baseContext);

        const newOrdersNumber = await dashboardPage.getOrdersNumber(page);
        expect(newOrdersNumber).to.eq(ordersNumber + 1);
      });
    });

    describe('Check Return/Exchanges', async () => {
      it('should get Return/Exchange number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getReturnExchangeNumber', baseContext);

        numberOfReturnExchanges = await dashboardPage.getReturnExchangeNumber(page);
      });

      it('should click on Return/Exchange link', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'clickOnReturnExchangeLink', baseContext);

        await dashboardPage.clickOnReturnExchangeLink(page);

        const pageTitle = await merchandiseReturnsPage.getPageTitle(page);
        expect(pageTitle).to.contains(merchandiseReturnsPage.pageTitle);
      });

      it('should go to orders page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goToOrdersPage', baseContext);

        await dashboardPage.goToSubMenu(
          page,
          dashboardPage.ordersParentLink,
          dashboardPage.ordersLink,
        );

        const pageTitle = await ordersPage.getPageTitle(page);
        expect(pageTitle).to.contains(ordersPage.pageTitle);
      });

      it('should change the first order status to Delivered', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'changeOrderStatus2', baseContext);

        const textResult = await ordersPage.setOrderStatus(page, 1, OrderStatuses.delivered);
        expect(textResult).to.equal(ordersPage.successfulUpdateMessage);
      });

      it('should go back to dashboard page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard3', baseContext);

        await shoppingCartsPage.goToDashboardPage(page);

        const pageTitle = await dashboardPage.getPageTitle(page);
        expect(pageTitle).to.eq(dashboardPage.pageTitle);
      });

      it('should view my shop', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'viewMyShop', baseContext);

        page = await viewOrderBasePage.viewMyShop(page);
        await homePage.changeLanguage(page, 'en');

        const isHomePage = await homePage.isHomePage(page);
        expect(isHomePage, 'Home page is not displayed').to.eq(true);
      });

      it('should go to account page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goToAccountPage', baseContext);

        await homePage.goToMyAccountPage(page);

        const pageTitle = await myAccountPage.getPageTitle(page);
        expect(pageTitle).to.contains(myAccountPage.pageTitle);
      });

      it('should go to \'Order history and details\' page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goToOrderHistoryPage', baseContext);

        await myAccountPage.goToHistoryAndDetailsPage(page);

        const pageTitle = await orderHistoryPage.getPageTitle(page);
        expect(pageTitle).to.contains(orderHistoryPage.pageTitle);
      });

      it('should go to the first order in the list and check the existence of order return form', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'isOrderReturnFormVisible', baseContext);

        await orderHistoryPage.goToDetailsPage(page, 1);

        const result = await orderDetailsPage.isOrderReturnFormVisible(page);
        expect(result).to.eq(true);
      });

      it('should create a merchandise return', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'createMerchandiseReturn', baseContext);

        await orderDetailsPage.requestMerchandiseReturn(page, 'test', 1, [{quantity: 1}]);

        const pageTitle = await foMerchandiseReturnsPage.getPageTitle(page);
        expect(pageTitle).to.contains(foMerchandiseReturnsPage.pageTitle);
      });

      it('should close the FO page and go back to BO', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'closeFoAndGoBackToBO', baseContext);

        page = await orderDetailsPage.closePage(browserContext, page, 0);
        await dashboardPage.reloadPage(page);

        const pageTitle = await dashboardPage.getPageTitle(page);
        expect(pageTitle).to.contains(dashboardPage.pageTitle);
      });

      // @todo
      it.skip('should check Return/Exchange number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getReturnExchangeNumber', baseContext);

        const newNumberOfReturnExchanges = await dashboardPage.getReturnExchangeNumber(page);
        expect(newNumberOfReturnExchanges).to.eq(numberOfReturnExchanges + 1);
      });
    });

    describe('Check Abandoned carts', async () => {
      it('should check Abandoned carts number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getAbandonedCartsNumber', baseContext);

        const abandonedCartsNumber = await dashboardPage.getAbandonedCartsNumber(page);
        expect(abandonedCartsNumber).to.eq(0);
      });

      it('should click on Abandoned carts link', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'clickAbandonedCartsLink', baseContext);

        await dashboardPage.clickOnAbandonedCartsLink(page);

        const pageTitle = await shoppingCartsPage.getPageTitle(page);
        expect(pageTitle).to.contains(shoppingCartsPage.pageTitle);
      });
    });

    describe('Check out of stock products', async () => {
      it('should go back to dashboard page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

        await shoppingCartsPage.goToDashboardPage(page);

        const pageTitle = await dashboardPage.getPageTitle(page);
        expect(pageTitle).to.eq(dashboardPage.pageTitle);
      });

      it('should get out of stock products number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getOutOfStockProducts', baseContext);

        outOfStockProductNumber = await dashboardPage.getOutOfStockProducts(page);
      });

      it('should click on Abandoned carts link', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'clickAbandonedCartsLink', baseContext);

        await dashboardPage.clickOnOutOfStockProductsLink(page);

        const pageTitle = await monitoringPage.getPageTitle(page);
        expect(pageTitle).to.contains(monitoringPage.pageTitle);
      });

      it('should go to \'Catalog > Products\' page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goToProductsPage', baseContext);

        await dashboardPage.goToSubMenu(
          page,
          dashboardPage.catalogParentLink,
          dashboardPage.productsLink,
        );
        await productsPage.closeSfToolBar(page);

        const pageTitle = await productsPage.getPageTitle(page);
        expect(pageTitle).to.contains(productsPage.pageTitle);
      });

      it('should click on \'New product\' button and check new product modal', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'clickOnNewProductButton', baseContext);

        const isModalVisible = await productsPage.clickOnNewProductButton(page);
        expect(isModalVisible).to.eq(true);
      });

      it('should choose \'Standard product\' and go to new product page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'chooseStandardProduct', baseContext);

        await productsPage.selectProductType(page, productData.type);
        await productsPage.clickOnAddNewProduct(page);

        const pageTitle = await createProductPage.getPageTitle(page);
        expect(pageTitle).to.contains(createProductPage.pageTitle);
      });

      it('should create out of stock product', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'createStandardProduct', baseContext);

        const createProductMessage = await createProductPage.setProduct(page, productData);
        expect(createProductMessage).to.equal(createProductPage.successfulUpdateMessage);
      });

      it('should go back to dashboard page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

        await shoppingCartsPage.goToDashboardPage(page);

        const pageTitle = await dashboardPage.getPageTitle(page);
        expect(pageTitle).to.eq(dashboardPage.pageTitle);
      });

      it('should check out of stock products number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'checkOutOfStockProductsNumber', baseContext);

        const newOutOfStockProductNumber = await dashboardPage.getOutOfStockProducts(page);
        expect(newOutOfStockProductNumber).to.eq(outOfStockProductNumber + 1);
      });
    });
  });

  describe('Check notifications', async () => {
    describe('Check new messages', async () => {
      it('should get new message number', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getNewMessagesNumber', baseContext);

        messagesNumber = await dashboardPage.getNewMessagesNumber(page);
      });

      it('should click on New messages link', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'clickOnNewMessagesLink', baseContext);

        await dashboardPage.clickOnNewMessagesLink(page);

        const pageTitle = await customerServicePage.getPageTitle(page);
        expect(pageTitle).to.contains(customerServicePage.pageTitle);
      });

      it('should view my store', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goToFO', baseContext);

        page = await dashboardPage.viewMyShop(page);
        await homePage.changeLanguage(page, 'en');

        const isHomePage = await homePage.isHomePage(page);
        expect(isHomePage, 'Fail to open FO home page').to.eq(true);
      });

      it('should to contact us page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goOnContactPage', baseContext);

        await homePage.goToFooterLink(page, 'Contact us');

        const pageTitle = await contactUsPage.getPageTitle(page);
        expect(pageTitle).to.equal(contactUsPage.pageTitle);
      });

      it('should send message to customer service', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'sendMessage', baseContext);

        await contactUsPage.sendMessage(page, contactUsData);

        const validationMessage = await contactUsPage.getAlertSuccess(page);
        expect(validationMessage).to.equal(contactUsPage.validationMessage);
      });

      it('should go back to BO', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goBackToBo', baseContext);

        page = await contactUsPage.closePage(browserContext, page, 0);

        const pageTitle = await dashboardPage.getPageTitle(page);
        expect(pageTitle).to.contains(dashboardPage.pageTitle);
      });

      it('should go back to dashboard page', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

        await shoppingCartsPage.goToDashboardPage(page);

        const pageTitle = await dashboardPage.getPageTitle(page);
        expect(pageTitle).to.eq(dashboardPage.pageTitle);
      });

      it('should check the number of new messages', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'checkNumberOfNewMessages', baseContext);

        const newMessagesNumber = await dashboardPage.getNewMessagesNumber(page);
        expect(newMessagesNumber).to.eq(messagesNumber + 1);
      });
    });

    describe('Check Product reviews', async () => {
      it('should get the number of product reviews', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getNumberOfProductReviews', baseContext);

        const productReviewsNumber = await dashboardPage.getProductReviewsNumber(page);
        expect(productReviewsNumber).to.eq(0);
      });

      it('should click on Products reviews link', async function () {
        await testContext.addContextItem(this, 'testIdentifier', 'getNumberOfProductReviews', baseContext);

        await dashboardPage.clickOnProductReviewsLink(page);

        const pageTitle = await productCommentsPage.getPageSubTitle(page);
        expect(pageTitle).to.eq(productCommentsPage.pageTitle);
      });
    });
  });

  describe('Check Customers & Newsletters', async () => {
    it('should go back to dashboard page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

      await shoppingCartsPage.goToDashboardPage(page);

      const pageTitle = await dashboardPage.getPageTitle(page);
      expect(pageTitle).to.eq(dashboardPage.pageTitle);
    });

    it('should get the number of customers', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'getNumberOfCustomers', baseContext);

      newCustomersNumber = await dashboardPage.getNewCustomersNumber(page);
    });

    it('should get the number of new subscriptions', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'getNumberOfNewSubscriptions', baseContext);

      newSubscriptionsNumber = await dashboardPage.getNewSubscriptionsNumber(page);
    });

    it('should get the number of total subscribers', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'getNumberOfTotalSubscribers', baseContext);

      totalSubscribersNumber = await dashboardPage.getTotalSubscribersNumber(page);
    });

    it('should click on New customers link', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnNewCustomersLink', baseContext);

      await dashboardPage.clickOnNewCustomersLink(page);

      const pageTitle = await customersPage.getPageTitle(page);
      expect(pageTitle).to.eq(customersPage.pageTitle);
    });

    it('should create new customer', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'createNewCustomer', baseContext);

      await customersPage.goToAddNewCustomerPage(page);

      const textResult = await addCustomerPage.createEditCustomer(page, createCustomerData);
      expect(textResult).to.equal(customersPage.successfulCreationMessage);
    });

    it('should go back to dashboard page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

      await shoppingCartsPage.goToDashboardPage(page);

      const pageTitle = await dashboardPage.getPageTitle(page);
      expect(pageTitle).to.eq(dashboardPage.pageTitle);
    });

    it('should check the number of new customers', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkNumberOfNewCustomer', baseContext);

      const newCustomers = await dashboardPage.getNewCustomersNumber(page);
      expect(newCustomers).to.eq(newCustomersNumber + 1);
    });

    it('should the number of new subscriptions', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkNumberOfNewSubscriptions', baseContext);

      const newSubscriptions = await dashboardPage.getNewSubscriptionsNumber(page);
      expect(newSubscriptions).to.eq(newSubscriptionsNumber + 1);
    });

    it('should click on new subscriptions link', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnNewSubscriptionsLink', baseContext);

      await dashboardPage.clickOnNewSubscriptionsLink(page);

      const pageTitle = await statsPage.getPageTitle(page);
      expect(pageTitle).to.eq(statsPage.pageTitle);
    });

    it('should go back to dashboard page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

      await shoppingCartsPage.goToDashboardPage(page);

      const pageTitle = await dashboardPage.getPageTitle(page);
      expect(pageTitle).to.eq(dashboardPage.pageTitle);
    });

    it('should check the number of total subscribers', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'checkNumberOfTotalSubscribers', baseContext);

      const newTotalSubscribers = await dashboardPage.getTotalSubscribersNumber(page);
      expect(newTotalSubscribers).to.eq(totalSubscribersNumber + 1);
    });

    it('should click on Total subscribers link', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'clickOnTotalSubscribersLink', baseContext);

      await dashboardPage.clickOnTotalSubscribersLink(page);

      const pageTitle = await newsletterSubscriptionPage.getPageSubTitle(page);
      expect(pageTitle).to.eq(newsletterSubscriptionPage.pageTitle);
    });

    it('should go back to dashboard page', async function () {
      await testContext.addContextItem(this, 'testIdentifier', 'goBackToDashboard2', baseContext);

      await shoppingCartsPage.goToDashboardPage(page);

      const pageTitle = await dashboardPage.getPageTitle(page);
      expect(pageTitle).to.eq(dashboardPage.pageTitle);
    });
  });

  describe('Check Traffic', async () => {

  });

  // Post-condition : Delete created customer
  deleteCustomerTest(createCustomerData, baseContext);

  // Post-condition : Delete created product
  deleteProductV2Test(productData, baseContext);

  // Post-condition : Disable merchandise returns
  disableMerchandiseReturns(baseContext);
});
