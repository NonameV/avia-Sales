import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

//ініціалізація селекта
const select = document.querySelector('select');
M.FormSelect.init(select);

//експортуємо функцію яка отримувмує вибраний елемент в селекти
export function getInstanseSelect(el){
    return M.FormSelect.getInstanse(el);
}

//ініціалізація полей з автопідбором
const autocompletes = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocompletes, {
    data: {
      "Apple": null,
      "Microsoft": null,
      "Google": 'https://placehold.it/250x250'
    },
  });
//експортуємо функцію яка отримувмує введенні данні з полей із автопідбором
export function getAutocompleteInstanse(el){
    return M.Autocomplete.init(el);
}

//ініціалізація календарів
const datePickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datePickers,{
    showClearBtn: true,
    format: 'yyyy-mm-dd'
});
//експортуємо функцію яка отримувмує введенні дати з календарів
export function getDatepickerInstanse(el){
    return M.Datepicker.init(el, {
        showClearBtn: true,
        format: 'yyyy-mm-dd'
    });
}