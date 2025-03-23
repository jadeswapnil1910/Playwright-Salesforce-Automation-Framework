import { expect, Page } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import ContactsPage from "./ContactsPage";


export default class HomePage {

    private readonly serviceTitleLocator = "Home";
    private readonly contactsTabTitleLocator = "Contacts";
    

    constructor(private page: Page) {
       
    }

    async expectServiceTitleToBeVisible() {

        
        await expect(this.page.getByTitle(this.serviceTitleLocator)).toBeVisible({timeout: 20000 })
        .catch( (error) => {
            logger.error(`Error clicking login button: ${error}.`);
            throw error;
        })
        .then(async () => {
            logger.info("Successfully Clicked on Login button!.");
            await this.naviagateToHomePageTabs();
        });
    }

    async naviagateToHomePageTabs() {

        await this.page.goto("https://testautomation2-dev-ed.develop.lightning.force.com/lightning/page/home").catch((error) => {
            logger.error(`Error navigating to home page: ${error}.`);
            throw error;
        })
        .then(() => logger.info("Navigated to Home Page Successfully!."));
    }

    async navigateToContactsTab() {

        await expect(this.page.getByTitle(this.contactsTabTitleLocator)).toBeVisible({timeout: 20000 })
        .catch( (error) => {
            logger.error(`Error clicking Contacts Tab: ${error}.`);
            throw error;
        }
        ).then(async () => {
            logger.info("Successfully Clicked on Contacts Tab!.");
            await this.page.getByTitle(this.contactsTabTitleLocator).click();
            await this.page.waitForTimeout(5000);
        });

        
        return new ContactsPage(this.page);
    }
}

// https://testautomation2-dev-ed.develop.lightning.force.com/lightning/page/home
// https://testautomation2-dev-ed.develop.lightning.force.com/lightning/page/home