
class TicketsUI{
    constructor(){
        this.container = document.querySelector('.tickets-sections .row')
    }
    renderTickets(tickets){
        this.clearContainer();
        if(!tickets.length){
            this.showEmptyMessage()
        }else{
            tickets.forEach(e => {
                this.container.innerHTML += TicketsUI.ticketTemplate(e);
            })
        }        
    }
    clearContainer(){
        this.container.innerHTML = '';
    }
    showEmptyMessage(){
        this.container.innerHTML = '<div class="tickets-empty-res-msg">По вашему запиту квитків не знайдено.</div>';
    }
    static ticketTemplate({airline_logo, airline_name, destination_name, origin_name, departure_at, price, flight_number, current_id}){
        return `<div class="col m12 l6">
        <div class="card ticket-card" id='${current_id}'>
          <div class="ticket-airline d-flex align-items-center">
            <img src="${airline_logo}" class="ticket-airline-img">
            <span class="ticket-airline-name">${airline_name}</span>
          </div>
          <div class="ticket-destination d-flex align-items-center">
            <div class="d-flex align-items-center mr-auto">
              <span class="ticket-city">${origin_name} </span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="ticket-city">${destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${departure_at}</span>
            <span class="ticket-price ml-auto">ціна: ${price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-flight-number">Номер рейса: ${flight_number}</span>
            <span class='add-to-fav'>Додати до обраних</span>
          </div>
        </div>
      </div>`
    }
}

const ticketsUI = new TicketsUI();

export default ticketsUI;