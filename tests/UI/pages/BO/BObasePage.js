require('module-alias/register');
const CommonPage = require('@pages/commonPage');

/**
 * BO parent page, contains functions that can be used on all BO page
 * @class
 * @extends CommonPage
 */
class BOBasePage extends CommonPage {
  /**
   * @constructs
   * Setting up texts and selectors to use on all BO pages
   */
  constructor() {
    super();

    // Successful Messages
    this.successfulCreationMessage = 'Successful creation';
    this.successfulUpdateMessage = 'Successful update';
    this.successfulDeleteMessage = 'Successful deletion';
    this.successfulMultiDeleteMessage = 'The selection has been successfully deleted';

    // Access denied message
    this.accessDeniedMessage = 'Access denied';
    this.pageNotFoundMessage = 'Page not found';

    // top navbar
    this.userProfileIconNonMigratedPages = '#employee_infos';
    this.userProfileIcon = '#header_infos #header-employee-container';
    this.userProfileFirstname = '.employee-wrapper-avatar .employee_profile';
    this.userProfileAvatar = '.employee-avatar img';
    this.userProfileYourProfileLinkNonMigratedPages = '.employee-wrapper-profile > a.admin-link';
    this.userProfileYourProfileLink = '.employee-link.profile-link';
    this.userProfileLogoutLink = 'a#header_logout';
    this.shopVersionBloc = '#shop_version';
    this.headerShopNameLink = '#header_shopname';
    this.quickAccessDropdownToggle = '#quick_select';
    this.quickAccessLink = (idLink) => `.quick-row-link:nth-child(${idLink})`;
    this.quickAddCurrentLink = '#quick-add-link';
    this.quickAccessRemoveLink = '#quick-remove-link';
    this.manageYourQuickAccessLink = '#quick-manage-link';
    this.navbarSarchInput = '#bo_query';

    // Header links
    this.helpButton = '#product_form_open_help';
    this.menuMobileButton = '.js-mobile-menu';

    // left navbar
    this.desktopNavbar = '.nav-bar:not(.mobile-nav)';
    this.navbarCollapseButton = '.nav-bar > .menu-collapse';
    this.navbarCollapsed = isCollapsed => `body${isCollapsed ? '.page-sidebar-closed' : ':not(.page-sidebar-closed)'}`;

    // Dashboard
    this.dashboardLink = '#tab-AdminDashboard';

    // SELL
    // Orders
    this.ordersParentLink = 'li#subtab-AdminParentOrders';
    this.ordersLink = '#subtab-AdminOrders';
    // Invoices
    this.invoicesLink = '#subtab-AdminInvoices';
    // Credit slips
    this.creditSlipsLink = '#subtab-AdminSlip';
    // Delivery slips
    this.deliverySlipslink = '#subtab-AdminDeliverySlip';
    // Shopping carts
    this.shoppingCartsLink = '#subtab-AdminCarts';

    // Catalog
    this.catalogParentLink = 'li#subtab-AdminCatalog';
    // Products
    this.productsLink = '#subtab-AdminProducts';
    // Categories
    this.categoriesLink = '#subtab-AdminCategories';
    // Monitoring
    this.monitoringLink = '#subtab-AdminTracking';
    // Attributes and Features
    this.attributesAndFeaturesLink = '#subtab-AdminParentAttributesGroups';
    // Brands And Suppliers
    this.brandsAndSuppliersLink = '#subtab-AdminParentManufacturers';
    // files
    this.filesLink = '#subtab-AdminAttachments';
    // Discounts
    this.discountsLink = '#subtab-AdminParentCartRules';
    // Stocks
    this.stocksLink = '#subtab-AdminStockManagement';

    // Customers
    this.customersParentLink = 'li#subtab-AdminParentCustomer';
    this.customersLink = '#subtab-AdminCustomers';
    this.addressesLink = '#subtab-AdminAddresses';
    this.outstandingLink = '#subtab-AdminOutstanding';

    // Customer Service
    this.customerServiceParentLink = '#subtab-AdminParentCustomerThreads';
    this.customerServiceLink = '#subtab-AdminCustomerThreads';
    // Order Messages
    this.orderMessagesLink = '#subtab-AdminOrderMessage';
    // Merchandise returns
    this.merchandiseReturnsLink = '#subtab-AdminReturn';

    // Improve
    // Modules
    this.modulesParentLink = '#subtab-AdminParentModulesSf';
    this.moduleCatalogueLink = '#subtab-AdminParentModulesCatalog';
    this.moduleManagerLink = '#subtab-AdminModulesSf';

    // Design
    this.designParentLink = '#subtab-AdminParentThemes';
    // Theme & Logo
    this.themeAndLogoParentLink = '#subtab-AdminThemesParent';
    // Email theme
    this.emailThemeLink = '#subtab-AdminParentMailTheme';
    // Pages
    this.pagesLink = '#subtab-AdminCmsContent';
    // Positions
    this.positionsLink = '#subtab-AdminModulesPositions';
    // Image settings
    this.imageSettingsLink = '#subtab-AdminImages';
    // Link widget
    this.linkWidgetLink = '#subtab-AdminLinkWidget';

    // Shipping
    this.shippingLink = '#subtab-AdminParentShipping';
    this.carriersLink = '#subtab-AdminCarriers';
    this.shippingPreferencesLink = '#subtab-AdminShipping';

    // Payment
    this.paymentParentLink = '#subtab-AdminParentPayment';
    // Preferences
    this.paymentMethodsLink = '#subtab-AdminPayment';
    // Preferences
    this.preferencesLink = '#subtab-AdminPaymentPreferences';

    // International
    this.internationalParentLink = '#subtab-AdminInternational';
    // Taxes
    this.taxesLink = '#subtab-AdminParentTaxes';
    // Localization
    this.localizationLink = '#subtab-AdminParentLocalization';
    // Locations
    this.locationsLink = '#subtab-AdminParentCountries';
    // Translations
    this.translationsLink = '#subtab-AdminTranslations';

    // Shop Parameters
    this.shopParametersParentLink = '#subtab-ShopParameters';
    // General
    this.shopParametersGeneralLink = '#subtab-AdminParentPreferences';
    // Order Settings
    this.orderSettingsLink = '#subtab-AdminParentOrderPreferences';
    // Product Settings
    this.productSettingsLink = '#subtab-AdminPPreferences';
    // Customer Settings
    this.customerSettingsLink = '#subtab-AdminParentCustomerPreferences';
    // Contact
    this.contactLink = '#subtab-AdminParentStores';
    // traffic and SEO
    this.trafficAndSeoLink = '#subtab-AdminParentMeta';
    // Search
    this.searchLink = '#subtab-AdminParentSearchConf';

    // Advanced Parameters
    this.advancedParametersLink = '#subtab-AdminAdvancedParameters';
    // Information
    this.informationLink = '#subtab-AdminInformation';
    // Performance
    this.performanceLink = '#subtab-AdminPerformance';
    // Administration
    this.administrationLink = '#subtab-AdminAdminPreferences';
    // E-mail
    this.emailLink = '#subtab-AdminEmails';
    // Import
    this.importLink = '#subtab-AdminImport';
    // Team
    this.teamLink = '#subtab-AdminParentEmployees';
    // Database
    this.databaseLink = '#subtab-AdminParentRequestSql';
    // Webservice
    this.webserviceLink = '#subtab-AdminWebservice';
    // Logs
    this.logsLink = '#subtab-AdminLogs';
    // New & Experimental Features
    this.featureFlagLink = '#subtab-AdminFeatureFlag';
    // Security
    this.securityLink = '#subtab-AdminParentSecurity';
    // Multistore
    this.multistoreLink = '#subtab-AdminShopGroup';
    // Deprecated tab used for regression test
    this.menuTabLink = '#subtab-AdminTabs';

    this.menuTree = [
      {
        parent: this.ordersParentLink,
        children: [
          this.ordersLink,
          this.invoicesLink,
          this.creditSlipsLink,
          this.deliverySlipslink,
          this.shoppingCartsLink,
        ],
      },
      {
        parent: this.customersParentLink,
        children: [
          this.customersLink,
          this.addressesLink,
        ],
      },
      {
        parent: this.customerServiceParentLink,
        children: [
          this.customerServiceLink,
          this.orderMessagesLink,
          this.merchandiseReturnsLink,
        ],
      },
      {
        parent: this.modulesParentLink,
        children: [
          this.moduleManagerLink,
        ],
      },
      {
        parent: this.designParentLink,
        children: [
          this.themeAndLogoParentLink,
          this.emailThemeLink,
          this.pagesLink,
          this.positionsLink,
          this.imageSettingsLink,
          this.linkWidgetLink,
        ],
      },
      {
        parent: this.shippingLink,
        children: [
          this.carriersLink,
          this.shippingPreferencesLink,
        ],
      },
      {
        parent: this.paymentParentLink,
        children: [
          this.paymentMethodsLink,
          this.preferencesLink,
        ],
      },
      {
        parent: this.internationalParentLink,
        children: [
          this.localizationLink,
          this.locationsLink,
          this.taxesLink,
          this.translationsLink,
        ],
      },
      {
        parent: this.shopParametersParentLink,
        children: [
          this.shopParametersGeneralLink,
          this.orderSettingsLink,
          this.productSettingsLink,
          this.customerSettingsLink,
          this.contactLink,
          this.trafficAndSeoLink,
          this.searchLink,
        ],
      },
      {
        parent: this.advancedParametersLink,
        children: [
          this.informationLink,
          this.performanceLink,
          this.administrationLink,
          this.emailLink,
          this.importLink,
          this.teamLink,
          this.databaseLink,
          this.logsLink,
          this.webserviceLink,
          this.featureFlagLink,
          this.securityLink,
        ],
      },
    ];

    // Growls
    this.growlDiv = '#growls';
    this.growlDefaultDiv = '#growls-default';
    this.growlMessageBlock = `${this.growlDefaultDiv} .growl-message`;
    this.growlCloseButton = `${this.growlDefaultDiv} .growl-close`;

    // Alert Text
    this.alertBlock = 'div.alert';
    this.alertSuccessBlock = `${this.alertBlock}.alert-success`;
    this.alertDangerBlock = `${this.alertBlock}.alert-danger`;
    this.alertInfoBlock = `${this.alertBlock}.alert-info`;
    this.alertSuccessBlockParagraph = `${this.alertSuccessBlock} div.alert-text p`;
    this.alertDangerBlockParagraph = `${this.alertDangerBlock} div.alert-text p`;
    this.alertInfoBlockParagraph = `${this.alertInfoBlock} p.alert-text`;

    // Modal dialog
    this.confirmationModal = '#confirmation_modal.show';
    this.modalDialog = `${this.confirmationModal} .modal-dialog`;
    this.modalDialogYesButton = `${this.modalDialog} button.continue`;

    // Symfony Toolbar
    this.sfToolbarMainContentDiv = "div[id*='sfToolbarMainContent']";
    this.sfCloseToolbarLink = "a[id*='sfToolbarHideButton']";

    // Sidebar
    this.rightSidebar = '#right-sidebar';
    this.helpDocumentURL = `${this.rightSidebar} div.quicknav-scroller._fullspace object`;

    // Invalid token block
    this.invalidTokenContinuelink = 'a.btn-continue';
    this.invalidTokenCancellink = 'a.btn-cancel';
  }

  /*
  Methods
   */
  /**
   * Click on link from Quick access dropdown toggle
   * @param page {Page} Browser tab
   * @param linkId {number} Page ID
   * @returns {Promise<void>}
   */
  async quickAccessToPage(page, linkId) {
    await this.waitForSelectorAndClick(page, this.quickAccessDropdownToggle);
    await this.clickAndWaitForNavigation(page, this.quickAccessLink(linkId));
    await this.waitForPageTitleToLoad(page);
  }

  /**
   * Click on link from Quick access dropdown toggle and get the opened Page
   * @param page {Page} Browser tab
   * @param linkId {number} Page ID
   * @returns {Promise<Page>}
   */
  async quickAccessToPageNewWindow(page, linkId) {
    await this.waitForSelectorAndClick(page, this.quickAccessDropdownToggle);
    return this.openLinkWithTargetBlank(page, this.quickAccessLink(linkId));
  }

  /**
   * Remove link from quick access
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async removeLinkFromQuickAccess(page) {
    await this.waitForSelectorAndClick(page, this.quickAccessDropdownToggle);
    await this.waitForSelectorAndClick(page, this.quickAccessRemoveLink);

    return page.textContent(this.growlDiv);
  }

  /**
   * Add current page to quick access
   * @param page {Page} Browser tab
   * @param pageName {string} Page name to add on quick access
   * @returns {Promise<string>}
   */
  async addCurrentPageToQuickAccess(page, pageName) {
    await this.dialogListener(page, true, pageName);
    await this.waitForSelectorAndClick(page, this.quickAccessDropdownToggle);
    await this.waitForSelectorAndClick(page, this.quickAddCurrentLink);

    return page.textContent(this.growlDiv);
  }

  /**
   * Click on manage quick access link
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToManageQuickAccessPage(page) {
    await this.waitForSelectorAndClick(page, this.quickAccessDropdownToggle);
    await this.clickAndWaitForNavigation(page, this.manageYourQuickAccessLink);
  }

  /**
   * Open a subMenu if closed and click on a sublink
   * @param page {Page} Browser tab
   * @param parentSelector {string} Selector of the parent menu
   * @param linkSelector {string} Selector of the child menu
   * @returns {Promise<void>}
   */
  async goToSubMenu(page, parentSelector, linkSelector) {
    await this.clickSubMenu(page, parentSelector);
    await this.scrollTo(page, linkSelector);
    await this.clickAndWaitForNavigation(page, linkSelector);
    if (await this.isSidebarCollapsed(page)) {
      await this.waitForHiddenSelector(page, `${linkSelector}.link-active`);
    } else {
      await this.waitForVisibleSelector(page, `${linkSelector}.link-active`);
    }
  }

  /**
   * Open a subMenu
   * @param page {Page} Browser tab
   * @param parentSelector {string} Selector of the parent menu
   * @returns {Promise<void>}
   */
  async clickSubMenu(page, parentSelector) {
    const openSelector = await this.isSidebarCollapsed(page) ? '.ul-open' : '.open';
    if (await this.elementNotVisible(page, `${parentSelector}${openSelector}`, 1000)) {
      // open the block
      await this.scrollTo(page, parentSelector);

      await Promise.all([
        page.click(parentSelector),
        this.waitForVisibleSelector(page, `${parentSelector}${openSelector}`),
      ]);
    }
  }

  /**
   * Return is a submenu is active
   * @param page {Page} Browser tab
   * @param linkSelector {string} Selector of the menu
   * @return {Promise<boolean>}
   */
  async isSubMenuActive(page, linkSelector) {
    return (await page.$$(`${linkSelector}.link-active`)).length > 0;
  }

  /**
   * Return is the navbar is visible
   * @param page {Page} Browser tab
   * @return {Promise<boolean>}
   */
  async isNavbarVisible(page) {
    return this.elementVisible(page, this.desktopNavbar, 1000);
  }

  /**
   * Return is the navbar is visible
   * @param page {Page} Browser tab
   * @return {Promise<boolean>}
   */
  async isMobileMenuVisible(page) {
    return this.elementVisible(page, this.menuMobileButton, 1000);
  }

  /**
   * Returns if Submenu is visible
   * @param page {Page} Browser tab
   * @param parentSelector {string} Selector of the parent menu
   * @param linkSelector {string} Selector of the child menu
   * @return {Promise<boolean>}
   */
  async isSubmenuVisible(page, parentSelector, linkSelector) {
    const openSelector = await this.isSidebarCollapsed(page) ? '.ul-open' : '.open';
    if (await this.elementNotVisible(page, `${parentSelector}${openSelector}`, 1000)) {
      // Scroll before opening menu
      await this.scrollTo(page, parentSelector);

      await Promise.all([
        page.click(parentSelector),
        this.waitForVisibleSelector(page, `${parentSelector}${openSelector}`),
      ]);

      await this.waitForVisibleSelector(page, `${parentSelector}${openSelector}`);
    }
    return this.elementVisible(page, linkSelector, 1000);
  }

  /**
   * Collapse the sidebar
   * @param page {Page} Browser tab
   * @param isCollapsed {boolean} Selector of the parent menu
   * @return {Promise<boolean>}
   */
  async setSidebarCollapsed(page, isCollapsed) {
    const isCurrentCollapsed = this.isSidebarCollapsed(page);
    if (isCurrentCollapsed !== isCollapsed) {
      await Promise.all([
        page.click(this.navbarCollapseButton),
        this.waitForVisibleSelector(
          page,
          this.navbarCollapsed(isCollapsed),
        ),
      ]);
    }
  }

  /**
   * Returns if the sidebar is collapsed
   * @param page {Page} Browser tab
   * @return {Promise<boolean>}
   */
  async isSidebarCollapsed(page) {
    return this.elementVisible(page, this.navbarCollapsed(true), 1000);
  }

  /**
   * Returns to the dashboard then logout
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToMyProfile(page) {
    if (await this.elementVisible(page, this.userProfileIcon, 1000)) {
      await page.click(this.userProfileIcon);
    } else {
      await page.click(this.userProfileIconNonMigratedPages);
    }
    if (await this.elementVisible(page, this.userProfileYourProfileLink, 1000)) {
      await this.waitForVisibleSelector(page, this.userProfileYourProfileLink);
    } else {
      await this.waitForVisibleSelector(page, this.userProfileYourProfileLinkNonMigratedPages);
    }
    await this.clickAndWaitForNavigation(page, this.userProfileYourProfileLink);
  }

  /**
   * Returns the URL of the avatar for the current employee from the dropdown
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async getCurrentEmployeeAvatar(page) {
    if (await this.elementVisible(page, this.userProfileIcon, 1000)) {
      await page.click(this.userProfileIcon);
    } else {
      await page.click(this.userProfileIconNonMigratedPages);
    }

    return page.getAttribute(this.userProfileAvatar, 'src');
  }

  /**
   * Returns to the dashboard then logout
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async logoutBO(page) {
    if (await this.elementVisible(page, this.userProfileIcon, 1000)) {
      await page.click(this.userProfileIcon);
    } else {
      await page.click(this.userProfileIconNonMigratedPages);
    }
    await this.waitForVisibleSelector(page, this.userProfileLogoutLink);
    await this.clickAndWaitForNavigation(page, this.userProfileLogoutLink);
  }

  /**
   * Click on View My Shop and wait for page to open in a new Tab
   * @param page {Page} Browser tab
   * @return {Promise<Page>}
   */
  async viewMyShop(page) {
    return this.openLinkWithTargetBlank(page, this.headerShopNameLink);
  }

  /**
   * Set value on tinyMce textarea
   * @param page {Page} Browser tab
   * @param iFrameSelector {string} Selector of the iFrame to set value on
   * @param value {string} Value to set on the iFrame
   * @return {Promise<void>}
   */
  async setValueOnTinymceInput(page, iFrameSelector, value) {
    const args = {selector: iFrameSelector, vl: value};
    await page.evaluate(async (args) => {
      /* eslint-env browser */
      const iFrameElement = await document.querySelector(args.selector);
      const iFrameHtml = iFrameElement.contentDocument.documentElement;
      const textElement = await iFrameHtml.querySelector('body p');
      textElement.textContent = args.vl;
    }, args);
  }

  /**
   * Close symfony Toolbar
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async closeSfToolBar(page) {
    if (await this.elementVisible(page, `${this.sfToolbarMainContentDiv}[style='display: block;']`, 1000)) {
      await page.click(this.sfCloseToolbarLink);
    }
  }

  /**
   * Open help side bar
   * @param page {Page} Browser tab
   * @returns {Promise<boolean>}
   */
  async openHelpSideBar(page) {
    await this.waitForSelectorAndClick(page, this.helpButton);
    return this.elementVisible(page, `${this.rightSidebar}.sidebar-open`, 2000);
  }

  /**
   * Close help side bar
   * @param page {Page} Browser tab
   * @returns {Promise<boolean>}
   */
  async closeHelpSideBar(page) {
    await this.waitForSelectorAndClick(page, this.helpButton);
    return this.elementVisible(page, `${this.rightSidebar}:not(.sidebar-open)`, 2000);
  }

  /**
   * Get help document URL
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async getHelpDocumentURL(page) {
    return this.getAttributeContent(page, this.helpDocumentURL, 'data');
  }

  /**
   * Get growl message content
   * @param page {Page} Browser tab
   * @param timeout {number} Timeout to wait for the selector
   * @return {Promise<string>}
   */
  getGrowlMessageContent(page, timeout = 10000) {
    return page.textContent(this.growlMessageBlock, {timeout});
  }

  /**
   * Close growl message and return its value
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async closeGrowlMessage(page) {
    let growlNotVisible = await this.elementNotVisible(page, this.growlMessageBlock, 10000);

    while (!growlNotVisible) {
      try {
        await page.click(this.growlCloseButton);
      } catch (e) {
        // If element does not exist it's already not visible
      }

      growlNotVisible = await this.elementNotVisible(page, this.growlMessageBlock, 2000);
    }

    await this.waitForHiddenSelector(page, this.growlMessageBlock);
  }

  /**
   * Get error message from alert danger block
   * @param page {Page} Browser tab
   * @return {Promise<string>}
   */
  getAlertDangerBlockParagraphContent(page) {
    return this.getTextContent(page, this.alertDangerBlockParagraph);
  }

  /**
   * Get text content of alert success block
   * @param page {Page} Browser tab
   * @return {Promise<string>}
   */
  getAlertSuccessBlockContent(page) {
    return this.getTextContent(page, this.alertSuccessBlock);
  }

  /**
   * Get text content of alert success block paragraph
   * @param page {Page} Browser tab
   * @return {Promise<string>}
   */
  getAlertSuccessBlockParagraphContent(page) {
    return this.getTextContent(page, this.alertSuccessBlockParagraph);
  }

  /**
   * Get text content of alert success block paragraph
   * @param page {Page} Browser tab
   * @return {Promise<string>}
   */
  getAlertInfoBlockParagraphContent(page) {
    return this.getTextContent(page, this.alertInfoBlockParagraph);
  }

  /**
   * Navigate to Bo page without token
   * @param page {Page} Browser tab
   * @param url {string} Url to BO page
   * @param continueToPage {boolean} True to continue false to cancel and return to dashboard page
   * @returns {Promise<void>}
   */
  async navigateToPageWithInvalidToken(page, url, continueToPage = true) {
    await this.goTo(page, url);
    if (await this.elementVisible(page, this.invalidTokenContinuelink, 10000)) {
      await this.clickAndWaitForNavigation(
        page,
        continueToPage ? this.invalidTokenContinuelink : this.invalidTokenCancellink,
      );
    }
  }

  /**
   * Search in BackOffice
   * @param page {Page} Browser tab
   * @param query {string} String
   * @returns {Promise<void>}
   */
  async search(page, query) {
    await this.setValue(page, this.navbarSarchInput, query);
    await page.keyboard.press('Enter');
    await page.waitForNavigation('networkidle');
  }

  /**
   * Resize the page to defined viewport
   * @param page {Page} Browser tab
   * @param mobileSize {boolean} Define if the viewport is for mobile or not
   * @returns {Promise<void>}
   */
  async resize(page, mobileSize) {
    await super.resize(page, mobileSize);
    await this.waitForSelector(page, this.menuMobileButton, mobileSize ? 'visible' : 'hidden');
  }
}

module.exports = BOBasePage;
