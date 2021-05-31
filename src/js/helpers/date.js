import {format} from 'date-fns'; // імпортуємо функцію з бібліотекаи fns-date для змінненя фрмату відображення дати 

/**
 * 
 * @param {*} str 
 * @param {*} type - 'yyyy.mm.dd'
 */


export function formatDate(str, type){
    const date = new Date(str);
    return format(date, type);
}