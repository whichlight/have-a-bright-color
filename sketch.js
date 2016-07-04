var h;
var w;
var bcol;
var hue;

introremove = false;


var setup = function(){
  colorMode(HSB, 360,1,1)
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;

  //disable default touch events for mobile
  var el = document.getElementsByTagName("canvas")[0];
  removeDefaults(el);

  var el = document.getElementsByClassName("info")[0];
  removeDefaults(el);

  var el = document.getElementsByClassName("title")[0];
  removeDefaults(el);


  var queryHue = getParameterByName("hue");
  queryHue = parseFloat(queryHue);
  if(queryHue){
    hue = queryHue;
  } else{
    hue = random(360);
  }
  updateColor(hue);
}


function removeDefaults(el){
  el.addEventListener("touchstart", pdefault, false);
  el.addEventListener("touchend", pdefault, false);
  el.addEventListener("touchcancel", pdefault, false);
  el.addEventListener("touchleave", pdefault, false);
  el.addEventListener("touchmove", pdefault, false);
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
  hue = hue.toFixed(0);
  bcol = color(hue,1,1);
  window.history.pushState("", "color: " + hue, "/?hue="+hue);
}

var clicked = function(x,y){

  if(!introremove){
  var el = document.getElementsByClassName('info')[0];
  if(el){
      el.remove();
      el = document.getElementsByClassName('title')[0];
      el.remove();
  }
  introremove=true;
  }
  else{
  hue = map(y,0,h,0,360);
  updateColor(hue);
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
