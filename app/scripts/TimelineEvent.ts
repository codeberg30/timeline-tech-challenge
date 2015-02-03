"use strict";
module app {
    export class TimelineEvent {
        age: number;
        content: string;
        duration: number;
        active: boolean = false;
        constructor (age:number, content:string){
            this.age = age;
            this.content = content;
        }
    }
}