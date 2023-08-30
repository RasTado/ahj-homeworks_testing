import "./cardchecker.css";

export default class CardFormChecker {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `<div class="cardCheckerWidget">
    <div class="cardCheckerWidgetPictures">
      <td>
        <span class="card cardVisa" title="Visa"></span>
      </td>
      <td>
        <span class="card cardMaster" title="Mastercard"></span>
      </td>
      <td>
        <span class="card cardAE" title="American Express"></span>
      </td>
      <td>
        <span class="card cardD" title="Discover"></span>
      </td>
      <td>
        <span class="card cardJSB" title="JCB"></span>
      </td>
      <td>
        <span class="card cardDC" title="Diners Club"></span>
      </td>
    </div>
    <form id="form" class="cardCheckerWidgetform" novalidate="novalidate">
      <div class="form-group">
        <input class="form-control-input" id="card_number" name="card_number" type="text" placeholder="Credit card number" data-original-title="" title="">
        <a id="submitform" class="btn btn-success">Click to Validate</a>
        <span class='cardCheckerWidgetValidAnsw AnswTrue' >Valid !</span>
        <span class='cardCheckerWidgetValidAnsw AnswFalse' >Invalid !</span>
      </div>
      
    </form>
  </div>`;
  }

  bindToDom() {
    this.parentEl.innerHTML = CardFormChecker.markup;
  }
}
