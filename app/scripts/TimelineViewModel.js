/// <reference path="Timeline.ts" />
/// <reference path="TimelineEvent.ts" />
/// <reference path="Animation.ts" />
"use strict";
var app;
(function (app) {
    app.ControlStates = {
        'PLAY': 'play',
        'PAUSE': 'pause',
        'RESET': 'reset'
    };
    var TimelineViewModel = (function () {
        function TimelineViewModel(container, url) {
            var _this = this;
            this.container = container;
            this._control = app.ControlStates.PLAY;
            if (url) {
                this.requestTimeline(url).then(function () {
                    _this.initializeView();
                    _this.initializeModel();
                }, function () { return console.log("Error -> requestingTimeline data"); });
            }
        }
        TimelineViewModel.prototype.requestTimeline = function (url) {
            var that = this;
            return new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', url);
                request.onreadystatechange = function () {
                    if (request.status === 200) {
                        if (request.readyState === 4) {
                            that.data = JSON.parse(request.response);
                            resolve(that.data);
                        }
                    }
                    else {
                        reject(Error('Url didn\'t load successfully; error code:' + request.statusText));
                    }
                };
                request.onerror = function () {
                    reject(Error('There was a network error.'));
                };
                request.send();
            });
        };
        TimelineViewModel.prototype.initializeView = function () {
            var _this = this;
            this.container.innerHTML = "<div class=\"slide\"></div>" + "<div class=\"playback-control\">" + app.ControlStates.PLAY + "</div>";
            this.slides = this.container.getElementsByClassName("slide");
            this.controlElement = this.container.querySelector('.playback-control');
            this.controlElement.addEventListener('click', function (e) { return _this.controlClickHandler(e); });
        };
        TimelineViewModel.prototype.controlClickHandler = function (e) {
            var _this = this;
            var that = this;
            if (that.animationPlayer) {
                switch (that.animationPlayer.playState) {
                    case "paused":
                        this.timeline.play().then(function (timelineEvent) { return that.animationPlayer.play(); }).then(function () { return _this.control = app.ControlStates.PAUSE; });
                        break;
                    case "running":
                        this.timeline.pause().then(function () { return that.animationPlayer.pause(); }).then(function () { return _this.control = app.ControlStates.PLAY; });
                        break;
                    case "finished":
                        this.timeline.reset().then(function (timelineEvent) { return _this.playSlide(timelineEvent); }).then(function () { return _this.control = app.ControlStates.PAUSE; });
                        break;
                    default:
                        console.log("unexpected -> ", that.animationPlayer.playState);
                }
            }
            else {
                this.timeline.play().then(function (timelineEvent) { return _this.playSlide(timelineEvent); }).then(function () { return _this.control = app.ControlStates.PAUSE; });
            }
        };
        Object.defineProperty(TimelineViewModel.prototype, "control", {
            get: function () {
                return this._control;
            },
            set: function (str) {
                this.controlElement.textContent = this._control = str;
            },
            enumerable: true,
            configurable: true
        });
        TimelineViewModel.prototype.playSlide = function (timelineEvent) {
            var _this = this;
            this.slides[0].textContent = "At age " + timelineEvent.age + ", " + this.timeline.firstName + " " + timelineEvent.content;
            this.animationPlayer = this.slides[0].animate(app.Animation.dropDown, {
                duration: timelineEvent.duration
            });
            this.animationPlayer.onfinish = function (arg) {
                _this.timeline.currentSlide++;
                if (!_this.timeline.finished || !_this.timeline.paused) {
                    _this.timeline.play().then(function (timelineEvent) { return _this.playSlide(timelineEvent); });
                }
                else {
                    _this.timeline.reset().then(function () { return _this.control = app.ControlStates.RESET; });
                }
            };
        };
        TimelineViewModel.prototype.initializeModel = function () {
            this.timeline = new app.Timeline(this.data);
        };
        return TimelineViewModel;
    })();
    app.TimelineViewModel = TimelineViewModel;
})(app || (app = {}));
//# sourceMappingURL=TimelineViewModel.js.map