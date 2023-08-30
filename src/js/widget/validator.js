export default class Validator {
  #cardsList = {
    cardVisa: ["4"],
    cardMaster: ["5"],
    cardAE: ["34"],
    cardD: ["60"],
    cardJSB: ["35"],
    cardDC: ["30"],
  };

  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    this.element = element;
    this.input = this.element.querySelector(".form-control-input");
    this.btn = this.element.querySelector(".btn");
    this.allCards = document.querySelectorAll(".card");
  }

  init() {
    this.btn.addEventListener("click", this.onBtnClick.bind(this));
    this.element.addEventListener("submit", this.onBtnClick.bind(this));
    this.input.addEventListener("input", this.onInput.bind(this));
  }

  onBtnClick(e) {
    e.preventDefault();
    const valid = this.element.querySelector(".AnswTrue");
    const invalid = this.element.querySelector(".AnswFalse");

    if (this.isValid(this.input.value.trim())) {
      valid.style.display = "block";
      invalid.style.display = "none";
    } else {
      invalid.style.display = "block";
      valid.style.display = "none";
    }
  }

  onInput(e) {
    const cType = this.cardType(this.input.value.trim());
    setTimeout(() => {
      for (const card of this.allCards) {
        console.log(card);
        if (card.classList.contains(cType)) {
          card.style.opacity = "1";
        } else {
          card.style.opacity = "0.3";
        }
      }
    }, 0);
  }

  reverseString(str) {
    const splitString = str.split("");
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join("");
    return joinArray;
  }

  isValid(cardNumber) {
    const length = cardNumber.length;
    const cardNumberPart = cardNumber.substr(0, length - 1);
    const checkNumber = Number(cardNumber[length - 1]);
    const reversedCardNumberPart = this.reverseString(cardNumberPart);

    let sum = 0;
    for (let i = 0; i < reversedCardNumberPart.length; i++) {
      if (i % 2 !== 0) {
        sum += Number(reversedCardNumberPart[i]);
      } else if (Number(reversedCardNumberPart[i]) > 4) {
        sum += 2 * Number(reversedCardNumberPart[i]) - 9;
      } else {
        sum += 2 * Number(reversedCardNumberPart[i]);
      }
    }
    const checkDigit = 10 - (sum % 10);
    return checkDigit === checkNumber;
  }

  cardType(cardNumber) {
    for (const cardType in this.#cardsList) {
      for (const number of this.#cardsList[cardType]) {
        if (cardNumber.startsWith(number)) {
          return cardType;
        }
      }
    }
  }
}
