import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { citySlice } from '../../store/slices/city-slice';
import { AppRoutes } from '../../const';
import { OfferType } from '../../types/offer';
import PlacesList from '../places-list/places-list';

type FavoritesItemProps = {
  city: string;
  offers: OfferType[];
}

function FavoritesItem({city, offers}: FavoritesItemProps): JSX.Element | null {

  const dispatch = useAppDispatch();
  const {changeCity} = citySlice.actions;

  function handleLocationClick(evt: MouseEvent<HTMLElement>) {
    const target = evt.target as HTMLElement;
    const targetCity = target.textContent;

    if (targetCity) {
      dispatch(changeCity({cityName: targetCity}));
    }
  }

  if (offers.length === 0) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div
          className="locations__item"
          onClick={handleLocationClick}
        >
          <Link className="locations__item-link" to={AppRoutes.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <PlacesList
        offers={offers}
        className={'favorites__places'}
      />
    </li>
  );
}

export default FavoritesItem;
