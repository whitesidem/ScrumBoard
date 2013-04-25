if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() { }
        F.prototype = o;
        return new F();
    };
}

//Namespace generator
var SkilzJs = (function () {

    //creates nested objects based on passed namespace, creating objects for levels that do not exist - ie. "MWUtilJs.JS.UI"
    function namespace(string) {
        var object = this;
        var levels = string.split(".");

        for (var i = 0, l = levels.length; i < l; i++) {
            if (typeof object[levels[i]] == "undefined") {
                object[levels[i]] = {};
            }

            object = object[levels[i]];
        }

        return object;
    }

    return {
        //return this as the public method to call
        namespace: namespace
    };
} ());

$.urlParams = function (name) {
    var results = new RegExp('[\\?&amp;]' + name + '=([^amp;#]*)').exec(window.location.href);
    if (results === null) return "";
    return results[1] || 0;

};