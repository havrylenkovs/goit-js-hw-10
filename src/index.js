import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { refs } from './js/refs';
import {
  clearCountryInfo,
  clearCountryList,
  markupCountryList,
  markupCountryInfo,
} from './js/render-functions';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const inputValue = evt.target.value.trim();
  if (!inputValue) {
    clearCountryInfo();
    clearCountryList();
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        clearCountryInfo();
        clearCountryList();

        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countries.length >= 2 && countries.length <= 10) {
        clearCountryInfo();
        markupCountryList(countries);

        Notify.success(
          'We made a list of countries which are close to your request.'
        );
      }
      if (countries.length === 1) {
        clearCountryList();
        markupCountryInfo(countries);

        Notify.success('This is your country!');
      }

      console.log(countries);
    })
    .catch(err => {
      clearCountryInfo();
      clearCountryList();

      Notify.failure('Oops, there is no country with that name');
      console.error(err);
    });
}