import './style.css';
import './quote.css';
import persist from '@alpinejs/persist'
Alpine.plugin(persist)
import Alpine from  'alpinejs';
import LoveCounter from './love-counter';
import Quotes from './quotes';
// import Users from './api'

window.Alpine = Alpine;

Alpine.data("quoteApp", Quotes);

Alpine.data("loveCounter", LoveCounter);
// Alpine.data("users", Users);


Alpine.start();

document.querySelector("#app").innerHTML = "I 💚 Alpine JS!";
