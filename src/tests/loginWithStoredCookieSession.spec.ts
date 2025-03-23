import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";

const authFile = "src/config/auth.json";

test.describe("Scenario: SalesForce Login Functionality", async ()=> {

    test.skip("Generate and Store Login Cookies Session", async ( { page } )=> {

        const loginPage = new LoginPage(page);

        await test.step("Navigate to Login page", async()=> {

            await loginPage.navigateToLoginPage();
        });

        await test.step("Enter Valid Credentials", async()=> {

            await loginPage.enterUsername(process.env.userid!);
            await loginPage.enterPassword(process.env.password!);
            await page.waitForTimeout(500);
        });

        await test.step("Click on Login Button and Navigate to Homepage", async()=> {

            const homePage = await loginPage.clickLoginButton();
            await homePage.expectServiceTitleToBeVisible();
        });

        logger.info("User Successfully Login to Application!");
        await page.context().storageState({ path: authFile });
        logger.info("Cookies Session Stored Successfully!");
    });

    test("Login Using Stored Session Auth File", async ({browser})=> {

        const sessionContext = await browser.newContext({storageState: authFile});
        const page = await sessionContext.newPage();

        let homePage = new HomePage(page);
        let contactsPage: ContactsPage;

        await test.step("Click on Login Button and Navigate to Homepage", async()=> {

            // homePage = await loginPage.clickLoginButton();
            await page.goto("https://testautomation2-dev-ed.develop.lightning.force.com/lightning/page/home")
            .catch((error) => {
                logger.error(`Error navigating to home page: ${error}.`)})
            .then(() => logger.info("Navigated to Home Page Successfully!."));
            await homePage.expectServiceTitleToBeVisible();
        });

        logger.info("User Successfully Login to Application!");

        await test.step("Navigate to Contacts Page and Create New Contact", async()=> {

            contactsPage = await homePage.navigateToContactsTab();
            await contactsPage.createNewContact("Test", "AuthFile", "test.session@testautomation.qa");
        });

        await test.step("Delete Newly Created Contact", async()=> {

            await page.waitForTimeout(5000);
            await contactsPage.deleteContact("Test", "AuthFile");
        });

    });
});