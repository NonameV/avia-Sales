


class FavoritesUI{
    constructor(){
        this.container = document.querySelector('#dropdown1');
    }
    
    renderFavList(items){
        this.container.innerHTML = '';
        items.forEach(e => {
             this.container.innerHTML += FavoritesUI.favItemTemplate(e);
         })
    }
    static favItemTemplate(ticket){
      console.log(ticket.id)
        return `<div class="favorite-item  d-flex align-items-start">
        <img
          src="${ticket.logo}"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${ticket.from} </span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${ticket.to}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.date}</span>
            <span class="ticket-price ml-auto">${ticket.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-flight-number">${ticket.number}</span>
          </div>
          <a
            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" id="${ticket.id}"
            >Видалити</a
          >
        </div>
      </div>`
    }

}

const favoritesUI = new FavoritesUI();

export default favoritesUI;