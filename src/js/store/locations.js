import api from '../services/apiService'

class Locations {
    constructor(api){
        this.api = api;
        this.countries = null;
        this.cities = null;
    }
    async init(){
        //метод одразу запрашуэ міста та країни у apiService
        const res = await Promise.all([
            this.api.countries(),
            this.api.cities()
        ])
        const [countries, cities] = res; //деструктуруємо повернений массив на два массива країн та міст
        this.countries = this.transformCountries(countries);
        this.cities = this.transfromCities(cities);
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
            const key = `${city.name}, ${countryName}`;
            acc[key] = city;
            return acc;
        }, {})
    }
    getCountryNameByCode(code){
        // функція що повертає назву країни по коду країни
        return this.countries[code].name || this.countries[code].name_translations.en;
    }
    createShorCitiesList(cities){
        //функція яка створює список для автозаповнення 
        return Object.entries(cities).reduce((acc, [key]) => {
            acc[key] = null;
            return acc
        }, {})
    }
    getCityCodeByKey(key){
        //функція отримує код міста по ключу {'Наза міста, Назва країни'}
        return this.cities[key].code;
    }
    async fetchTickets(params){
        try{
            const response = await this.api.prices(params);
            console.log(response);
        } catch(err){
            console.log(err);
            return Promise.reject(err);
        }
        
    }
    
}


const locations = new Locations(api);

export default locations;