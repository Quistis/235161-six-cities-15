import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getFavoriteOffers } from '../../store/selectors/favorites-selectors';
import { getAuthStatus } from '../../store/selectors/authorization-selectors';
import { getUserData } from '../../store/selectors/user-selectors';
import { AppRoutes } from '../../const';
import { AuthorizationStatus } from '../../const';

function getLayoutState(pathname: string) {
  let mainClassName = '';
  let linkClassName = '';
  let shouldRenderUser = true;

  if (pathname === AppRoutes.Main) {
    mainClassName = ' page--gray page--main';
    linkClassName = ' header__logo-link--active';
  } else if (pathname === AppRoutes.Favorites || pathname === AppRoutes.Offer) {
    mainClassName = '';
    linkClassName = ' header__logo-link--active';
  } else if (pathname === AppRoutes.Login) {
    mainClassName = ' page--gray page--login';
    shouldRenderUser = false;
  }

  return {mainClassName, linkClassName, shouldRenderUser};
}

function Layout(): JSX.Element {
  const {pathname} = useLocation();
  const authStatus = useAppSelector(getAuthStatus);
  const userData = useAppSelector(getUserData);
  const {mainClassName, linkClassName, shouldRenderUser} = getLayoutState(pathname);
  const isFavoritePage = pathname === AppRoutes.Favorites;
  const bookmarkedOffers = useAppSelector(getFavoriteOffers);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    dispatch(logoutAction())
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          if (isFavoritePage) {
            navigate(AppRoutes.Login);
          } else {
            navigate(AppRoutes.Main);
          }
        }
      });
  };

  return (
    <div className={`page${mainClassName} ${isFavoritePage && bookmarkedOffers.length === 0 ? 'page--favorites-empty' : ''}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className={`header__logo-link${linkClassName}`} to={AppRoutes.Main}>
                <img className="header__logo" src="/235161-six-cities-15/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            {shouldRenderUser ? (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {authStatus === AuthorizationStatus.Auth && (
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{
                            backgroundImage:`url(${userData?.avatarUrl})`,
                            borderRadius: '50%'
                          }}
                        >
                        </div>
                        <span className="header__user-name user__name">{`${userData?.email}`}</span>
                        <span className="header__favorite-count">{bookmarkedOffers.length}</span>
                      </Link>
                    </li>
                  )}
                  <li className={`header__nav-item ${authStatus === AuthorizationStatus.NoAuth && 'user'}`}>
                    <Link
                      className={`header__nav-link ${authStatus === AuthorizationStatus.NoAuth && 'header__nav-link--profile'}`}
                      to={authStatus === AuthorizationStatus.Auth ? AppRoutes.Main : AppRoutes.Login}
                    >
                      {authStatus === AuthorizationStatus.Auth
                        ? (<span onClick={handleSignOutClick} className="header__signout">Sign out</span>)
                        : (<><div className="header__avatar-wrapper user__avatar-wrapper"></div><span className="header__login">Sign in</span></>)}
                    </Link>
                  </li>
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      </header>
      <Outlet />
      {isFavoritePage ? (
        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoutes.Main}>
            <img className="footer__logo" src="/235161-six-cities-15/img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      ) : null}
    </div>
  );
}

export default Layout;
