/// <reference path="TypeDefinitions/es6-promise.d.ts" />
/// <reference path="TimelineEvent.ts" />

"use strict";
module app {

    export class Timeline {
        private static utils = {
            ageSort: function (a, b) {
                if (a.age > b.age) return 1;
                if (a.age < b.age) return -1;
                return 0;
            },
            durationMultiplier: 2000
        };

        firstName:string;
        lastName:string;
        age:number;
        events:TimelineEvent[];
        paused:boolean = true;
        finished:boolean = false;
        private _currentSlide:number = 0;

        constructor(obj?:any) {
            this.firstName = obj && obj.firstName || '';
            this.lastName = obj && obj.lastName || '';
            this.age = obj && obj.age || 0;
            this.events = obj && obj.events || [];
            if (this.events.length > 1) {
                this.events.sort(Timeline.utils.ageSort)
                    .forEach((el, index)=> {
                        if (this.events[index + 1]) {
                            el.duration = this.events[index + 1].age - el.age;
                        } else {
                            el.duration = this.age - el.age;
                        }
                        el.duration *= Timeline.utils.durationMultiplier;
                    });
            }
        }

        get currentSlide():number {
            return this._currentSlide;
        }

        set currentSlide(index:number) {
            if(index >= 0 && index < this.events.length) {
                this._currentSlide = index;
            } else if (index === this.events.length) {
                this.finished = true;
                this.paused = true;
            }
        }

        pause() {
            return new Promise((resolve, reject)=>{
                this.paused = true;
                resolve();
            });
        }

        play() {
            return new Promise((resolve, reject)=>{
                this.paused = false;
                resolve(this.events[this.currentSlide]);
            });
        }

        reset() {
            return new Promise((resolve, reject)=>{
                this.paused = false;
                this.currentSlide = 0;
                resolve(this.events[this.currentSlide]);
            });
        }
    }
}
