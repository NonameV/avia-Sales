
import './plugins';
import '../css/style.css';
import locations from './store/locations';

locations.init().then(res => {
    console.log(locations.countries)
    console.log(locations.cities)
    console.log(locations.getCitiesByCountryCode('PE'))
    console.log(locations.getCounryNameByCode('CX'))
})