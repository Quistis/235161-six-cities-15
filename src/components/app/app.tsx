import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOffersLoadingStatus } from '../../store/selectors/offers-selectors';
import { fetchFavoriteOffers } from '../../store/api-actions';
import { getAuthStatus } from '../../store/selectors/authorization-selectors';
import MainScreen from '../../pages/main-screen/main-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import Layout from '../layout/layout';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import Loader from '../loader/loader';
import { AppRoutes, AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const isLoading = useAppSelector(getOffersLoadingStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteOffers());
    }
  }, [dispatch, authStatus]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter basename='/235161-six-cities-15'>
        <Routes>
          <Route path={AppRoutes.Main} element={<Layout />}>
            <Route index element={<MainScreen />}></Route>
            <Route
              path={AppRoutes.Login}
              element={
                <PrivateRoute isReverse>
                  <LoginScreen/>
                </PrivateRoute>
              }
            />
            <Route path={AppRoutes.Offer} element={<OfferScreen />}></Route>
            <Route
              path={AppRoutes.Favorites}
              element={
                <PrivateRoute>
                  <FavoritesScreen />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<NotFoundScreen />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
