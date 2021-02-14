// ***Bonus pointAdding***
// <!-- 1.Add a Spinner when user search for any thing.
// 2.When user search for unknown image or invalid input user will be see a message -->



const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const error = document.getElementById("error")
// selected image 
let sliders = [];

document.getElementById("search").addEventListener('keypress',function(event){
  if(event.key= "Enter"){
    // console.log(event)
    document.getElementById("search-btn").click()
  }
})
// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';
const getImages = (query) => {
  spinner()
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
      if(data.hits==0 | data.hits == ''){
        spinner()
        error.innerHTML = `
        <img class= img-fluid src="img/404.png" alt="">
        <h2 class ="text-center">Sorry!!Can't Find This Kind of Catagories Image</h2>
        `
        hideSlider()
        gallery.innerHTML = ""
      }
      else{
        showImages(data.hits)
        hideSlider()
        error.innerHTML = ""
      }
    })
    .catch(()=>{
      spinner()
      error.innerHTML =`
      <img  img-fluid src="img/404.png" alt="">
      <h2 class ="text-center">Sorry!!Can't Find This Kind of Catagories Image</h2>
      `
      hideSlider()
      gallery.innerHTML = " "
    })
}
// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
  spinner()
}
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle("added");
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else  {
    sliders.splice(item, 1);
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  if(duration<0){
    alert("Sorry!!Duration value can't negative");
    imagesArea.style.display = 'block';
  }
  else{
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
  const fontImage = document.getElementById("font-image");
  fontImage.style.display = "none"

})

sliderBtn.addEventListener('click', function () {
  createSlider()
})

const spinner = () =>{
  const togglerSpinners = document.getElementById("spinner")
  togglerSpinners.classList.toggle("d-none")
  // console.log(togglerSpinners)
}
const hideSlider =()=>{
  const hideSlider = document.getElementById("hide-slider")
  hideSlider.classList.toggle("d-none")
}