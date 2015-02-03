"use strict";

module app {
    export class Animation {
        static dropDown = [
            {transform: 'translateY(-400px) rotateX(90deg) scale(5)',opacity:0, offset:0},
            {transform: 'translateY(0px) rotateX(0deg) scale(1)', opacity:1, offset:0.02},
            {transform: 'translateY(0px) rotateX(0deg) scale(1)', opacity:1, offset:0.98},
            {transform: 'translateY(-400px) rotateX(90deg) scale(5)',opacity:0, offset:1},
        ];
        constructor(){}
    }
}