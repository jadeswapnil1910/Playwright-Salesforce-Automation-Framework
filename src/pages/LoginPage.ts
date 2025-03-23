import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";


export default class LoginPage {

    private readonly userNameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";
    

    constructor(private page: Page) {
        
    }

    async navigateToLoginPage() {

        await this.page.goto("/");
        logger.info("navigated to login.salesforce.com");
    }

    async enterUsername(username: string) {

        await this.page.locator(this.userNameInputSelector).fill(username);
        logger.info("Enter Username");
    }

    async enterPassword(pwd: string) {

        await this.page.locator(this.passwordInputSelector).fill(pwd);
        logger.info("Enter Password");
    }

    async clickLoginButton() {

        await this.page
            .locator(this.loginButtonSelector)
            .click()
            .catch((error) => {
                logger.error(`Error clicking login button: ${error}`);
                throw error; //rethrow the error if needed
            })
            .then(()=> logger.info("Clicked login button Successfully!"))
        
        const homePage = new HomePage(this.page);
        return homePage;
    }

}