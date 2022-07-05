left_wrist_x = 0;
right_wrist_x = 0;
left_wrist_y = 0;
right_wrist_y = 0;
score_left = 0;
score_right = 0;
song1 = "";

function preload() {
    song1 = loadSound("music.mp3");
}

function play2(){
    song1.play();
    song1.rate(1);
    song1.setVolume(1);
}

function stop2() {
    song1.stop();
}

function setup() {
    canvas = createCanvas(550, 450);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    posenet = ml5.poseNet(camera, modelLoaded);
    posenet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("model loaded!");
}



function draw(){
    image(camera,0, 0, 550, 450);
    stroke(255, 0, 0);
    fill(255, 0, 0);
    if(score_right > 0.2){
        circle(right_wrist_x, right_wrist_y, 50)
        if(right_wrist_y > 0 && right_wrist_y <= 90){
            document.getElementById("speed_txt").innerHTML = "SPEED = 0.5";
            song1.rate(0.5); 
            console.log("rate has decreased");
        }
        if(right_wrist_y > 90 && right_wrist_y <= 180){
            document.getElementById("speed_txt").innerHTML = "SPEED = 1.25";
            song1.rate(1.25); 
            console.log("rate has increased");
        }
        if(right_wrist_y > 180 && right_wrist_y <= 270){
            document.getElementById("speed_txt").innerHTML = "SPEED = 1.75";
            song1.rate(1.75); 
            console.log("rate has increased");
        }
        if(right_wrist_y > 270 && right_wrist_y <= 360){
            document.getElementById("speed_txt").innerHTML = "SPEED = 2";
            song1.rate(2); 
            console.log("rate has increased");
        }
        if(right_wrist_y > 360 && right_wrist_y <= 450){
            document.getElementById("speed_txt").innerHTML = "SPEED = 2.5";
            song1.rate(2.5); 
            console.log("rate has increased");
        }
    }

    stroke(255, 0, 0);
    fill(255, 0, 0);
    if(score_left > 0.2){
        circle(left_wrist_x, left_wrist_y   , 50)
    }
    
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        console.log("results");
        left_wrist_x = results[0].pose.leftWrist.x;
        right_wrist_x = results[0].pose.rightWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("left wrist  location = " + "x = " +left_wrist_x + " y = " + + left_wrist_y);
        console.log("right wrist location = " + "x = "+ right_wrist_x + " y = " + right_wrist_y);
        score_right = results[0].pose.keypoints[9].score;
        score_left = results[0].pose.keypoints[10].score;
        console.log("Accuracy has been updated... = " + " left " + score_left + "right" + score_right);

    }
}