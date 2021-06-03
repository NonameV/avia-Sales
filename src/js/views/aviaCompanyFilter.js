import shortid from 'shortid';
class AviaCompanyFilterUI{
    constructor(){
       this.container = document.querySelector('#filter-aviacompany-container');
    }
    renderAviaCompanyCheckBoxes(tickets){
        this.clearAviaCompanyCheckBoxes();
        tickets.forEach(e => {
            this.container.innerHTML += AviaCompanyFilterUI.aviaCompanyCheckBoxTemplate(e)
        })
    }
    clearAviaCompanyCheckBoxes(){
        this.container.innerHTML = '';
    }
    static aviaCompanyCheckBoxTemplate(ticketName){
        const id = shortid.generate(); // айді для лейблов
        return `
        <div class='checkbox-wrapper'>
        <input class='avia-checkbox' type="radio" id="${id}" name="name" data-avia-name = "${ticketName}">
        <label for="${id}">${ticketName}</label>
      </div>
        `
    }
}

const aviaCompanyFilterUI = new AviaCompanyFilterUI();

export default aviaCompanyFilterUI;