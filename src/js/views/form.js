import {getDatepickerInstanse, getAutocompleteInstanse} from '../plugins/materialize'
class FormUI{
    constructor(DatepickerInstanse, AutocompleteInstanse){
        //отримання та ініціалізація елементів форми
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');
        this.originAutocomplete = AutocompleteInstanse(this.origin);
        this.destinationAutocomplete = AutocompleteInstanse(this.destination);
        this.departDatepicker = DatepickerInstanse(this.depart);
        this.returnDatepicker = DatepickerInstanse(this.return);
    }
    get form(){
        //гетер для форми
        return this._form;
    }
    get originValue(){
        return this.origin.value;
    }
    get destinationValue(){
        return this.destination.value;
    }
    get departValue(){
        return this.departDatepicker.toString();
    }
    get returnValue(){
        return this.returnDatepicker.toString();
    }
    setAutocompleteData(data){
        // змінна даних в полі автозаповнення 
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getDatepickerInstanse, getAutocompleteInstanse);

export default formUI;