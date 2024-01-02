class CustomerInfoPage {

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

    getGenderRadioButton(gender: "Male" | "Female") {
        return cy.get(`#gender-${gender.toLowerCase()}`);
    }
}

export default new CustomerInfoPage();