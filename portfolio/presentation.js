// Presentation
// Scrollable presentation websites

// To do:
// x - current class
// - menu
// - data-img & data-title for menu
// - setindex when scrolling - almost working
// x - reset index on window resize
// x - shift space goes up
// x - url hash
// - figure out jank in iOS
// - fix back button hijacking shit

window.onload = function() {


if ('ontouchstart' in document.documentElement) {
  console.log('is touch');
  return false;
};

var bd = document.getElementsByTagName('body')[0],
    links = document.getElementsByClassName('js-link'),
    slides = document.getElementsByClassName('js-slide'),
    menu = document.getElementsByClassName('js-menu')[0];
    nextButton = document.getElementsByClassName('js-next')[0],
    previousButton = document.getElementsByClassName('js-previous')[0],
    index = 0,
    isScrolling = false,
    isMoving = false;

function buildMenu() {
  if(!menu) return false;
  var link;

  for (var i=0;i<slides.length;i++) {
    link = document.createElement('a');
    link.innerText = i + 1;
    link.className = 'mr1 mid-gray';
    link.setAttribute('href', '#' + i);
    link.onclick = function(e){
      e.preventDefault();
      var href = this.getAttribute('href').slice(1);
      scroll(slides[href]);
    };
    menu.appendChild(link);
  };
};
buildMenu();

function removeCurrent(){
  var pattern = new RegExp('\\s*' + 'current' + '\\s*');
  for (var i=0;i<slides.length;i++) {
    slides[i].className = slides[i].className.replace(pattern, '');
  }
};

function scroll(el, speed) {
  isScrolling = true;
  removeCurrent();
  el.className = el.className + ' current';
  window.location.hash = index + 1;
  var to = el.offsetTop,
      from = bd.scrollTop,
      y = to - from,
      dur = speed || 0.4;
  if(y == 0) {
    isScrolling = false;
    isMoving = false;
    return false;
  };
  bd.style.webkitTransform = 'translateY(' + -y + 'px)';
  bd.style.transform = 'translateY(' + -y + 'px)';
  bd.style.webkitTransition = '-webkit-transform ' + dur + 's ease-in-out';
  bd.style.transition = 'transform ' + dur + 's ease-in-out';
  function reset(){
    bd.style.webkitTransform = 'none';
    bd.style.transform = 'none';
    bd.style.webkitTransition = 'none';
    bd.style.transition = 'none';
    bd.scrollTop = to;
    isScrolling = false;
    isMoving = false;
    bd.removeEventListener('transitionend', reset);
  };
  bd.addEventListener('transitionend', reset);
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

function updateIndex(){
  var ypos = bd.scrollTop;
  if (isScrolling || isMoving) return false;
  if (ypos == slides[index].offsetTop) return false;
  isMoving = true;
  // Assumes all slides are same height
  var slideHeight = slides[0].offsetHeight;
  for (var i=0;i<slides.length;i++){
    var slidey = slides[i].offsetTop;
    if(Math.abs(slidey - ypos) < slideHeight/2) {
      index = i;
      var speed = Math.abs((slidey - ypos) / slideHeight / 2);
      scroll(slides[index], speed);
    }
  };
};

function debounce(func, threshold, execAsap) {
  var timeout;
  return function debounced () {
    var obj = this, args = arguments;
    function delayed () {
      if (!execAsap)
        func.apply(obj, args);
      timeout = null; 
    };
    if (timeout)
      clearTimeout(timeout);
    else if (execAsap)
      func.apply(obj, args);
    timeout = setTimeout(delayed, threshold || 100); 
  };
};

window.onscroll = debounce(updateIndex, 300);
window.onresize = debounce(function(){
  if (isScrolling || isMoving) return false;
  isScrolling = true;
  bd.scrollTop = slides[index].offsetTop;
  isScrolling = false;
},50);

document.onkeydown=function(e) {
  if (e.which == 38 && !e.shiftKey || e.which == 75 || e.shiftKey && e.which == 32) {
    // up, k
    e.preventDefault();
    debounce(previous(),200);
  } else if (e.which == 40 || e.which == 32 || e.which == 74) {
    // down, space, j
    e.preventDefault();
    debounce(next(),200);
  } else if (e.shiftKey && e.which == 38) {
    // shift + up
    scroll(slides[0]);
  }
};

if (nextButton) nextButton.onclick = next;
if (previousButton) previousButton.onclick = previous;

// Move to slide if hash on page load
if (window.location.hash) {
  index = parseInt(window.location.hash.slice(1)) - 1;
  if (isNaN(index)) return false;
  bd.scrollTop = slides[index].offsetTop;
};

};
