var retrievedObject = localStorage.getItem('volumen');
var volus       = JSON.parse(retrievedObject);

var ttsPlayer   = new Audio();
var alrPlayer   = document.getElementById('chatSound');

if (volus){
    ttsPlayer.volume = volus.tts;
    alrPlayer.volume = volus.rin;
}

var ttsCola     = [];
var ttsOnPlay   = false;
var msgRing     = false;

var ttsDelay    = 3000;
var rinDelay    = 10000;

if (volus){
    document.getElementById("ttsVol").value = volus.tts;
    document.getElementById("rinVol").value = volus.rin;
}


socket.on('ttsSettings', delays => {
    ttsDelay = delays.tts;
    rinDelay = delays.rin;
});


socket.on('text2speech', async(audioStr) => {
    ttsCola.push(audioStr);

    if (ttsOnPlay === false && ttsCola.length > 0) 
        await ttsPlay();
    
});


socket.on('msgRing',()=> {
    if(!msgRing){
        msgRing = true;
        playRing();
    }
        
});




// Se activa cuando ttsPlayer termina de transmitir
ttsPlayer.addEventListener("ended", async() => {
    ttsPlayer.currentTime = 0;
    ttsOnPlay   = false;
    ttsDelay    = parseInt(ttsDelay);
    ttsDelay    = ttsDelay < 3000 ? 3000 : ttsDelay;

    setTimeout(async() => {
        await ttsPlay();
    }, ttsDelay);
    
});


async function ttsPlay(){
    if (!ttsCola) return;
        
    if (ttsCola.length == 0) return;

    ttsPlayer.src = "data:audio/ogg;base64," + ttsCola[0];
    ttsPlayer.play();
    ttsCola.shift();
    ttsOnPlay = true;
}


function playRing(){
    console.log(alrPlayer.src)
    alrPlayer.play();

    let rn = setTimeout(() => {
        msgRing = false;
    }, rinDelay)

}


function setVolumen(valor,slider){
    if (slider)
        ttsPlayer.volume = valor;
    else
        alrPlayer.volume = valor;

    let t = document.getElementById("ttsVol").value;
    let r = document.getElementById("rinVol").value;
    var testObject = { 'tts': t, 'rin': r };
    localStorage.setItem('volumen', JSON.stringify(testObject));
    var retrievedObject = localStorage.getItem('volumen');
    JSON.parse(retrievedObject)

}