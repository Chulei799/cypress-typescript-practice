import Header from "../../support/pageObjects/Header";

import data from "../../fixtures/register.json";
import RegisterPage from "../../support/pageObjects/Register.page";

describe('Register Feature', () => {

    beforeEach(() => {
        cy.visit('https://demo.nopcommerce.com');
    });

    it('TC-1: Validate register fields on Register page', () => {
        Header.openPage("Register");
        RegisterPage.registerButton.click();
        RegisterPage.firstNameError.then((error) => {
            expect(error, "Message First name is required should be visible").to.be.visible;
            expect(error).to.have.text(data.firstNameIsRequiredErrorMessage);
        });
        RegisterPage.lastNameError.then((error) => {
            expect(error, "Message Last name is required should be visible").to.be.visible;
            expect(error).to.have.text(data.lastNameIsRequiredErrorMessage);
        });
        RegisterPage.emailError.then((error) => {
            expect(error, "Message Email is required should be visible").to.be.visible;
            expect(error).to.have.text(data.emailIsRequiredErrorMessage);
        });
        RegisterPage.passwordError.then((error) => {
            expect(error, "Message Password is required should be visible").to.be.visible;
            expect(error).to.have.text(data.passwordIsRequiredErrorMessage);
        });
        RegisterPage.confirmPasswordError.then((error) => {
            expect(error, "Message Password is required should be visible").to.be.visible;
            expect(error).to.have.text(data.passwordIsRequiredErrorMessage);
        });

        RegisterPage.emailField.type(data.incorrectEmail);
        RegisterPage.registerButton.click();
        RegisterPage.emailError.then((error) => {
            expect(error, "Message Wrong email should be visible").to.be.visible;
            expect(error).to.have.text(data.wrongEmailErrorMessage);
        });

        RegisterPage.passwordField.type(data.shortPassword);
        RegisterPage.confirmPasswordField.type(data.anotherPassword);

        RegisterPage.passwordError.then((error) => {
            expect(error, "Message Too short password should be visible").to.be.visible;
            expect(error).to.have.text(data.tooShortPasswordErrorMessage);
        });
        RegisterPage.confirmPasswordError.then((error) => {
            expect(error, "Message Password not match should be visible").to.be.visible;
            expect(error).to.have.text(data.passwordNotMatchErrorMessage);
        });

        RegisterPage.registerButton.click();
        cy.wait(1000);
        Header.pageTitle.should('have.text', data.pageTitle);
    });
});