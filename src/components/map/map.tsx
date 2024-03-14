import {useRef, useEffect} from 'react';
import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferType } from '../../types/offer';
// import { CityDataType } from '../../mock/city';
import useMap from '../../hooks/useMap/use-map';
import { CityType } from '../../types/offer';

const DEFAULT_MARKER_URL = 'img/pin.svg';
const ACTIVE_MARKER_URL = 'img/pin-active.svg';

type MapProps = {
  // city: CityDataType;
  city: CityType;
  offers?: OfferType[];
  activeOffer?: OfferType | null;
  classModificator?: string;
}

function Map({classModificator = 'cities', offers, city, activeOffer}: MapProps): JSX.Element {
  const currentLocation = city?.location;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentLocation);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: DEFAULT_MARKER_URL,
    iconSize: [30, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: ACTIVE_MARKER_URL,
    iconSize: [30, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      offers?.forEach((offer) => {
        map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
        const marker: Marker = leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: activeOffer && activeOffer.id === offer.id ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);

        markers.push(marker);
      });
    }

    return () => {
      markers.forEach((marker) => {
        map?.removeLayer(marker);
      });
    };
  }, [map, offers, city, activeOffer, defaultCustomIcon, currentCustomIcon]);

  return (
    <section
      className={`${classModificator}__map map`}
      ref={mapRef}
    >

    </section>
  );
}

export default Map;
