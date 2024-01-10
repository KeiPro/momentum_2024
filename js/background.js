const images = [
    "img1.png",
    "img2.png",
    "img3.png",
]

const chosenImage = images[Math.floor(Math.random() * images.length)];
document.body.setAttribute("background", `img/${chosenImage}`);