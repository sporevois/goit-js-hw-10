import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetch-countries';
const DEBOUNCE_DELAY = 300;
const refs = {
    inputRef: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

refs.inputRef.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(event) {
    const name = this.value.trim();
    if (!name) {
        clearInfo();
        clearList();
       return 
    }
        
    fetchCountries(name)
        .then(data => {
            if (data.length > 1 && data.length <= 10) {
                renderList(data);
                return
            }
            else
                if (data.length > 10) {
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                    clearInfo();
                    clearList();
                    return
                }
            renderInfo(data);
            return 
            }      
        )
        .catch( () => {
            if (name !== "")
            Notiflix.Notify.failure("Oops, there is no country with that name")
        })
}


function renderList(items) {
    clearInfo();
    const markup = items
      .map(({ name, flags }) => {
          return `<li class = 'country' style = "display:flex" >
            <img src = ${flags.svg} alt = 'Flag of ${name.official}' width = '60px' style = "display:block; margin-bottom: 10px; border: 1px solid black">
            <p style = "margin-left: 10px;">${name.official}</p>
            </li>`
      })
      .join("");
    refs.list.innerHTML = markup;
}

function renderInfo(items) {
    clearList();
    const markup = items
      .map(({ name, capital, population, flags, languages }) => {
          return `<div class = 'country'>
            <img src = '${flags.svg}' alt = 'Flag of ${name.official}' width = '60px' style = "display:inline-block; border: 1px solid black"/>
            <h2 style = "margin-left:10px; display:inline-block">${name.official}</h3>
            <div>
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p>Languages: ${Object.values(languages)}</p>
            </div>
          </div>`
      })
      .join("");
    refs.info.innerHTML = markup;   
}

function clearInfo() {
    refs.info.innerHTML = "";
}

function clearList() {
    refs.list.innerHTML = "";
}


