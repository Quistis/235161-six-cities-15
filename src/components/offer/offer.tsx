import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/selectors/authorization-selectors';
import OfferInsideList from '../../components/offer-inside-list/offer-inside-list';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { FullOfferType, ReviewItemType } from '../../types/offer';
import { AuthorizationStatus } from '../../const';

const MAX_COMMENTS_COUNT = 10;

type OfferProps = {
  currentOffer: FullOfferType;
  comments: ReviewItemType[];
}

function sortByDate(a: ReviewItemType, b: ReviewItemType): number {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
}

const Offer = memo(({currentOffer, comments}: OfferProps): JSX.Element => {
  const {id, bedrooms, description, host, goods, maxAdults, price, title, type, rating, isFavorite, isPremium} = currentOffer;
  const authStatus = useAppSelector(getAuthStatus);
  const sortedReviews = comments.slice().sort(sortByDate).slice(0, MAX_COMMENTS_COUNT);

  return (
    <div className="offer__container container">
      <div className="offer__wrapper">
        {isPremium &&
        <div className="offer__mark">
          <span>Premium</span>
        </div>}
        <div className="offer__name-wrapper">
          <h1 className="offer__name">
            {title}
          </h1>
          <BookmarkButton id={id} isFavorite={isFavorite} className='offer' />
        </div>
        <div className="offer__rating rating">
          <div className="offer__stars rating__stars">
            <span style={{width: `${Math.round(rating) / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="offer__rating-value rating__value">{rating}</span>
        </div>
        <ul className="offer__features">
          <li className="offer__feature offer__feature--entire">
            {type}
          </li>
          <li className="offer__feature offer__feature--bedrooms">
            {`${bedrooms} Bedrooms`}
          </li>
          <li className="offer__feature offer__feature--adults">
            {`Max ${maxAdults} adults`}
          </li>
        </ul>
        <div className="offer__price">
          <b className="offer__price-value">&euro;{price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <div className="offer__inside">
          <h2 className="offer__inside-title">What&apos;s inside</h2>
          <OfferInsideList insideOffers={goods}/>
        </div>
        <div className="offer__host">
          <h2 className="offer__host-title">Meet the host</h2>
          <div className="offer__host-user user">
            <div className={`offer__avatar-wrapper user__avatar-wrapper ${host.isPro && 'offer__avatar-wrapper--pro'}`}>
              <img className="offer__avatar user__avatar" src={`${host.avatarUrl}`} width="74" height="74" alt="Host avatar"/>
            </div>
            <span className="offer__user-name">
              {host.name}
            </span>
            {host.isPro &&
              <span className="offer__user-status">
              Pro
              </span>}
          </div>
          <div className="offer__description">
            <p className="offer__text">
              {description}
            </p>
          </div>
        </div>
        <section className="offer__reviews reviews">
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
          {comments.length !== 0 && <ReviewsList reviews={sortedReviews} />}
          {authStatus === AuthorizationStatus.Auth && <ReviewsForm />}
        </section>
      </div>
    </div>
  );
});

Offer.displayName = 'Offer';

export default Offer;
