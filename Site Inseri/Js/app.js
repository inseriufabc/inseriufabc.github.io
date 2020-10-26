const controls = document.querySelector('.controls');
const container = document.querySelector('.thumbnail-container');
const allBox = container.children;
const containerWidth = container.offsetWidth;
const margin = 30;
var items = 0;
var totalItems = 0;
var jumpSlideWidth = 0;

//item setup per slide

responsive = [
  { breakPoint: { width: 0, item: 1 } }, //if width greater than 0 (1 item show)
  { breakPoint: { width: 600, item: 2 } }, //if width greater than 600 (2 item show)
  { breakPoint: { width: 1000, item: 2 } }, //if width greater than 1000 (4 item show)
];

function load() {
  for (let i = 0; i < responsive.length; i++) {
    if (window.innerWidth > responsive[i].breakPoint.width) {
      items = responsive[i].breakPoint.item;
    }
  }
  start();
}

function start() {
  var totalItemsWidth = 0;
  for (let i = 0; i < allBox.length; i++) {
    //width and margin set up of items
    allBox[i].style.width = containerWidth / items - margin + 'px';
    allBox[i].style.margin = margin / 2 + 'px';
    totalItemsWidth += containerWidth / items;
    totalItems++;
  }
  //thumbnail-container width set up
  container.style.width = totalItemsWidth + 'px';

  //sliders controls set up
  const allSlides = Math.ceil(totalItems / items);
  const ul = document.createElement('ul');
  for (let i = 1; i <= allSlides; i++) {
    const li = document.createElement('li');
    li.id = i;
    li.innerHTML = i;
    li.setAttribute('onclick', 'controlSlide(this)');
    ul.appendChild(li);
    if (i == 1) {
      li.className = 'active';
    }
  }
  controls.appendChild(ul);
}
//when click numbers slide to next slide
function controlSlide(ele) {
  //select controls ul element
  const ul = controls.children;
  //select ul children "li"
  const li = ul[0].children;
  //find who is now active
  var active;
  for (let i = 0; i < li.length; i++) {
    if (li[i].className == 'active') {
      active = i;
      //remove active class from all "li" elements
      li[i].className = '';
    }
  }
  //add active class
  ele.className = 'active';

  var numb = ele.id - 1 - active;
  jumpSlideWidth = jumpSlideWidth + containerWidth * numb;
  container.style.marginLeft = -jumpSlideWidth + 'px';
}

window.onload = load();
