import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getCurrentSortingType } from '../../store/selectors/sorting-selectors';
import { SORTING_TYPES } from '../../const';
import SortItem from '../sort-item/sort-item';

const Sort = memo((): JSX.Element => {
  const [isOptionsOpened, setIsOptionsOpened] = useState<boolean>(false);
  const currentSortingType = useAppSelector(getCurrentSortingType);
  const sortingRef = useRef<HTMLFormElement>(null);

  const handleClickOutside = useCallback((evt: MouseEvent) => {
    if (sortingRef.current && !sortingRef.current.contains(evt.target as Node)) {
      setIsOptionsOpened(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleSortOptionsClick = useCallback(() => {
    setIsOptionsOpened(!isOptionsOpened);
  }, [isOptionsOpened]);

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      ref={sortingRef}
      onClick={handleSortOptionsClick}
    >
      <span className="places__sorting-caption">Sort by</span>
      {' '}
      <span
        className="places__sorting-type"

        tabIndex={0}
      >
        {currentSortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOptionsOpened ? 'places__options--opened' : ''}`}>
        {SORTING_TYPES.map((sortType) => <SortItem key={sortType.name} sortType={sortType}/>)}
      </ul>
    </form>
  );
});

Sort.displayName = 'Sort';

export default Sort;
