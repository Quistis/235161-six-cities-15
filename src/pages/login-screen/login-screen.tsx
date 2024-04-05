import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { citySlice } from '../../store/slices/city-slice';
import { getAuthLoadingStatus } from '../../store/selectors/authorization-selectors';
import { loginAction } from '../../store/api-actions';
import { AppRoutes, CITIES } from '../../const';

function LoginScreen(): JSX.Element {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {changeCity} = citySlice.actions;

  const authLoadingStatus = useAppSelector(getAuthLoadingStatus);

  const randomCityIndex = Math.floor(Math.random() * CITIES.length);

  const handleEmailInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const emailValue = evt.target.value;
    setEmail(emailValue);
  };

  const handlePasswordInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const passwordValue = evt.target.value;
    setPassword(passwordValue);
  };

  const handleSubmit = (evt: FormEvent<HTMLElement>) => {
    evt.preventDefault();

    if (email !== '' && password !== '') {
      dispatch(loginAction({
        email: email,
        password: password,
      }))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            navigate(AppRoutes.Main);
          }
        });
    }
  };

  function handleCityClick (evt: MouseEvent<HTMLElement>) {
    const target = evt.target as HTMLElement;
    const targetCity = target.textContent;

    if (targetCity) {
      dispatch(changeCity({cityName: targetCity}));
    }
  }

  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>
          6 Cities. Login
        </title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                onChange={handleEmailInputChange}
                className="login__input form__input"
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                onChange={handlePasswordInputChange}
                className="login__input form__input"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                pattern="^.*(?=.*[a-zA-Z])(?=.*\d).*$"
                title="Пароль должен состоять только из латинских букв и цифр, и быть не менее 2 символов в длину"
                required
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
              disabled={authLoadingStatus}
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoutes.Main} onClick={handleCityClick}>
              <span>{CITIES[randomCityIndex].name}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
