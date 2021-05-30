import config from '../config/apiConfig'
import axios from 'axios' // плагин полегшує реалізацію запитів на сервер

//класс з набором методыв для взаємодії с сервером

// Ендпоінти сервера
// /countries -- массив країн
// /cities -- массив міст
// /prices/cheap -- массив с доступними авіарейсами
class Api{
    constructor(config){
        this.url = config.url;
    }
    async countries() {
        // ця асинхронна функція виконує запит на сервер для отримання міст
        try {
            const response = await axios.get(`${this.url}/countries`);
            return response.data;
        } catch(err){
            console.log(err);
            return Promise.reject(err);
        }
    }
    async cities(){
         // ця асинхронна функція виконує запит на сервер для отримання країн
         try {
            const response = await axios.get(`${this.url}/cities`);
            return response.data;
        } catch(err){
            console.log(err);
            return Promise.reject(err);
        }
    }
    async prices(params){
        // ця асинхронна функція виконує запит на сервер для отримання білетів
        try {
            const response = await axios.get(`${this.url}/prices/cheap`, {
                params
            });
            return response;
        } catch(err){
            console.log(err);
            return Promise.reject(err);
        }
    }
}

const api = new Api(config);

export default api