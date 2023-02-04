document.addEventListener("DOMContentLoaded", () => {
  // card options
  const cardsArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

  // This will sort an array randomly
  cardsArray.sort(() => 0.5 - Math.random());
  console.log(cardsArray);

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const mistakesDisplay = document.querySelector("#mistakes");
  const attemptsDisplay = document.querySelector("#attempts");
  let cardsChosen = [];
  let cardsChosenIds = [];
  let cardsWon = [];
  let cardsLost = 0;
  let attemptsCount = 0;

  // const startingTime = document.querySelector("#starting-time");
  // const today = new Date();
  // startingTime.textContent = today.toLocaleTimeString();

  const elapsedTime = document.querySelector("#elapsed-time");
  let elapsedTimeCount = 0;
  let timerId = 0; 

  const start = document.querySelector("#start-btn");
  start.addEventListener("click", timerCounter);

  function timerCounter() {
    timerId = setInterval(() => { 
      elapsedTimeCount += 1;
      elapsedTime.textContent = elapsedTimeCount;
    }, 1000);
  }

  function createBoard() {
    for (let i = 0; i < cardsArray.length; i++) {
      const card = document.createElement("img");
      card.setAttribute("src", "images/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  function flipCard() {
    let cardId = this.getAttribute("data-id");
    // console.log(cardId);
    // console.log(cards[cardId]);
    cardsChosen.push(cardsArray[cardId].name);
    cardsChosenIds.push(cardId);
    console.log(cardsChosen);
    this.setAttribute("src", cardsArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    // console.log(cards);

    if (optionOneId === optionTwoId) {
      alert("You have clicked the same image!");
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      cardsLost += 1;
      attemptsCount += 1;
    } else if (cardsChosen[0] === cardsChosen[1]) {
      // alert("You have found a match!");
      cards[optionOneId].setAttribute("src", "images/white.png");
      cards[optionTwoId].setAttribute("src", "images/white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
      attemptsCount += 1;
    } else {
      // alert("Sorry, try again!");
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      cardsLost += 1;
      attemptsCount += 1;
    }

    cardsChosen = [];
    cardsChosenIds = [];
    resultDisplay.textContent = cardsWon.length;
    mistakesDisplay.textContent = cardsLost;
    attemptsDisplay.textContent = attemptsCount;
    if (cardsWon.length === (cardsArray.length/2)) {
      resultDisplay.textContent = "Congratulations! You have won!"
      clearInterval(timerId);
    }

    console.log(cardsChosen);
    console.log(cardsWon);
  }

  createBoard();

})