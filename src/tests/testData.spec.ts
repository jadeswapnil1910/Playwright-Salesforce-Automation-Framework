import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtil";
import HomePage from "../pages/HomePage";
import ContactsPage from "../pages/ContactsPage";
import cData from "../data/contacts.json";




for( const contacts of cData) {

    test(`Create New Contact --> ${contacts.firstname}, ${contacts.lastname}`, async ({page})=> {

        let loginPage = new LoginPage(page);
        let homePage: HomePage;
        let contactsPage: ContactsPage;

        await test.step("Navigate to Login page", async()=> {

            await loginPage.navigateToLoginPage();
        });

        await test.step("Enter Valid Credentials", async()=> {

            await loginPage.enterUsername(process.env.userid!);
            await loginPage.enterPassword(process.env.password!);
            await page.waitForTimeout(500);
        });

        await test.step("Click on Login Button and Navigate to Homepage", async()=> {

            homePage = await loginPage.clickLoginButton();
            await homePage.expectServiceTitleToBeVisible();
        });

        logger.info("User Successfully Login to Application!");

        await test.step("Navigate to Contacts Page and Create New Contact", async()=> {

            contactsPage = await homePage.navigateToContactsTab();
            await contactsPage.createNewContact(contacts.firstname, contacts.lastname, `${contacts.firstname}.${contacts.lastname}@testautomation.qa`);
        });

        await test.step("Delete Newly Created Contact", async()=> {

            await page.waitForTimeout(5000);
            await contactsPage.deleteContact(contacts.firstname, contacts.lastname);
        });
    });
}