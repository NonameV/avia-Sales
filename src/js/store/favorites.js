import shortid from 'shortid'; // пакет для генерації ID
class Favorites{
    constructor(){
        this.items = [];
    }
    addNewItem(ticket){
        //додає новий білет до обраних
        this.items.push({'id':shortid.generate(), ...ticket});
        console.log(this.items)
    }
    removeItem(id){
        //видаляє новий білет до обраних
        this.items = this.items.filter(e => e.id != id);
        console.log(this.items)
    }
    get favoritesItems(){
        return this.items;
    }
}

const favorites = new Favorites();

export default favorites;