import api from '../services/apiService';
import {formatDate} from '../helpers/date';


class Locations {
    constructor(api, helpers){
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.airlines = null;
        this.lastSearch = null;
        this.formatDate = helpers.formatDate;
    }
    async init(){
        //метод одразу запрашуэ міста та країни у apiService
        const res = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines()
        ])
        const [countries, cities, airlines] = res; //деструктуруємо повернений массив на два массива країн та міст
        this.countries = this.transformCountries(countries);
        this.cities = this.transfromCities(cities);
        this.airlines = this.transformAirlines(airlines);
        this.shortCities = this.createShorCitiesList(this.cities);
        return res;
    }
    getCitiesByCountryCode(code){
        // отримання міст по коду країни
        return this.cities.filter(city => city.country_code === code)
    }
    transformCountries(countries){
        //функція яка трансформовує повернений сервером массив даних в зручний вигляд для відправки кода країни на сервер та отримання об'єкта цієї країни як відповідь від сервера
        // {'Код країни': {... об'єкт країни}}
        return countries.reduce((acc, country)=>{
            acc[country.code] = country;
            return acc;
        }, {})
    }
    transfromCities(cities){
        // функція яка трансформує массив с містами повернений сервером у зручний вигляд для автокомпліта
        // так буде легше отмитати код країни з автокомпліта для відправки на сервер
        // {'Назва місто, Назвакраїни': {... об'єкт міста}}
        return cities.reduce((acc,city) => {
            const countryName = this.getCountryNameByCode(city.country_code);
            city.name ? city.name : city.name.translation.en; 
            const fullName = `${city.name}, ${countryName}`;
            acc[city.code] = {
                ...city, 
                countryName,
                fullName
            };
            return acc;
        }, {})
    }
    transformAirlines(airlines){
        //функція що трансформує масив об'єктів з авілініями в об'єкт з об'єктами
        return airlines.reduce((acc, airline) => {
            airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`; // http://pics.avs.io -- сервіс по пошуку зображень логотипів авіакомпаній 
            airline.name = airline.name ? airline.name : airline.name_translations.en;
            acc[airline.code] = airline;
            return acc;
        }, {})
    }
    getCountryNameByCode(code){
        // функція що повертає назву країни по коду країни
        return this.countries[code].name || this.countries[code].name_translations.en;
    }
    createShorCitiesList(cities){
        //функція яка створює список для автозаповнення 
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.fullName] = null;
            return acc
        }, {})
    }
    getCityCodeByKey(key){
        //функція отримує код міста по ключу
            const city = Object.values(this.cities).find((item) => item.fullName === key)
            return city.code;
    }
    getCityNameByCode(code){
        //отримання назви міста по коду
        return this.cities[code].name;
        

    }
    getAirlineNameByCode(code){
        //функція отримує назву авіакомпанії по коду авіакомпанії 
        return this.airlines[code].name ? this.airlines[code].name : '';
    }
    getAirlineLogoByCode(code){
        //функція отримує логотип авіакомпанії по коду авіакомпанії 
        return this.airlines[code].name ? this.airlines[code].logo : '';
    }
    async fetchTickets(params){
        const response = await this.api.prices(params);
        this.lastSearch = this.transformTickets(response.data);   
    }
    transformTickets(tickets){
        // функція преобразовує данні білетів до зручного предоставлення їх користувачу 
        return Object.values(tickets).map(ticket => {
            let obj = {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
                return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
            }
            return obj;
        })
    }
}


const locations = new Locations(api, {formatDate});

export default locations;