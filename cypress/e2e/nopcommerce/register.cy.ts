import Header from "../../support/pageObjects/Header";

import data from "../../fixtures/register.json";
import RegisterPage from "../../support/pageObjects/Register.page";
import utils from "../../support/utils";
import LoginPage from "../../support/pageObjects/Login.page";
import CustomerInfoPage from "../../support/pageObjects/myAccountPages/CustomerInfo.page";

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

    it('TC-3: Success sign up', () => {
        Header.openPage("Register");
        RegisterPage.firstNameField.type(data.firstName);
        RegisterPage.lastNameField.type(data.lastName);
        RegisterPage.emailField.type(utils.generateRandomEmail());
        RegisterPage.passwordField.type(data.password);
        RegisterPage.confirmPasswordField.type(data.password);
        RegisterPage.registerButton.click();

        RegisterPage.registerResult.then((result) => {
            expect(result).to.be.visible;
            expect(result).to.have.text(data.successRegisterMessage);
        });
    });

    it('TC-4: Check is user data save correct during registration', () => {
        Header.openPage("Register");
        const newUser = {
            gender: "Male" as "Male" | "Female",
            firstName: data.firstName,
            lastName: data.lastName,
            day: "31",
            month: "12",
            year: "1999",
            email: utils.generateRandomEmail(),
            companyName: "Feel Good Inc.",
            password: data.password
        }

        RegisterPage.selectGender(newUser.gender);
        RegisterPage.firstNameField.type(newUser.firstName);
        RegisterPage.lastNameField.type(newUser.lastName);
        RegisterPage.dateOfBirthDayField.select(newUser.day);
        RegisterPage.dateOfBirthMonthField.select(newUser.month);
        RegisterPage.dateOfBirthYearField.select(newUser.year);
        RegisterPage.emailField.type(newUser.email);
        RegisterPage.companyNameField.type(newUser.companyName);
        RegisterPage.passwordField.type(data.password);
        RegisterPage.confirmPasswordField.type(data.password);
        RegisterPage.registerButton.click();

        Header.openPage("Log in");

        LoginPage.emailField.type(newUser.email);
        LoginPage.passwordField.type(newUser.password);
        LoginPage.loginButton.click();

        Header.openPage("My account");
        
        CustomerInfoPage.getGenderRadioButton(newUser.gender).should('be.checked');
        CustomerInfoPage.firstNameField.should('have.value', newUser.firstName);
        CustomerInfoPage.lastNameField.should('have.value', newUser.lastName);
        CustomerInfoPage.dateOfBirthDayField.should('have.value', newUser.day);
        CustomerInfoPage.dateOfBirthMonthField.should('have.value', newUser.month);
        CustomerInfoPage.dateOfBirthYearField.should('have.value', newUser.year);
        CustomerInfoPage.emailField.should('have.value', newUser.email);
        CustomerInfoPage.companyNameField.should('have.value', newUser.companyName);
    });
});