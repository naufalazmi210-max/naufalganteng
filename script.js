const correctCode = "010824";
let entered = "";
const dots = [...document.querySelectorAll("#pinDots i")];
const feedback = document.getElementById("feedback");
const lockScreen = document.getElementById("lockScreen");
const loveScreen = document.getElementById("loveScreen");

function updateDots(){ dots.forEach((dot,i)=>dot.classList.toggle("filled",i<entered.length)); }
function checkCode(){
  if(entered.length !== 6) return;
  if(entered === correctCode){
    lockScreen.classList.add("hidden");
    loveScreen.classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
  } else {
    feedback.textContent = "belum tepat, coba inget-inget lagi ya ♡";
    feedback.style.color = "#cf657d";
    entered = "";
    updateDots();
  }
}
document.querySelectorAll("[data-digit]").forEach(button=>{
  button.addEventListener("click",()=>{
    if(entered.length>=6) return;
    entered += button.dataset.digit;
    updateDots();
    if(entered.length===6) setTimeout(checkCode,180);
  });
});
document.getElementById("delete").addEventListener("click",()=>{
  entered=entered.slice(0,-1);
  feedback.textContent="petunjuk: 6 angka yang punya arti buat kita ♡";
  feedback.style.color="#b07d8b";
  updateDots();
});
const song=document.getElementById("song");
const musicButton=document.getElementById("musicButton");
const musicHint=document.getElementById("musicHint");
musicButton.addEventListener("click",async()=>{
  try{
    if(song.paused){await song.play();musicButton.textContent="Ⅱ Jeda lagu";musicHint.textContent="sedang diputar: Perfect — Ed Sheeran";}
    else{song.pause();musicButton.textContent="♫ Putar lagu kita";musicHint.textContent="backsound: Perfect — Ed Sheeran";}
  }catch(e){musicHint.textContent="Tambahkan file assets/perfect.mp3 terlebih dahulu.";}
});
document.getElementById("replay").addEventListener("click",()=>{
  song.pause();song.currentTime=0;musicButton.textContent="♫ Putar lagu kita";
  loveScreen.classList.add("hidden");lockScreen.classList.remove("hidden");
  entered="";updateDots();feedback.textContent="petunjuk: 6 angka yang punya arti buat kita ♡";
});
