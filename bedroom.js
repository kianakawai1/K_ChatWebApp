img = "";
statuss="";
objects = [];

function preload(){
    img = loadImage("bed_room.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(statuss != ""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("objectdetected").innerHTML="There is one main object in the image. Objects detected:" + objects.length;
            fill("red");
            percent = floor(objects[i].confidence * 100 );
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}

function modelLoaded(){
    console.log("Model loaded");
    statuss=true; 
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
    objects = results;
}