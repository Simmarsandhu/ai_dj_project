left_score="";
left_status="";
right_score="";
right_status="";
song1="";
song2="";
rightwristX="";
leftwristX="";
rightwristY="";
leftwristY="";
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");

}
function setup(){
    canvas= createCanvas(500,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide()
    Sound=ml5.poseNet(video,modelLoaded);
    Sound.on("pose",gotposes)
}
function draw(){
    image(video,0,0,500,500);
    left_status=song1.isPlaying();
    right_status=song2.isPlaying();
       
    fill("red");
    stroke("red");
    if(left_score>0.2){
    circle(leftwristX,leftwristY,30);
    song2.stop();
    if(left_status==false){
        song1.play();
        document.getElementById("song_name").innerHTML="harry potter";
    }
     }
    if(right_score>0.2){
        circle(rightwristX,rightwristY,30);
        song1.stop();
        if(right_status==false){
            song2.play();
            document.getElementById("song_name").innerHTML="peter pan";
        }
         }
    
    
    
}



function modelLoaded(){
    console.log("modeLoaded");

}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x; 
        rightwristX=results[0].pose.rightWrist.x;
        
        leftwristY=results[0].pose.leftWrist.y; 
        rightwristY=results[0].pose.rightWrist.y;
        console.log("leftwrist x="+leftwristX+"right wrist x="+rightwristX+"right wrist x="+rightwristY+"leftwrist y="+leftwristY);
        left_score=results[0].pose.keypoints[9].score;
        right_score=results[0].pose.keypoints[10].score;

    }
}
