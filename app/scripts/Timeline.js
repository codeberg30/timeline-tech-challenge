/// <reference path="TypeDefinitions/es6-promise.d.ts" />
/// <reference path="TimelineEvent.ts" />
"use strict";
var app;
(function (app) {
    var Timeline = (function () {
        function Timeline(obj) {
            var _this = this;
            this.paused = true;
            this.finished = false;
            this._currentSlide = 0;
            this.firstName = obj && obj.firstName || '';
            this.lastName = obj && obj.lastName || '';
            this.age = obj && obj.age || 0;
            this.events = obj && obj.events || [];
            if (this.events.length > 1) {
                this.events.sort(Timeline.utils.ageSort).forEach(function (el, index) {
                    if (_this.events[index + 1]) {
                        el.duration = _this.events[index + 1].age - el.age;
                    }
                    else {
                        el.duration = _this.age - el.age;
                    }
                    el.duration *= Timeline.utils.durationMultiplier;
                });
            }
        }
        Object.defineProperty(Timeline.prototype, "currentSlide", {
            get: function () {
                return this._currentSlide;
            },
            set: function (index) {
                if (index >= 0 && index < this.events.length) {
                    this._currentSlide = index;
                }
                else if (index === this.events.length) {
                    this.finished = true;
                    this.paused = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Timeline.prototype.pause = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.paused = true;
                resolve();
            });
        };
        Timeline.prototype.play = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.paused = false;
                resolve(_this.events[_this.currentSlide]);
            });
        };
        Timeline.prototype.reset = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.paused = false;
                _this.currentSlide = 0;
                resolve(_this.events[_this.currentSlide]);
            });
        };
        Timeline.utils = {
            ageSort: function (a, b) {
                if (a.age > b.age)
                    return 1;
                if (a.age < b.age)
                    return -1;
                return 0;
            },
            durationMultiplier: 2000
        };
        return Timeline;
    })();
    app.Timeline = Timeline;
})(app || (app = {}));
//# sourceMappingURL=Timeline.js.map