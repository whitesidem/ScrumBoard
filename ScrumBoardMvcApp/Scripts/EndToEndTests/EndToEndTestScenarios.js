/// <reference path="/Scripts/External/Angular/angular-scenario.js" />
/// <reference path="/Scripts/External/Angular/angular-mocks.js" />
/// <reference path="/TestScripts/jasmine-1.3.1/jasmine.js" />
/// <reference path="/Scripts/Shared/global.js" />



describe("End-to-End Tests", function () {

    // This URL is for this app running under the Visual Studio
    // web development server (Cassini). The port number is assigned
    // in the "Web" section of the web apps project's 
    // (see the "Specific port" setting).
    var url = "http://localhost:54120/ScrumBoard?isTest=true";

    beforeEach(function () {
        console.log("beforeEach");
    });

    afterEach(function () {
        console.log("afterEach");
    });

    it("can browse to site", function () {
        browser().navigateTo(url);
    });


    it("can add a new list", function () {
        browser().navigateTo(url);
        element('#addNewListBtn').click();
        input("listTitle").enter("Backlog");
        element("#okBtn").click();

//        element('.addCard').click();
//        input("listTitle").enter("In dev");
//        element("#okBtn").click();


        element('#addNewListBtn').click();
        input("listTitle").enter("In dev");
        element("#okBtn").click();

        element('#addNewListBtn').click();
        input("listTitle").enter("Dev Done");
        element("#okBtn").click();

        //        expect(window.binding("products.Total")).toBeGreaterThan(0);
        //        expect(window.binding("product.Name")).toContain("Dom Perignon");
    });


});
