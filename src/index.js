import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(){
    const name = input.value.trim()
    
    if (name === '') {
        return (countryList.innerHTML = ''), (countryInfo.innerHTML = '')
      }
    fetchCountries(name)
    .then(countries => {
        countryList.innerHTML = ''
        countryInfo.innerHTML = ''
        if (countries.length === 1) {
            countryList.insertAdjacentHTML('beforeend', renderCountryList(countries)),
            countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
        } else if (countries.length >= 10){
            onTooManyResults()
        } else{
            countryList.insertAdjacentHTML('beforeend', renderCountryList(countries))
        }
    })
    .catch(noMatches);
}

function noMatches(){
    countryList.innerHTML = ''
    countryInfo.innerHTML = ''
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

function onTooManyResults(){
    countryList.innerHTML = ''
    countryInfo.innerHTML = ''
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}

  
  function renderCountryList(countries) {
    const markup = countries
    .map(( {name, flags} ) => {
        return `<li>
            <img src="${flags.svg}" alt="${name.official} national flag" width = 50px height = 50px>
            <h2><b>${name}</b></h2>
          </li>`;
      })
      .join('');
      return markup;
  }

  function renderCountryInfo(countries) {
    const markup = countries
    .map(( {capital, languages, population} ) => {
        return `
            <li><p><b>Capital: </b>${capital}</p></li>
            <li><p><b>Population: </b>${population}</p></li>
            <li><p><b>Languages: </b>${languages.map(language => language.name).join(', ')}</p></li>
          `;
      })
      .join('');
      return markup;
  }