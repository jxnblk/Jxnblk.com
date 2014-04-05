// Presentation
// Scrollable presentation websites

// To do:
// - current class
// - menu
// - data-img & data-title for menu
// - setindex when scrolling?

window.onload = function() {

var bd = document.getElementsByTagName('body')[0],
    links = document.getElementsByClassName('js-link'),
    slides = document.getElementsByClassName('js-slide'),
    nextButton = document.getElementsByClassName('js-next')[0],
    previousButton = document.getElementsByClassName('js-previous')[0],
    index = 0,
    isScrolling = false;

function scroll(el) {
  isScrolling = true;
  var to = el.offsetTop,
      from = bd.scrollTop,
      y = to - from;
  bd.style.marginTop = -y + "px";
  bd.style.transition = 'margin-top .5s ease';
  bd.addEventListener('transitionend', function(){
    bd.style.marginTop = 0;
    bd.scrollTop = to;
    bd.style.transition = 'none';
    isScrolling = false;
  });
};

function setIndex(el) {
  for (var i=0;i<slides.length;i++){
    if (slides[i] == el) {
      index = i;
    }
  }
};

if (links) {
  for (var i=0;i<links.length;i++){
    links[i].onclick = function(e){
      e.preventDefault();
      var id = this.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      setIndex(el);
      scroll(el);
    };
  };
}


function next() {
  if (isScrolling) return false;
  if (index < slides.length - 1) index++;
  else index = 0;
  scroll(slides[index]);
};

function previous() {
  if (isScrolling) return false;
  if (index > 0) index--;
  else index = slides.length - 1 ;
  scroll(slides[index]);
};

if (nextButton) nextButton.onclick = next;
if (previousButton) previousButton.onclick = previous;

//function fullscreen() {
//  bd.style.overflowY = 'scroll';
//  bd.webkitRequestFullScreen();
//};

document.onkeydown=function(e) {
  if (e.which == 40 || e.which == 32 || e.which == 74) {
    // down, space, j
    e.preventDefault();
    next();
  } else if (e.which == 38 || e.which == 75) {
    // up, k
    e.preventDefault();
    previous();
  } else if (e.which == 70) {
    //fullscreen();
  }
};

};
