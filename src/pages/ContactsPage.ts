import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import { log } from "console";

export default class ContactsPage {

    constructor(private page: Page) {
        
    }   
    
    private readonly newContactBtn = "New";
  
    async createNewContact (fname: string, lname: string, email: string) {

        await expect(this.page.getByRole("button", { name: this.newContactBtn })).toBeVisible({timeout: 20000 }).catch( (error) => {
            logger.error(`Error clicking New Contact Button: ${error}.`);
            throw error;
        }).then(async () => {
            await this.page.getByRole("button", { name: this.newContactBtn }).click();
            await this.page.waitForTimeout(5000);
            await expect(this.page.getByRole("heading", { name: "New Contact" })).toBeVisible({timeout: 20000 });
            logger.info("Successfully Clicked on New Contact Button!.");
        });

        logger.info("Enter First Name");
        await this.page.getByRole("textbox", { name: "First Name" }).fill(fname);
        logger.info(`First Name is filled as ${fname}`);
        await this.page.getByRole("textbox", { name: "First Name" }).press("Tab");

        logger.info("Enter Last Name");
        await this.page.getByRole("textbox", { name: "*Last Name" }).fill(lname);
        logger.info(`Last Name is filled as ${lname}`);

        logger.info("Enter Email");
        await this.page.getByRole("textbox", { name: "Email" }).fill(email);
        logger.info(`Email is filled as ${email}`);

        await this.page.getByRole("button", { name: "Save", exact: true }).click();
        logger.info("Successfully Clicked on Save Button!.");

        await expect(this.page.getByText(`Contact "${fname} ${lname}" was created.`, { exact: true })).toBeVisible({timeout: 20000 })
        .catch( (error) => {
            logger.error(`Error creating new contact: ${error}.`);
            throw error;})
        .then(() => logger.info("Contact Created Successfully!."));

    }

    async deleteContact (fname: string, lname: string) {

    await expect(this.page.getByRole('heading', { name: `Contact ${fname} ${lname}` })).toBeVisible({timeout: 20000 });
    await this.page.getByRole('button', { name: 'Show more actions' }).click();
    await this.page.getByRole('menuitem', { name: 'Delete' }).click();
    await expect(this.page.getByText('Are you sure you want to delete this contact?')).toBeVisible({timeout: 20000 });
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await expect(this.page.getByText(`Contact "${fname} ${lname}" was deleted. Undo`, { exact: true })).toBeVisible({timeout: 20000 })
    .catch( (error) => {
        logger.error(`Error deleting contact: ${error}.`);
        throw error;})
    .then(() => logger.info("Contact Deleted Successfully!."));
    await this.page.getByRole('button', { name: 'Close' }).click();
    }
}

/*

await page.getByRole('button', { name: 'Show more actions' }).click();
await page.getByRole('menuitem', { name: 'Delete' }).click();
await page.getByText('Are you sure you want to').click();

*/