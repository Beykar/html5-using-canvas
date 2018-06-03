/**
 * Created by Hamid on 25/08/2017.
 * @name script.js
 * @desc script to manipulate the canvas in index file
 */

(function(){
    const
        c1          =   document.getElementById("c1"),
        ctx1        =   c1.getContext("2d"),
        w           =   c1.width,
        h           =   c1.height,
        planePic    =   document.getElementById("planePic"),
        picW        =   100,
        picH        =   100
    ;

    let
        clearBtn    =       document.getElementById("clearBtn"),
        pauseBtn    =       document.getElementById("pauseBtn"),
        restoreBtn  =       document.getElementById("restoreBtn"),
        restartBtn  =       document.getElementById("restartBtn"),
        following = true,
        paused      =       false,
        // this will store the game instance
        game        =       null,


    Plane   = function (p) {

        this.p = p.getBoundingClientRect();
        this.x =  p.x ;
        this.y =  p.y ;
        bound  =  c1.getBoundingClientRect();
        mx     =  this.x - bound.left;
        my     =  this.y - bound.left;


    };

    Plane.prototype.movePlane   =   function(){


        if(this.x < w){
            clearCanvas(c1, 0, 0, w, h);
            this.x += picW;
            drawPlane(this.x, this.y);

            console.log("this is the X: " + this.x + " this is the Y: " + this.y);
        } else {
            this.x = -picW;
        }

    };//movePlane

    plane = new Plane(planePic);




    let

        /**
         * @name    drawGuidelines
         * @desc    this will draw guidelines following mouse cursor
         * @param   {number}    mx      mouse cursor X
         * @param   {number}    my      mouse cursor Y
         *
         * ctx.moveTo(x1,y1)
         * ctx.lineTo(x2,y2)
         */
        setGuidelines = function(mx, my){
            ctx1.beginPath();
            ctx1.moveTo(0, my);
            ctx1.moveTo(mx, 0);
            ctx1.closePath();
        }, // drawGuidelines


        /**
         * @desc    this will receive a canvas and size of the rect to clear
         *              then it will clear given section
         * @param canvasToClear
         * @param x
         * @param y
         * @param w
         * @param h
         */
        clearCanvas = function (canvasToClear, x, y, w, h) {
            let ctx = canvasToClear.getContext("2d");
            ctx.clearRect(x, y, w, h);
        }, // clearCanvas


        /**
         * @name    drawCentre
         * @desc    this will draw a dot on the centre of the canvas
         * @param   {number}    mx      mouse cursor X
         */
        drawPlane = function (mx, my) {
            ctx1.beginPath();
            ctx1.drawImage(planePic, mx, my, picW,picH);
            ctx1.closePath();
        }, // drawCentre

        /**
         * @name    onMouseMove
         * @desc    this will get mouse cursor position and control graphics
         * @param   {object}    e   mousemove event
         */
        onMouseMove = function (e) {
            let
                x       =   e.clientX,
                y       =   e.clientY,
                bBox    =   c1.getBoundingClientRect(),
                mx      =   x - bBox.left,
                my      =   y - bBox.top
            ;

            clearCanvas(c1, 0, 0, w, h);
            setGuidelines(mx,my);
            drawPlane(mx, my);






        }, // onMouseMove


        /**
         * @name    playLoop
         * @desc    this is the game loop, it will animate the game
         */
        playLoop = function () {
            if(!paused){
                paused = false;
                clearCanvas(c1);
                plane.movePlane();
                drawPlane(mx,my);

                game = requestAnimationFrame(playLoop);
            }
        }, // playLoop

        // pausing the game
        pauseGame = function () {
            paused = true;
        }, // pauseGame

        bindMouseEvents = function(){
            c1.addEventListener("mousemove", onMouseMove);

            c1.addEventListener("click", function () {
                if(following){
                    c1.removeEventListener("mousemove", onMouseMove);
                    playLoop();
                } else {
                    c1.addEventListener("mousemove", onMouseMove);
                }
                following = !following;
            });
        }, // bindMouseEvents

        bindBtns    =   function () {

            clearBtn.addEventListener("click", function (){
                game = null;
                paused = false;
                clearCanvas(c1,0,0,w,h);
            });

            pauseBtn.addEventListener("click", pauseGame);

            restoreBtn.addEventListener("click", function () {
                if(paused){
                    paused = false;
                    playLoop();
                }
            });
            restartBtn.addEventListener("click", function () {
                paused = false;
                game = null;
                bindMouseEvents();
            });

        },//bindBtns


        init    =   function () {

            bindMouseEvents();
            bindBtns();
        }//init
    ;
    window.addEventListener("load", init);
})();//IFFE