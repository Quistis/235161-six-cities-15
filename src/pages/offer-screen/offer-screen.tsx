import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { citySlice } from '../../store/slices/city-slice';
import { fetchOfferById, fetchNearbyOffers, fetchComments } from '../../store/api-actions';
import { getCurrentOffer, getCurrentOfferLoadingStatus, getCurrentOfferErrorStatus, getNearbyOffers, getComments } from '../../store/selectors/offers-selectors';
import { getCurrentCity } from '../../store/selectors/city-selectors';
import PlacesList from '../../components/places-list/places-list';
import Gallery from '../../components/gallery/gallery';
import Offer from '../../components/offer/offer';
import Map from '../../components/map/map';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Loader from '../../components/loader/loader';

function OfferScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const {changeCity} = citySlice.actions;

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            dispatch(fetchNearbyOffers(id));
            dispatch(fetchComments(id));
          }
        });
    }
  }, [id, dispatch]);

  const isLoading = useAppSelector(getCurrentOfferLoadingStatus);
  const isLoadError = useAppSelector(getCurrentOfferErrorStatus);
  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const currentComments = useAppSelector(getComments);
  const currentCity = useAppSelector(getCurrentCity);

  const galleryImages = useMemo(() => currentOffer?.images.slice(0, 6), [currentOffer?.images]);
  const mapOffers = useMemo(() => nearbyOffers && currentOffer ? [...nearbyOffers.slice(0, 3), currentOffer] : [], [nearbyOffers, currentOffer]);

  useEffect(() => {
    if (currentOffer) {
      dispatch(changeCity({cityName: currentOffer?.city.name}));
    }
  }, [currentOffer, dispatch, changeCity]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  if (isLoadError) {
    return (
      <main className="page__main page__main--offer">
        <h2
          style={{
            textAlign: 'center',
            paddingBlockStart: '50px',
          }}
        >
          Произошла ошибка при загрузке данных
        </h2>
      </main>
    );
  }

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>
          6 Cities. Offer
        </title>
      </Helmet>

      <section className="offer">

        <div className="offer__gallery-container container">
          <Gallery images={galleryImages}/>
        </div>

        <Offer currentOffer={currentOffer} comments={currentComments} />
        {mapOffers.length > 0 &&
          <Map
            offers={mapOffers}
            activeOffer={currentOffer}
            classModificator = 'offer'
            city={currentCity}
          />}
      </section>

      <div className="container">
        {nearbyOffers.length !== 0 &&
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesList
            offers={nearbyOffers.slice(0, 3)}
            className={'near-places__list'}
          />
        </section>}
      </div>
    </main>
  );
}

export default OfferScreen;
