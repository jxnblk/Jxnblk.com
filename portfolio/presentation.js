// Presentation
// Scrollable presentation websites

// To do:
// x - current class
// - menu
// - data-img & data-title for menu
// - setindex when scrolling - almost working
// - reset index on window resize

window.onload = function() {

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

function scroll(el) {
  isScrolling = true;
  removeCurrent();
  el.className = el.className + ' current';
  var to = el.offsetTop,
      from = bd.scrollTop,
      y = to - from;
  if(y == 0) {
    isScrolling = false;
    isMoving = false;
    return false;
  };
  bd.style.marginTop = -y + "px";
  bd.style.transition = 'margin-top .5s ease-in-out';
  bd.addEventListener('transitionend', function(){
    bd.style.marginTop = 0;
    bd.scrollTop = to;
    bd.style.transition = 'none';
    isScrolling = false;
    isMoving = false;
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

function updateIndex(){
  if (isScrolling || isMoving) return false;
  isMoving = true;
  var ypos = bd.scrollTop;
  // Assumes all slides are same height
  var slideHeight = slides[0].offsetHeight;
  for (var i=0;i<slides.length;i++){
    var slidey = slides[i].offsetTop;
    if(Math.abs(slidey - ypos) < slideHeight/2) {
      index = i;
      scroll(slides[index]);
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

window.onscroll = debounce(updateIndex, 200);

document.onkeydown=function(e) {
  if (e.which == 40 || e.which == 32 || e.which == 74) {
    // down, space, j
    e.preventDefault();
    debounce(next(),500);
  } else if (e.shiftKey && e.which == 38) {
    // shift + up
    scroll(slides[0]);
  } else if (e.which == 38 && !e.shiftKey || e.which == 75) {
    // up, k
    e.preventDefault();
    debounce(previous(),500);
  } else if (e.which == 16){
  }
};

if (nextButton) nextButton.onclick = next;
if (previousButton) previousButton.onclick = previous;

};
