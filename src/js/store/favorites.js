import shortid from 'shortid'; // пакет для генерації ID
class Favorites{
    constructor(){
        this.items = {};
    }
    addNewItem(ticket){
        this.items[shortid.generate()] = ticket;
    }
    get favoritesItems(){
        return this.items;
    }
}

const favorites = new Favorites();

export default favorites;