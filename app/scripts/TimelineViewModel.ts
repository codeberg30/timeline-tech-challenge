/// <reference path="Timeline.ts" />
/// <reference path="TimelineEvent.ts" />
/// <reference path="Animation.ts" />
"use strict";

module app {
    export var ControlStates = {
        'PLAY':'play',
        'PAUSE':'pause',
        'RESET':'reset'
    }
    export class TimelineViewModel {

        data:any;
        container:HTMLElement;
        slides:NodeList;
        controlElement:HTMLElement;
        _control:string;
        timeline: Timeline;
        animationPlayer: any;

        constructor(container: HTMLElement, url: string){
            this.container = container;
            this._control = ControlStates.PLAY;
            if(url) {
                this.requestTimeline(url)
                    .then(()=>{
                        this.initializeView();
                        this.initializeModel();
                    },()=>console.log("Error -> requestingTimeline data"));
            }
        }
        requestTimeline(url){
            var that = this;
            return new Promise(function(resolve, reject){
                var request = new XMLHttpRequest();
                request.open('GET', url);
                request.onreadystatechange = function() {
                    if (request.status === 200) {
                        if(request.readyState === 4) {
                            that.data = JSON.parse(request.response);
                            resolve(that.data)
                        }
                    } else {
                        reject(Error('Url didn\'t load successfully; error code:' + request.statusText));
                    }
                };
                request.onerror = function() {
                    reject(Error('There was a network error.'));
                };
                request.send();
            })
        }
        initializeView(){
            this.container.innerHTML = "<div class=\"slide\"></div>" +
                "<div class=\"playback-control\">"+ControlStates.PLAY+"</div>";
            this.slides = this.container.getElementsByClassName("slide");
            this.controlElement = (<HTMLElement>this.container.querySelector('.playback-control'));
            this.controlElement.addEventListener('click', (e) => this.controlClickHandler(e));
        }
        controlClickHandler(e:MouseEvent){
            var that = this;
            if(that.animationPlayer) {
                switch(that.animationPlayer.playState) {
                    case"paused":
                        this.timeline.play()
                            .then((timelineEvent:TimelineEvent)=>that.animationPlayer.play())
                            .then(()=> this.control = ControlStates.PAUSE);
                        break;
                    case"running":
                        this.timeline.pause()
                            .then(()=>that.animationPlayer.pause())
                            .then(()=> this.control = ControlStates.PLAY);
                        break;
                    case"finished":
                        this.timeline.reset()
                            .then((timelineEvent:TimelineEvent)=> this.playSlide(timelineEvent))
                            .then(()=>this.control = ControlStates.PAUSE);
                        break;
                    default:
                        console.log("unexpected -> ", that.animationPlayer.playState);
                }
            } else {
                this.timeline.play()
                    .then((timelineEvent:TimelineEvent)=> this.playSlide(timelineEvent))
                    .then(()=> this.control = ControlStates.PAUSE);
            }
        }
        get control():string {
            return this._control;
        }
        set control(str:string) {
            this.controlElement.textContent = this._control = str;
        }
        playSlide(timelineEvent:TimelineEvent){
            this.slides[0].textContent = "At age " + timelineEvent.age + ", " + this.timeline.firstName + " " + timelineEvent.content;
            this.animationPlayer = (<AnimatingNode>this.slides[0]).animate(
                Animation.dropDown,
                {
                    duration:timelineEvent.duration
                    //easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)' // ...meh needs work
                }
            );
            this.animationPlayer.onfinish = (arg)=> {
                this.timeline.currentSlide++;
                if(!this.timeline.finished || !this.timeline.paused) {
                    this.timeline.play().then((timelineEvent:TimelineEvent)=> this.playSlide(timelineEvent));
                } else {
                    this.timeline.reset().then(()=>this.control = ControlStates.RESET);
                }
            }
        }

        initializeModel(){
            this.timeline = new Timeline(this.data);
        }
    }
    interface AnimatingNode extends Node {
        animate(obj:any, timingObj:any): any;
    }
}