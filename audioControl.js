var audio, playbtn, mutebtn, seekslider, volumeslider, seeking=false, seekto, curtimetext, durtimetext, volume=false;
	audio = new Audio();
	audio.src = "SomeoneMaster.mp3";
  audio.preload = "meta";
  audio.loop = false;
  //audio.pause();
//window.addEventListener("load", initAudioPlayer);
audio.addEventListener("loadeddata", initAudioPlayer);
  
function initAudioPlayer() {
	playbtn = document.getElementById("playBtn");
	mutebtn = document.getElementById("mutebtn");
	seekslider = document.getElementById("seekslider");
	volumeslider = document.getElementById("volumeslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	playbtn.addEventListener("click",playPause);
	mutebtn.addEventListener("click", mute);
	seekslider.addEventListener("mousedown", function(event){ seeking=true; seek(event); });
	seekslider.addEventListener("mousemove", function(event){ seek(event); });
	seekslider.addEventListener("mouseup",function(){ seeking=false; });
  
	volumeslider.addEventListener("mousedown", function(event){ volume=true; seek(event); });
  volumeslider.addEventListener("mousemove",  function() { setvolume(event); }, false);
	volumeslider.addEventListener("mouseup",function(){ volume=false; });

  audio.addEventListener("timeupdate", function(){ seektimeupdate(); });

function mute(){
  if(audio.muted){
    audio.muted = false;
    mutebtn.style.background = "url(audioControls/speakerBtn.png) no-repeat";
  } else {
    audio.muted = true;
    mutebtn.style.background = "url(audioControls/speakerMute.png) no-repeat";
  }
}
function seek(event) {
  if(seeking) {
    offset=$('#seekslider').offset().left;
    var mouseX = event.clientX - offset;
    num = ((mouseX - 0)/(1 - 0))/100;
    normalized = parseFloat(num).toFixed(1);
    var n = parseInt(num*100)
    seekslider.value = event.clientX - offset;
    seekto = audio.duration * (seekslider.value / 100);
    audio.currentTime = seekto;
    $('#seekslider').text(parseInt(audio.currentTime)+'s');
    $('#seekslider').css( {'background':'linear-gradient(to right, #00ffff 0%,#00ffff ' + n + '%,#00ffff ' + n + '%,#636363 ' + n + '%,#636363 100%)' });
  }
}
function setvolume(event) {
  if(volume) {
    offset = $('#volumeslider').offset().left;
    var mouseX = event.clientX - offset;
    num = ((mouseX - 0)/(1 - 0))/100;
    normalized = parseFloat(num).toFixed(1);
    var n = parseInt(num*100)+1
    $('#volumeslider').text(n);
    audio.volume = normalized;
    $('#volumeslider').css( {'background':'linear-gradient(to right, #00ffff 0%,#00ffff ' + n + '%,#00ffff ' + n + '%,#636363 ' + n + '%,#636363 100%)' });
  }
}
function seektimeupdate() {
  var n = audio.currentTime * (100 / audio.duration);
  $('#seekslider').text(parseInt(audio.currentTime)+'s');
  $('#seekslider').css( {'background':'linear-gradient(to right, #00ffff 0%,#00ffff ' + n + '%,#00ffff ' + n + '%,#636363 ' + n + '%,#636363 100%)' });
  var curmins = Math.floor(audio.currentTime / 60);
  var cursecs = Math.floor(audio.currentTime - curmins * 60);
  var durmins = Math.floor(audio.duration / 60);
  var dursecs = Math.floor(audio.duration - durmins * 60);
  if(cursecs < 10){ cursecs = "0"+cursecs; }
  if(dursecs < 10){ dursecs = "0"+dursecs; }
  if(curmins < 10){ curmins = "0"+curmins; }
  if(durmins < 10){ durmins = "0"+durmins; }
  curtimetext.innerHTML = curmins+":"+cursecs;
  durtimetext.innerHTML = durmins+":"+dursecs;
}
} // end initAudioPlayer

