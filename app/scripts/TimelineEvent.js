"use strict";
var app;
(function (app) {
    var TimelineEvent = (function () {
        function TimelineEvent(age, content) {
            this.active = false;
            this.age = age;
            this.content = content;
        }
        return TimelineEvent;
    })();
    app.TimelineEvent = TimelineEvent;
})(app || (app = {}));
//# sourceMappingURL=TimelineEvent.js.map