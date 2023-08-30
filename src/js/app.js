// TODO: write code here

import CardFormChecker from "./widget/cardchecker";
import Validator from "./widget/validator";

const cont = document.querySelector(".container");

const form = new CardFormChecker(cont);
form.bindToDom();
const val = new Validator(".cardCheckerWidget");
val.init();
