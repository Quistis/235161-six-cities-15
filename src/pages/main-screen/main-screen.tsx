import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffers } from '../../store/action';
import { OfferType } from '../../types/offer';
import PlacesList from '../../components/places-list/places-list';
import LocationsList from '../../components/locations-list/locations-list';
import Sort from '../../components/sort/sort';
import Map from '../../components/map/map';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.city);
  const currentSortingType = useAppSelector((state) => state.sorting);

  const [activeOffer, setActiveOffer] = useState<OfferType | null>(null);
  const [offersInCurrentCity, setOffersInCurrentCity] = useState<OfferType[]>([]);

  const handleHover = (offer?: OfferType) => {
    setActiveOffer(offer || null);
  };

  useEffect(() => {
    dispatch(getOffers());
  }, []);

  useEffect(() => {
    setOffersInCurrentCity(offers.filter((offer) => offer.city.name === currentCity.name));
  }, [currentCity, offers]);

  //TODO: решить вопрос с ортировкой Popular
  useEffect(() => {
    type SortFunction = (a: OfferType, b: OfferType) => number;

    const sortFunctions: Record<string, SortFunction> = {
      'Top rated first': (a: OfferType, b: OfferType) => b.rating - a.rating,
      'Price: low to high': (a: OfferType, b: OfferType) => a.price - b.price,
      'Price: high to low': (a: OfferType, b: OfferType) => b.price - a.price,
    };

    if (currentSortingType === 'Popular') {
      setOffersInCurrentCity(offers.filter((offer) => offer.city.name === currentCity.name));
    } else if (currentSortingType in sortFunctions) {
      const sortedOffers = offersInCurrentCity
        .slice()
        .sort(sortFunctions[currentSortingType]);
      setOffersInCurrentCity(sortedOffers);
    }

  }, [currentSortingType, offersInCurrentCity, offers, currentCity]);


  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>
          6 Cities. Main page
        </title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <LocationsList/>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersInCurrentCity.length} places to stay in {currentCity.name}</b>
            <Sort/>
            <PlacesList
              offers={offersInCurrentCity}
              onHover={handleHover}
              className={'cities__places-list'}
            />
          </section>
          <div className="cities__right-section">
            <Map offers={offersInCurrentCity} activeOffer={activeOffer} city={currentCity}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
