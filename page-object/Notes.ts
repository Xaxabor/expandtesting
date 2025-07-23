import {test, expect, type Page} from '@playwright/test';
const { Common } = require('./common');


export class Notes extends Common {
    readonly page: Page

    readonly categoryDropdownLabel = "Category:";

    readonly titleTextFieldLabel = "Title:";
    readonly descriptionTextBoxLabel = "Description:";

    readonly completedCheckbox = "Completed";

    readonly viewButton = "View";
    readonly editButton = "Edit";
    readonly deleteButton = "Delete";
    readonly cancelButton = "Cancel";
    readonly createButton = "Create";
    readonly addNoteButton = "+ Add Note";
    readonly saveButton = "Save";

    readonly addNewNoteModalHeader = "Add new note";
    readonly deleteNoteModalHeader = "Delete note?"

    readonly emptyNoteText = "You don't have any notes in all categories";
    readonly newAddedNoteText = "You have 0/1 notes completed in the all categories";

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async verifyNoteExists(title: string, description: string) {
        const titleLocator = this.page.locator("//div[@data-testid='note-card-title' and normalize-space(text())='" + title + "']");
        const descriptionLocator = this.page.locator("//p[@data-testid='note-card-description' and normalize-space(text())='" + description + "']");

        await expect(titleLocator).toBeVisible();
        await expect(descriptionLocator).toBeVisible();
    }

    async emptyNotesList() {
        const emptyTextLocator = this.page.locator('//h4[@data-testid="no-notes-message" and normalize-space(text())="'+ this.emptyNoteText + '"]');
        await expect(emptyTextLocator).toBeVisible();
    }
}
