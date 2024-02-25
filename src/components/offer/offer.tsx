import Gallery from '../../components/gallery/gallery';
import OfferInsideList from '../../components/offer-inside-list/offer-inside-list';
import ReviewsItem from '../../components/reviews-item/reviews-item';
import RatingInput from '../../components/rating-input/rating-input';
import Map from '../../components/map/map';
import { RATINGS } from '../../const';

const INSIDE_OFFERS: string[] = ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen','Dishwasher', 'Cabel TV', 'Fridge'];

const GALLERY_IMAGES: string[] = ['room.jpg', 'apartment-01.jpg', 'apartment-02.jpg', 'apartment-03.jpg', 'studio-01.jpg', 'apartment-01.jpg'];

const REVIEW = {
  id: 1,
  date: 'April 2019',
  user: {
    name: 'Max',
    avatarUrl: 'img/avatar-max.jpg',
    isPro: false
  },
  comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
  rating: 4,
};

function Offer(): JSX.Element {
  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <Gallery images={GALLERY_IMAGES}/>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          <div className="offer__mark">
            <span>Premium</span>
          </div>
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              Beautiful &amp; luxurious studio at great location
            </h1>
            <button className="offer__bookmark-button button" type="button">
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{width: '80%'}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">4.8</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              Apartment
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              3 Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max 4 adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;120</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <OfferInsideList insideOffers={INSIDE_OFFERS}/>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
              </div>
              <span className="offer__user-name">
                Angelina
              </span>
              <span className="offer__user-status">
                Pro
              </span>
            </div>
            <div className="offer__description">
              <p className="offer__text">
                A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
              </p>
              <p className="offer__text">
                An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
              </p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
            <ul className="reviews__list">
              <ReviewsItem key={REVIEW.id} review={REVIEW}/>
            </ul>
            <form className="reviews__form form" action="#" method="post">
              <label className="reviews__label form__label" htmlFor="review">Your review</label>
              <div className="reviews__rating-form form__rating">
                {RATINGS.map((rating) => <RatingInput key={rating.value} rating={rating}/>)}
              </div>
              <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
              <div className="reviews__button-wrapper">
                <p className="reviews__help">
                  To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <Map classModificator = 'offer'/>
    </section>
  );
}

export default Offer;