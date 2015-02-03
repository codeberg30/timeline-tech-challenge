/// <reference path="Timeline.ts" />
/// <reference path="TimelineViewModel.ts" />
"use strict";
document.addEventListener("DOMContentLoaded", function (event) {
    var container = document.querySelector('.container'), vm = new app.TimelineViewModel(container, 'data/timeline.json');
});
//# sourceMappingURL=main.js.map