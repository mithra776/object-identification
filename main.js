img = "";
staatuus = "";
objects = [];

function setup()
{
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
} 

function modelLoaded()
{
    console.log("Model Loaded")
    staatuus = true;
    objectDetector.detect(video , gotResult);
}

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function draw()
{
    image(video , 0 , 0 , 380 , 380);

    r = random(255);
    g = random(255);
    b = random(255);

    if(staatuus != "")
    {
        objectDetector.detect(video , gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are" + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15 );
            noFill();
            stroke(r,g,b,);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    } 

    //fill("#0004fa");
    //text("Dog" , 45 , 75);
    //noFill();
    //stroke("#0004fa");
    //rect(30 , 60 , 450 , 350);
    
    
   // fill("#ff00f2");
   // text("Cat" , 310 , 90);
    //noFill();
   // stroke("#ff00f2");
   // rect(295 , 75 , 265 , 320);
}

function gotResult(error , results)
{
   if(error)
   {
       console.error(error);
   }

   else
   {
     console.log(results);
     objects = results;
   }
}