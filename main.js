import './style.css';
import './quote.css';
import Alpine from  'alpinejs';
import LoveCounter from './love-counter';
import Quotes from './quotes';

window.Alpine = Alpine;

Alpine.data("quoteApp", Quotes);

Alpine.data("loveCounter", LoveCounter);


Alpine.start();

document.querySelector("#app").innerHTML = "I 💚 Alpine JS!";
