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
        this.countries = countries;
        this.cities = cities;
        return res;
    }
    getCitiesByCountryCode(code){
        // отримання мыст по коду краъни
        return this.cities.filter(city => city.country_code === code)
    }
    
}


const locations = new Locations(api);

export default locations;