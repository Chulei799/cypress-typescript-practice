class Header {

    getPageLink(pageName: string) {
        return cy.get('.header-links > ul > li > a').contains(pageName);
    }

    openPage(pageName: string) {
        this.getPageLink(pageName).click();
    }

    get pageTitle() {
        return cy.get('.page-title');
    }
}

export default new Header();