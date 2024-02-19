import PlaceCard from '../../components/place-card/place-card';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import { CardsData } from '../../mock/cards-data';

type MainScreenProps = {
  placesToStayCount: number;
}

function MainScreen({placesToStayCount}: MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
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
              <b className="places__found">{placesToStayCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                {' '}
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {CardsData.map((card) => <PlaceCard key={card.id} placeCard={card}/>)}
              </div>
            </section>
            <div className="cities__right-section">
              <Map/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
