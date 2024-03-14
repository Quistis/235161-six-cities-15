import { createReducer } from '@reduxjs/toolkit';
import { changeCity, filterOffersByCity, resetOffers } from './action';
import { offers } from '../mock/offers';

const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 12
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 12
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 12
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 12
    }
  }
];

const initialState = {
  city: CITIES[0],
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {cityName} = action.payload;
      const newCity = CITIES.find((city) => city.name === cityName);

      if (newCity) {
        state.city = newCity;
      }
    })
    .addCase(filterOffersByCity, (state, action) => {
      const {cityName} = action.payload;
      state.offers = offers.filter((offer) => offer.city.name === cityName);
    })
    .addCase(resetOffers, (state) => {
      state.offers = offers;
    });
});

export {reducer};
