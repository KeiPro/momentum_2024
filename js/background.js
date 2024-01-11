const images = [
    "img1.png",
    "img2.png",
]

const chosenImage = images[Math.floor(Math.random() * images.length)];
//document.body.setAttribute("background", `img/${chosenImage}`);
const background = document.querySelector(".background-container");
const backgroundImg = document.createElement("img");
backgroundImg.src = `img/${chosenImage}`;
background.appendChild(backgroundImg);