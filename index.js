// scoring logic
const submitBtn = document.querySelector(".btn");
const entriesSection = document.querySelector(".entries");
const statusBar = document.querySelector(".status");
const board = document.querySelector(".board");

const imgdir = "./images/";
src_images = [
  "1.jpg",
  "1.jpg",
  "2.jpg",
  "2.jpg",
  "3.jpg",
  "3.jpg",
  "4.jpg",
  "4.jpg",
  "5.jpg",
  "5.jpg",
  "6.jpg",
  "6.jpg",
  "7.jpg",
  "7.jpg",
  "8.jpg",
  "8.jpg",
];

let score = 0;
const updateScore = (score) => {
  const scoreElement = document.querySelector(".status .score");
  scoreElement.innerHTML = `Score: ${score}/40`;
};

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Shuffling Images
const shuffleImages = (imgList) => {
  let grid_images = [];
  for (let i = 0; i < 16; i++) {
    n = getRndInteger(0, imgList.length - 1);
    element = imgList[n];
    imgList.splice(n, 1);
    grid_images.push(element);
  }
  return grid_images;
};

const startGame = (level = "easy", reset = false) => {
  let grid_images = shuffleImages(src_images);

  // Checking score
  let activeItems = [];
  const hideItems = (matched) => {
    let img = imgdir + "dummy.png";
    if (matched) {
      img = imgdir + "done.png";
    }
    for (let i = 0; i < activeItems.length; i++) {
      const index = activeItems[i];
      const element = items[index];
      element.childNodes[1].src = img;
    }
    activeItems = [];
    if (score === 40) {
      setTimeout(() => {
        alert("Hurray! You Won the Game");
        location.reload();
      }, 500);
    }
  };
  const checkScore = () => {
    let [a, b] = activeItems;
    let matched = false;
    if (grid_images[a] === grid_images[b]) {
      if (a === b) {
        matched = false;
      } else {
        grid_images[a] = grid_images[b] = null;
        console.log(grid_images);
        matched = true;
        score += 5;
        updateScore(score);
      }
    }
    setTimeout(() => {
      hideItems(matched);
    }, 350);
  };

  // listening for click
  const items = document.querySelectorAll(".item");
  console.log(grid_images);
  items.forEach((item) => {
    item.addEventListener("click", () => {
      id = item.id.split("-")[1];
      i = Number(id) - 1;
      src_image = grid_images[i];
      console.log(src_image);
      if (src_image === null) {
        return;
      }
      item.childNodes[1].src = `${imgdir}/${src_image}`;
      activeItems.push(i);
      if (activeItems.length === 2) {
        checkScore(activeItems);
      }
    });
  });

  let time = 0;
  switch (level) {
    case "easy" || "":
      time = 60;
      break;
    case "medium":
      time = 45;
      break;
    case "hard":
      time = 30;
      break;
    default:
      time = 60;
  }
  const updaterInterval = setInterval(() => {
    const timeElement = document.querySelector(".status .timer");
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const value = `Time left<b> ${minutes}:${seconds}s</b>`;
    timeElement.innerHTML = value;
    if (time === -1) {
      timeElement.innerHTML = `<p class="text-red-500">Time out</p>`;
      if (score < 40) {
        alert("You lost! Please try again");
        location.reload();
      }
    }
    time = time - 1;
  }, 1000);
};

// take input
submitBtn.addEventListener("click", (e) => {
  let level = document.getElementById("level");
  e.preventDefault();
  statusBar.classList.remove("hidden");
  entriesSection.classList.add("hidden");
  board.classList.remove("hidden");
  startGame(level.value);
});
