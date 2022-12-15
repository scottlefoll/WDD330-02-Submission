// This is your site JavaScript code - you can add interactivity and carry out processing

// let year_text = new Date().getFullYear();
// document.getElementById("c_year").innerHTML = year_text;

// let text = document.lastModified;
// document.getElementById("mod-date").innerHTML = text;


// Current Date at bottom of page
// let dt = new Date();
// const currentDate = new Date();
// const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'};
// document.getElementById('date-time').innerHTML=currentDate.toLocaleDateString('en-uk', options);


// Get Date
const d = new Date();
// Get Day of week as int; Friday = 5
let day = d.getDay()
const para = document.createElement("p");
para.innerHTML = "Saturday: Preston Pancakes in the Park!<br> 9:00 am Saturday, 6/25, in Preston Community Park.";

// Append to the top banner element:
document.getElementById("topDIV").appendChild(para);

//If day = 5 show ad, otherwise hide it.
if (day === 6 || day === 5) {
  document.getElementById("topDIV").style.display = "block";
  } else {
    document.getElementById("topDIV").style.display = "none";
  }
document.getElementById("topDIV").style.backgroundColor="yellow";
document.getElementById("topDIV").style.fontWeight="bold";
document.getElementById("topDIV").style.fontSize=".95rem";

// lazy loading - load after rendering HTML
let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};


// lazy loading - wait until image is actually called l_replace = [s.replace('XXX', 'ZZZ') for s in l]

if('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if(item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}


// Turn the hamburger menu display on or off in phone view

// function myFunction() {
//   var x = document.getElementById("myLinks");
//   if (x.style.display === "block") {
//     x.style.display = "none";
//   } else {
//     x.style.display = "block";
//   }
// }

