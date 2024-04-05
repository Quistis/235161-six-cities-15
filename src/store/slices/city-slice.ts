import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CityType } from '../../types/offer';
import { Setting, CITIES } from '../../const';

type ChangeCityPayload = {
  cityName: string;
}

const initialState: CityType = {
  name: Setting.defaultCity.name,
  location: Setting.defaultCity.location
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<ChangeCityPayload>) => {
      const {cityName} = action.payload;
      const newCity = CITIES.find((city) => city.name === cityName);

      if (newCity) {
        state.name = newCity.name;
        state.location = newCity.location;
      }
    }
  },
});

export const cityReducer = citySlice.reducer;
