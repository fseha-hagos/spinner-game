function randomColor(){
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255);
    b = Math.floor(Math.random() * 255);
    return {r,g,b}
}
function toRad(deg){
    return deg * (Math.PI / 180.0);
}
function randomRange(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}
// get percent between 2 number
function getPercent(input,min,max){
    return (((input - min) * 100) / (max - min))/100
}

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const width = document.getElementById("canvas").width
const height = document.getElementById("canvas").height

const centerX = width/2
const centerY = height/2
const radius = width/2

let textAre = document.getElementsByTagName("textarea");
let items = textAre[0].value.split("\n");
let spinBtn = document.getElementsByClassName("center-circle");
//let textArea = documnet.getElementsByTagName("textarea");

//let spinMusic = document.getElementById("spin-music");
let usualMusic = document.getElementById("usual-music")
let winnerMusic = document.getElementById("winner-music")

//window.onload(usualMusic.play());

let currentDeg = 0
let step = 360/items.length
let colors = []
let itemDegs = {}

for(let i = 0 ; i < items.length + 1;i++){
    if(items[i] !== ""){
        colors.push(randomColor())
    } 
}
function playm(){
    usualMusic.play()

}

function createWheel(){
   
    items = document.getElementsByTagName("textarea")[0].value.split("\n");
    step = 360/items.length
    colors = []
    for(let i = 0 ; i < items.length + 1;i++){
        if(items[i] !== ""){
            colors.push(randomColor())
        }
    }
    draw()
}
draw()

function draw(){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, toRad(0), toRad(360))
    ctx.fillStyle = `rgb(${33},${33},${33})`
    ctx.lineTo(centerX, centerY);
    ctx.fill()

    let startDeg = currentDeg;
    for(let i = 0 ; i < items.length; i++, startDeg += step){

        
        let endDeg = startDeg + step

        color = colors[i]
        let colorStyle = `rgb(${color.r},${color.g},${color.b})`

        ctx.beginPath();
        rad = toRad(360/step);
        ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg))
        let colorStyle2 = `rgb(${color.r - 30},${color.g - 30},${color.b - 30})`
        ctx.fillStyle = colorStyle2
        ctx.lineTo(centerX, centerY);
        ctx.fill()

        ctx.beginPath();
        rad = toRad(360/step);
        ctx.arc(centerX, centerY, radius - 30, toRad(startDeg), toRad(endDeg))
        ctx.fillStyle = colorStyle
        ctx.lineTo(centerX, centerY);
        ctx.fill()

        // draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(toRad((startDeg + endDeg)/2));
        ctx.textAlign = "center";
        if(color.r > 150 || color.g > 150 || color.b > 150){
            ctx.fillStyle = "#000";
        }
        else{
            ctx.fillStyle = "#fff";
        }
        ctx.font = 'bold 24px serif';
        ctx.fillText(items[i], 130, 10);
        ctx.restore();

        itemDegs[items[i]] = 
            {
            "startDeg": startDeg,
            "endDeg" : endDeg
            }
        

        // check winner
        if(startDeg%360 < 360 && startDeg%360 > 270  && endDeg % 360 > 0 && endDeg%360 < 90 ){
            document.getElementById("winner").innerHTML = items[i]
        }
    }
}


let speed = 0
let maxRotation = randomRange(360* 1, 360 * 2)
let pause = false
function animate(){
    
    if(pause){
        win();
        return
    }
    speed = easeOutSine(getPercent(currentDeg ,maxRotation ,0)) * 20
    if(speed < 0.01){
        speed = 0
        pause = true
    }
    currentDeg += speed
    draw()
   
    window.requestAnimationFrame(animate);
    
   
}

function spin(){
    
    usualMusic.pause();
    if(speed != 0){
        return
    }

    maxRotation = 0;
    currentDeg = 0
    createWheel()
    draw();
    
    spinBtn.enable = false;
    //let inpu = document.getElementsByClassName("inputArea");
    //inpu.setAttribute("onchange", "");

    maxRotation = randomRange(360*3,360*4);
    //maxRotation = (360 * 6) - itemDegs['cat'].endDeg + 10
    itemDegs = {}
    console.log("max",maxRotation)
    console.log(itemDegs);
    pause = false
    window.requestAnimationFrame(animate);
    
}


function win(){
  
 winnerMusic.play();
    var item = document.getElementById("winner");
    Swal.fire({
        title: `Congragulation ${item.innerHTML} !`,
        text: "You Have Won the Game!",
        icon: "success"
      });

}


particlesJS("particles-js", {"particles":{"number":{"value":402,"density":{"enable":true,"value_area":78.91600969088593}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":6},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5524120678362014,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":10,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.4,"width":2},"move":{"enable":true,"speed":6,"direction":"bottom","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},"bubble":{"distance":400,"size":4,"duration":0.3,"opacity":1,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;