import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('../../../public/location.png'),
    iconRetinaUrl: require('../../../public/location.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconPerson };