import { Helmet } from 'react-helmet-async';
import { OfferType } from '../../types/offer';
import PlacesList from '../../components/places-list/places-list';
//import PlaceCard from '../../components/place-card/place-card';
import Offer from '../../components/offer/offer';

type OfferScreenProps = {
  offers: OfferType[];
}

function OfferScreen({offers}: OfferScreenProps): JSX.Element {
  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>
          6 Cities. Offer
        </title>
      </Helmet>

      <Offer/>

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <PlacesList
            offers={offers}
            className={'near'}
          />
        </section>
      </div>
    </main>
  );
}

export default OfferScreen;
