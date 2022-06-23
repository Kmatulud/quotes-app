import './style.css';
import './quote.css';
import persist from '@alpinejs/persist'
Alpine.plugin(persist)
import Alpine from  'alpinejs';
import LoveCounter from './love-counter';
import Quotes from './quotes';
// import Server from '../server/routes/auth'

window.Alpine = Alpine;

Alpine.data("quoteApp", Quotes);

// Alpine.data("myApi", Server);


Alpine.data("loveCounter", LoveCounter);


Alpine.start();

document.querySelector("#app").innerHTML = "I 💚 Alpine JS!";
