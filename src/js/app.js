
import './plugins';
import '../css/style.css';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets'
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => { //обробчик події загрузки сторінки
    const form = formUI.form;
    initApp();
    
    //Події
    form.addEventListener('submit', (e) => { //обробчик події відправки форми
        e.preventDefault();
        onFormSubmit();
    })
    

    async function initApp(){
        await locations.init();
        formUI.setAutocompleteData(locations.shortCities);
       
    }
    async function onFormSubmit(){
        //функція яка збтраї введенні в форму данні на відправляє на сервер
        const origin = locations.getCityCodeByKey(formUI.originValue); //отримуємо код міста для зручної відправки на сервер
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departValue.slice(0, -3);
        const return_date = formUI.returnValue.slice(0, -3) ? formUI.returnValue.slice(0, -3) : '';
        const currency = currencyUI.CurrencyValue;
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency
        });
        ticketsUI.renderTickets(locations.lastSearch)
    }
})