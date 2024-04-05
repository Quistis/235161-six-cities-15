import { MouseEvent, memo } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { citySlice } from '../../store/slices/city-slice';
import { getCurrentCity } from '../../store/selectors/city-selectors';
import { CityType } from '../../types/offer';

type LocationsListItemProps = {
  city: CityType;
}

const LocationsListItem = memo(({city}: LocationsListItemProps): JSX.Element => {
  const {name} = city;
  const activeItemClass = 'tabs__item--active';
  const currentCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();
  const {changeCity} = citySlice.actions;

  function handleCityClick (evt: MouseEvent<HTMLElement>) {
    const target = evt.target as HTMLElement;
    const targetCity = target.textContent;

    if (targetCity) {
      dispatch(changeCity({cityName: targetCity}));
    }
  }

  return (
    <li
      className="locations__item"
      onClick={handleCityClick}
    >
      <a
        className={`locations__item-link tabs__item ${name === currentCity.name ? activeItemClass : ''}`}
        href="#"
      >
        <span>
          {name}
        </span>
      </a>
    </li>
  );
});

LocationsListItem.displayName = 'LocationsListItem';

export default LocationsListItem;
