

var defaultLogo = "https://cdn.discordapp.com/attachments/590222490538868736/842279911531741184/LOGO_2020_2_V3.png";
var defaultGif  = "https://i.gifer.com/KEa6.gif"
var playerGif   = "https://i.pinimg.com/originals/0c/e9/d2/0ce9d222a4ac14ac1ea08ba70defb376.gif"
var _circle = false;

// Get data from webserver.ts
socket.on('visorData', msg => {
    
    if (!msg) 
    {
        msg = {
            title: "..::Fenix Recluta::..",
            user: "ShaiBot 4",
            time: 0,
            img: defaultLogo
        }
        document.getElementById("cont").style.backgroundImage = "url("+defaultGif+")";
        _circle = false;
    } else {
        document.getElementById("cont").style.backgroundImage = "url("+playerGif+")";
        msg.user = "<span class='user-pre'>enviado por</span> <b>@</b>" + msg.user;
        _circle = true;
    }

    let cover = msg.img;

    if (cover == undefined || cover == null)
        cover = "https://cdn.discordapp.com/attachments/590222490538868736/915994848333561856/resumen-neon-brillante-triangulo-jugar-icono-signo-sobre-fondo-morado-oscuro-rejilla-laser_148087-117.png";
    
    document.getElementById("imge").style.backgroundImage = "url(" + cover +")";
    document.getElementById("title").innerHTML  = msg.title;
    document.getElementById("user").innerHTML   = msg.user;
    document.getElementById("time").innerHTML   = times(msg.time);

    document.getElementById("marco").style.boxShadow = "0px 0px 4px 5px #ff9800";

});



// Border Color morph
var ciclo = setInterval(function(){
    if (!_circle) return;
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const e = Math.floor(Math.random() * 5) + 1;
    document.getElementById("imge").style.boxShadow = "0px 0px 4px " + e + "px #" + randomColor + "ee";
}, 3000)



// Convert Seconds to HH:MM:SS
const times = (secs) => {
    if (typeof secs != 'number')
        secs = parseInt(secs);

    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}


// Init Web values

document.getElementById("imge").style.backgroundImage = "url(" + defaultLogo +")";
document.getElementById("title").innerHTML  = "ShaiBot 4";
document.getElementById("user").innerHTML   = "@Fenix";
document.getElementById("time").innerHTML   = times(0);
document.getElementById("cont").style.backgroundImage = "url("+defaultGif+")";