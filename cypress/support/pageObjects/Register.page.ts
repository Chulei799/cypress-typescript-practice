class RegisterPage {

    get firstNameField() {
        return cy.get('#FirstName');
    }

    get lastNameField() {
        return cy.get('#LastName');
    }

    get dateOfBirthDayField() {
        return cy.get('.date-of-birth > .date-picker-wrapper').find('select').eq(0);
    }

    get dateOfBirthMonthField() {
        return cy.get('.date-of-birth > .date-picker-wrapper').find('select').eq(1);
    }

    get dateOfBirthYearField() {
        return cy.get('.date-of-birth > .date-picker-wrapper').find('select').eq(2);
    }

    get emailField() {
        return cy.get('#Email');
    }

    get companyNameField() {
        return cy.get('#Company');
    }

    get passwordField() {
        return cy.get('#Password');
    }

    get confirmPasswordField() {
        return cy.get('#ConfirmPassword');
    }

    get registerButton() {
        return cy.get('#register-button');
    }

    get firstNameError() {
        return cy.get('#FirstName-error');
    }

    get lastNameError() {
        return cy.get('#LastName-error');
    }

    get emailError() {
        return cy.get('#Email-error');
    }

    get passwordError() {
        return cy.get('#Password-error');
    }

    get confirmPasswordError() {
        return cy.get('#ConfirmPassword-error');
    }

    get registerResult() {
        return cy.get('.page-body > .result');
    }

    selectGender(gender: "Male" | "Female") {
        cy.get(`#gender-${gender.toLowerCase()}`).click();
    }
}

export default new RegisterPage();