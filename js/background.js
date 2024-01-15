const images = [
    "img1.png",
    "img2.png",
]

const chosenImage = images[Math.floor(Math.random() * images.length)];
const background = document.querySelector(".background-container");
const backgroundImg = document.createElement("img");
backgroundImg.src = `img/${chosenImage}`;
background.appendChild(backgroundImg);