
import './plugins';
import '../css/style.css';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets'
import currencyUI from './views/currency';
import favorites from './store/favorites'
import favoritesUI from './views/favorites'

document.addEventListener('DOMContentLoaded', () => { //обробчик події загрузки сторінки
    const form = formUI.form;
    initApp();
    
    //Події
    document.addEventListener('click', ({target})=>{
        if(target.innerHTML === 'Обрані' || target.innerText === 'ВИДАЛИТИ'){
            document.querySelector('#dropdown1').style.display = 'block';
        }else{
            document.querySelector('#dropdown1').style.display = 'none';
        }
    })
    document.addEventListener('click', (e) => { //обробчик події нажатої кнопки додавання білету з вибраних
        if(e.target.innerHTML == 'Додати до обраних'){
            const ticketFavObj = {
                logo: e.target.parentElement.parentElement.querySelector('.ticket-airline-img').currentSrc,
                from: e.target.parentElement.parentElement.querySelectorAll('.ticket-city')[0].innerHTML,
                to:e.target.parentElement.parentElement.querySelectorAll('.ticket-city')[1].innerHTML,
                date: e.target.parentElement.parentElement.querySelector('.ticket-time-departure').innerHTML,
                price: e.target.parentElement.parentElement.querySelector('.ticket-price').innerHTML,
                number: e.target.parentElement.parentElement.querySelector('.ticket-flight-number').innerHTML
            }
            console.log(e.target.parentElement.parentElement.querySelectorAll('.ticket-price'));
            favorites.addNewItem(ticketFavObj);
            favoritesUI.renderFavList(favorites.items);
            
        }
    })
    document.addEventListener('click', (e) => { //обробчик події нажатої кнопки видалення білету з вибраних
        if(e.target.innerText == 'ВИДАЛИТИ'){
            e.target.parentElement.parentElement.style.display = 'none';
        }
    }) 
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