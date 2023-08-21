import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';




const Map: React.FC = () => {
  const fetchCountryData = () => axios.get('https://disease.sh/v3/covid-19/countries');
  const { data: countryData } = useQuery('countryData', fetchCountryData);

  const countries = countryData?.data as Array<any>; // Explicitly type 'countries'

  const locationDotIcon = L.icon({
    iconUrl: require("../../assets/location.png"),
    iconSize: [30, 30], // Adjust the size of the icon as needed
  });

  return (
    <div className="w-full h-80 md:h-96"> {/* Responsive container */}
      <MapContainer center={[0, 0]} zoom={2} style={{ width: "100%", height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countries?.map((country) => (
          <Marker
            key={country.countryInfo._id}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={locationDotIcon} // Use the custom icon for this marker
          >
            <Popup>
              <div>
                <h2 className="font-bold text-lg">{country.country}</h2>
                <p>Active: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
