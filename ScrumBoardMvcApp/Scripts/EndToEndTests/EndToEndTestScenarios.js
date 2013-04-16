/// <reference path="/Scripts/External/Angular/angular-scenario.js" />
/// <reference path="/Scripts/External/Angular/angular-mocks.js" />
/// <reference path="/TestScripts/jasmine-1.3.1/jasmine.js" />


describe("End-to-End Tests", function () {

    // This URL is for WinePicker running under the Visual Studio
    // web development server (Cassini). The port number is assigned
    // in the "Web" section of the WinePickerWeb project's properties
    // (see the "Specific port" setting).
    var url = "http://localhost:54120/ScrumBoard";

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
        expect(element("div.modal-header:visible", "visible dialog").count()).toBe(1);
        //window.sleep(2);
        //expect(window.binding("dialogDone")).toBe("false");
        //input("listTitle").enter("Test Board 1");
        //element("#listTitle").val("Test Board1");
        //element('#okBtn').click();

        //TODO: rename this to a unique name eg suchamodel.listTitle
        //        input("listTitle").enter("Test Board1");

        //        input("searchTerm").enter("dom perignon");
        //        element("#searchButton").click();
        //        expect(window.binding("products.Total")).toBeGreaterThan(0);
        //        expect(window.binding("product.Name")).toContain("Dom Perignon");
    });
});
