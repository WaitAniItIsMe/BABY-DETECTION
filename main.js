img="";
status="";
objects = [];
alarm = "";
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function preload(){
    alarm = loadSound("confusion.mp3");
}

function modelLoaded(){
console.log("model loaded succesfully (✿◡‿◡)");
status = true;
}

function gotResult(error, results){
if(error){
    console.log(error);
}
console.log(results);
objects = results;
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Running";
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected in the image: " + objects.length;
            fill(r, g, b);
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("r, g, b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label == "person"){
                alarm.stop();
                document.getElementById("status").innerHTML = "Status: baby detected."
            }
            else{
                alarm.play();
                document.getElementById("status").innerHTML = "Status: baby misisng. help. oh my god this is bad. AHH.";
            }
            if(objects.length == 0){
                alarm.play();
                document.getElementById("status").innerHTML = "Status: baby misisng. help. oh my god this is bad. AHH.";
            }
        }
    }
}
