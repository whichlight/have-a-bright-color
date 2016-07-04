var h;
var w;
var bcol;
var hue;


var setup = function(){
  colorMode(HSB, 360,1,1)
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;

  //disable default touch events for mobile
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", pdefault, false);
  el.addEventListener("touchend", pdefault, false);
  el.addEventListener("touchcancel", pdefault, false);
  el.addEventListener("touchleave", pdefault, false);
  el.addEventListener("touchmove", pdefault, false);


  var el = document.getElementsByTagName("div")[0];
  el.addEventListener("touchstart", pdefault, false);
  el.addEventListener("touchend", pdefault, false);
  el.addEventListener("touchcancel", pdefault, false);
  el.addEventListener("touchleave", pdefault, false);
  el.addEventListener("touchmove", pdefault, false);

  var queryHue = getParameterByName("hue");
  queryHue = parseFloat(queryHue);
  if(queryHue){
    hue = queryHue;
  } else{
    hue = random(360);
  }
  updateColor(hue);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function pdefault(e){
  e.preventDefault()
}


var touchStarted= function(){
  clicked(touchX,touchY);
}

var touchMoved= function(){
  clicked(touchX,touchY);
}

var touchEnded= function(){
 // clicked(touchX,touchY);
}

var updateColor = function(hue){
  hue = hue.toFixed(4);
  bcol = color(hue,1,1);
  window.history.pushState("", "color: " + hue, "/?hue="+hue);
}

var clicked = function(x,y){
  hue = map(y,0,h,0,360);
  updateColor(hue);

  var el = document.getElementsByClassName('info')[0];
  if(el){
      el.remove();
  }
}

var draw = function(){
  background(bcol);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
