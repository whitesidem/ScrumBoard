/// <reference path="/Scripts/External/Angular/angular-scenario.js" />
/// <reference path="/Scripts/External/Angular/angular-mocks.js" />
/// <reference path="/TestScripts/jasmine-1.3.1/jasmine.js" />


describe("End-to-End Tests", function () {

    // This URL is for WinePicker running under the Visual Studio
    // web development server (Cassini). The port number is assigned
    // in the "Web" section of the WinePickerWeb project's properties
    // (see the "Specific port" setting).
    var url = "http://localhost:54120/ScrumBoard";

    it("can browse to site", function () {
        browser().navigateTo(url);
    });


    it("can add a new list", function () {
        browser().navigateTo(url);
        element('#addNewListBtn').click();
//        while ($("#listTitle").length == 0) {
//        };

        //        expect(window.binding("listTitle")).toBe("");

        //TODO: rename this to a unique name eg suchamodel.listTitle
        //        input("listTitle").enter("Test Board1");
        element("#listTitle").val("Test Board1");
        element('#okBtn').click();


        //        input("searchTerm").enter("dom perignon");
        //        element("#searchButton").click();
        //        expect(window.binding("products.Total")).toBeGreaterThan(0);
        //        expect(window.binding("product.Name")).toContain("Dom Perignon");
    });

    //    it("can browse directly to /wines/112875", function () {
    //        var path = "/wines/112875";
    //        browser().navigateTo(url + "#" + path);
    //        expect(window.binding("product.Varietal.Name")).toContain("Tempranillo");
    //    });
});
