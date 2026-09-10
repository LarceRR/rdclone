import React, { useEffect, useState } from 'react';
import './FooterBottom.css';
import './FooterBottomMedia.css';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useLocation } from '../../hooks/useLocation.js';
import { getTelephone } from '../../hooks/getTelephone.js';
import { useMediaQuery } from 'react-responsive';
import ReklamaModal from '../ReklamaModal/ReklamaModal.jsx';
import RegisterModal from '../RegisterModal/RegisterModal.jsx';

const FooterBottom = () => {
    const token = window.sessionStorage.getItem('token');

    const city = window.localStorage.getItem('local_city');

    const [showModalReklama, setShowModalReklama] = useState(false);
    
    const [showModalRegister, setShowModalRegister] = useState(false);

    const media991px = useMediaQuery({ query: '(max-width: 991px)' });

    const animate = 'animate__animated animate__fadeInDown animate__fast';

    return (
        <footer className={'FooterBottom'}>
            <Container>
                <div className="left">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="/logo.png"
                            className="logo d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <p className="small m-0">
                        Copyright ©{new Date().getFullYear()} | RemontDeco.
                        <br />
                        Все права защищены.
                    </p>
                </div>

                        <div className="footer-menu">
            <a href="/" className={`footer-link ${animate}`}>
                Главная
            </a>

            {/* {!token && ( */}
            <Nav className={`small ${animate}`} hidden={false}>
                {/* "Заказать рекламу" как ссылка */}
                <a 
                    className={`footer-link ${animate}`}
                    onClick={() => setShowModalReklama(true)}
                    style={{ cursor: 'pointer' }}
                >
                    Заказать рекламу
                </a>
                
                {/* "Регистрация" как ссылка (показывается если нет токена) */}
                {!token && (
                    <>
                        <a 
                            className={`footer-link ${animate}`}
                            onClick={() => setShowModalRegister(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            Регистрация
                        </a>
                        
                        {/* Если нужно - добавьте "Вход" как ссылку */}
                        {/* <a 
                            className={`footer-link ${animate}`}
                            onClick={() => setShowModalLogin(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            Вход
                        </a> */}
                    </>
                )}
            </Nav>
        </div>
                {/* )} */}
                <div className="right">
                    <div className="footer-buttons">
                        <a className="footer-phone" href="tel:8-980-025-80-47">
                            <svg
                                width="23"
                                height="24"
                                viewBox="0 0 23 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.989"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M5.36362 0.805542C5.58823 0.805542 5.81284 0.805542 6.03745 0.805542C6.31534 0.899719 6.56991 1.04197 6.80112 1.2323C7.1114 1.51244 7.38839 1.81941 7.63218 2.1532C8.20983 2.9863 8.73393 3.85479 9.20444 4.75867C9.51988 5.42374 9.59472 6.11257 9.42905 6.82507C9.24029 7.26877 8.96326 7.6506 8.598 7.97058C8.07942 8.41441 7.54781 8.84117 7.00327 9.25085C6.5231 9.92033 6.44822 10.6391 6.77866 11.4071C7.17052 12.2962 7.66466 13.1198 8.26108 13.8778C8.95252 14.7342 9.69373 15.5503 10.4847 16.326C11.0905 16.8761 11.7643 17.3253 12.5062 17.6737C13.1391 17.9292 13.738 17.8693 14.3031 17.494C14.8466 16.9054 15.4306 16.3663 16.055 15.8768C16.6652 15.4707 17.3241 15.3658 18.0316 15.5624C18.7318 15.8224 19.3607 16.1968 19.9183 16.6854C20.4691 17.1668 21.0156 17.6534 21.558 18.1454C21.8044 18.4288 22.0291 18.7283 22.2318 19.0438C22.5441 19.6817 22.4842 20.2807 22.0521 20.8407C21.3655 21.5126 20.6393 22.134 19.8734 22.705C18.9174 23.3006 17.8842 23.6674 16.7738 23.8055C16.2347 23.8055 15.6957 23.8055 15.1566 23.8055C13.8964 23.6376 12.6985 23.2558 11.5628 22.66C9.50632 21.4732 7.68698 19.9833 6.10483 18.1903C4.88844 16.8545 3.81033 15.417 2.87046 13.8778C1.8393 12.2069 1.21039 10.3951 0.98374 8.44226C0.820629 6.34149 1.40461 4.48474 2.73569 2.87195C3.31445 2.32459 3.90592 1.79301 4.51011 1.27722C4.77187 1.07163 5.05636 0.914407 5.36362 0.805542Z"
                                    fill="#878787"
                                />
                            </svg>
                            <p>Позвонить</p>
                        </a>
                        <a
                            className="footer-search-btn"
                            href="https://t.me/RabotaNNovRD"
                        >
                            <svg
                                width="24"
                                height="21"
                                viewBox="0 0 24 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.992"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M23.6951 1.79371C23.6951 2.07821 23.6951 2.36272 23.6951 2.64723C22.4935 8.2276 21.2882 13.8129 20.0789 19.4031C19.6853 20.2376 19.0789 20.4247 18.2595 19.9646C16.4881 18.6858 14.7287 17.3906 12.9812 16.0789C12.0317 16.9534 11.0959 17.8444 10.1736 18.7517C9.92265 18.9476 9.63816 19.03 9.32007 18.9988C9.44095 17.2017 9.56822 15.4048 9.7019 13.6082C13.0403 10.659 16.3495 7.67924 19.6296 4.66871C19.6596 4.62379 19.6596 4.57887 19.6296 4.53395C19.5591 4.4954 19.4842 4.46544 19.405 4.4441C19.2208 4.48008 19.0485 4.54747 18.8884 4.64625C14.8342 7.17872 10.7838 9.71681 6.73706 12.2605C4.95164 11.6904 3.16225 11.1288 1.3689 10.5759C1.09783 10.4758 0.873221 10.3186 0.695068 10.1043C0.695068 9.95453 0.695068 9.80476 0.695068 9.65504C0.822611 9.43303 1.0023 9.2608 1.23413 9.13844C8.18997 6.44047 15.1529 3.76012 22.1228 1.09742C22.8888 0.82205 23.4129 1.05415 23.6951 1.79371Z"
                                    fill="white"
                                />
                            </svg>
                            <p>Поиск рабочих</p>
                        </a>
                    </div>
                    <div className={'inner'}>
                        <p className="small">Поддержка 24ч:</p>
                        <h6>remontdeco@yandex.ru</h6>
                    </div>
                    <p className="footer-credits">
                        Copyright ©{new Date().getFullYear()} | RemontDeco.
                    </p>
                </div>
                <ReklamaModal
                    show={showModalReklama}
                    onHide={() => setShowModalReklama(false)}
                />
             <RegisterModal
                    show={showModalRegister}
                    onHide={() => setShowModalRegister(false)}
                    onLoginClick={() => {
                        setShowModalRegister(false);
                        // Если есть логин модалка, раскомментируйте:
                        // setShowModalLogin(true);
                    }}
                />
                
                {/* Если будете делать логин модалку: */}
                {/* <LoginModal
                    show={showModalLogin}
                    onHide={() => setShowModalLogin(false)}
                    onRegisterClick={() => {
                        setShowModalLogin(false);
                        setShowModalRegister(true);
                    }}
                /> */}
                {/* ============================ */}
            </Container>
        </footer>
    );
};

export default FooterBottom;
