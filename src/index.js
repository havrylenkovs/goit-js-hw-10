import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { refs } from './js/refs';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
refs.input.addEventListener('input', onInput)

function onInput(evt) {
    // console.log(evt);
    fetchCountries().then(data => {
        console.log(data);
        });

}




