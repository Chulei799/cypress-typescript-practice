class LoginPage {

    get emailField() {
        return cy.get('#Email');
    }

    get passwordField() {
        return cy.get('#Password');
    }

    get loginButton() {
        return cy.get('.login-button');
    }
}

export default new LoginPage();