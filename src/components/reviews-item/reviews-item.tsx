import { memo } from 'react';
import { ReviewItemType } from '../../types/offer';

type ReviewsItemProps = {
  review: ReviewItemType;
}

const ReviewsItem = memo(({review}: ReviewsItemProps): JSX.Element => {
  const {user, comment, date, rating} = review;
  const dateAsObj = new Date(date);
  const month = dateAsObj.toLocaleString('en', { month: 'long' });
  const year = dateAsObj.getFullYear();

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{`${month} ${year}`}</time>
      </div>
    </li>
  );
});

ReviewsItem.displayName = 'ReviewsItem';

export default ReviewsItem;
