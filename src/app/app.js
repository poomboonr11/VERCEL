import { Icon } from 'leaflet';
import '../../styles/globals.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer,TileLayer,Marker } from 'react-leaflet';
export default function PEA(){
    const markers = [
        {
            geocode:[13.850933864209315, 100.55814699540437]
        },
        {
            geocode:[13.651376089220015, 100.49664127996877]
        }
    ];

    const customIcon =new Icon({
        iconUrl:"https://cdn-icons-png.flaticon.com/512/61/61942.png",
        iconSize:[38,38]
    })

    return(
        <MapContainer center={[13.668217,100.614021]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map(marker => (
                    <Marker position={marker.geocode} icon={customIcon}>
                    </Marker>
            ))
            }
        </MapContainer>
    );
}