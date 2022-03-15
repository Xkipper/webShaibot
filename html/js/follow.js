var nicks       = [];
var matrix      = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
//var nums      = '0123456789';
var katakana    = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
var font_size   = 14;
var columns     = document.getElementById("c").width/font_size; //number of columns for the rain
var alrPlayer   = document.getElementById('followSound');
var ma          = "";
var run         = false;


socket.on('followData', msg => { 
    nicks.push(msg);
    if (nicks.length == 1 && run == false) {
        startFollow();
    }
});






function startFollow(){
    run = true;
    matrix = nicks[0];
    document.getElementById("texto").innerHTML = `Gracias por seguirme '<span>${nicks[0]}</span>'...`;
    let c = document.getElementById("c");
    c.style.opacity = "1";
    c.style.transform = "scale(1)";
    c.style.display = "none";
    columns = c.width/font_size;
    font_size = 14;

    alrPlayer.src = "sound/matrix_ringtone.mp3";
    playFollow();

    document.getElementById("typewriter").style.display = "block";
    
    setTimeout(() => {
                        document.getElementById("typewriter").style.display = "none";
                        c.style.display = "block";
                        alrPlayer.src = "sound/glitch-logo.mp3";
                        playFollow();
                        
                        
                        var la = setInterval(()=>{
                            clearInterval(la);
                            var o = 1;
                            var t = 1;
                        
                            var opa = setInterval(()=>{                                
                                                        o = o - 0.02;
                                                        t = t + 0.01;
                                                        c.style.transform = "scale("+t+")";

                                                        if(o < 0) {
                                                            //clearInterval(la);
                                                            clearInterval(opa);
                                                            clearInterval(ma);
                                                            nicks.shift();
                                                            run = false;
                                                            if(nicks.length > 0)
                                                                startFollow();
                                                        }
                                                        
                                                        c.style.opacity = o;
                            }, 100);
                        
                        }, 10000)
                        
                        superMTX();

    }, 8000);

}



function playFollow(){
    console.log(alrPlayer.src)
    alrPlayer.play();
}








function superMTX(){

//
//      T H E  M A T R I X   C O D E
//

    // geting canvas by id c
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    //chinese characters - taken from the unicode charset  

    matrix += katakana; //+ nums;
    //converting the string into an array of single characters
    matrix = matrix.split("");
    
    columns = c.width/font_size; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columns; x++)
        drops[x] = 1;


    ma = setInterval(draw, 45);


    //drawing the characters
    function draw()
    {
        //Black BG for the canvas
        //translucent BG to show trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "#0F0"; //green text
        ctx.font = font_size + "px arial";
        //looping over drops
        for(var i = 0; i < drops.length; i++)
        {
            //a random chinese character to print
            var text = matrix[Math.floor(Math.random()*matrix.length)];
            //x = i*font_size, y = value of drops[i]*font_size
            ctx.fillText(text, i*font_size, drops[i]*font_size);

            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if(drops[i]*font_size > c.height && Math.random() > 0.975)
                drops[i] = 0;

            //incrementing Y coordinate
            drops[i]++;
        }
    }


}