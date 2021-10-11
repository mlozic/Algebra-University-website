let moto1Div = document.getElementById("moto1");
let moto2Div = document.getElementById("moto2");

const moto1 = "Budi izvrstan u onome što vidiš";
const moto2 = "ZAISKRI";
let arr = moto1.split("");
let timer;
let borderTimer;

let finished = false;
let replaced = false;

moto2Div.style.borderColor = "transparent";

function showMoto(div) {
  if (arr.length > 0) {
    div.innerHTML += arr.shift();
    timer = setTimeout(() => {
      showMoto(div);
    }, 300);
  } else {
    if (!replaced) {
      clearTimeout(timer);
      moto1Div.innerHTML = "Budi izvrstan u onome što ";
      arr = "voliš".split("");
      replaced = true;
      showMoto(div);
    } else if (replaced && !finished) {
      finished = true;
      arr = moto2.split("");
      moto1Div.style.borderColor = "transparent";
      clearTimeout(borderTimer);
      showBorder(moto2Div);
      showMoto(moto2Div);
    } else if (replaced && finished) {
      div.innerHTML += "<span style='color:white;'>.</span>";
    }
  }
}
function showBorder(div) {
  div.style.borderColor = "white";
  borderTimer = setTimeout(() => {
    hideBorder(div);
  }, 450);
}
function hideBorder(div) {
  div.style.borderColor = "transparent";
  borderTimer = setTimeout(() => {
    showBorder(div);
  }, 450);
}
showBorder(moto1Div);
showMoto(moto1Div);
