"use strict";
var app;
(function (app) {
    var Animation = (function () {
        function Animation() {
        }
        Animation.dropDown = [
            { transform: 'translateY(-400px) rotateX(90deg) scale(5)', opacity: 0, offset: 0 },
            { transform: 'translateY(0px) rotateX(0deg) scale(1)', opacity: 1, offset: 0.02 },
            { transform: 'translateY(0px) rotateX(0deg) scale(1)', opacity: 1, offset: 0.98 },
            { transform: 'translateY(-400px) rotateX(90deg) scale(5)', opacity: 0, offset: 1 },
        ];
        return Animation;
    })();
    app.Animation = Animation;
})(app || (app = {}));
//# sourceMappingURL=Animation.js.map