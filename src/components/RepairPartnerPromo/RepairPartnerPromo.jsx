import React from 'react';
import './RepairPartnerPromo.css';
import './RepairPartnerPromoMedia.css';
import CountdownTimer from './CountdownTimer/CountdownTimer';
// import { FaTelegramPlane, FaPhoneAlt } from 'react-icons/fa';

const RepairPartnerPromo = () => {
    return (
        <div className="promo-container">
            <div className="promo-left">
                <h2 className="promo-title">
                    МЫ - ВАШ НАДЕЖНЫЙ ПАРТНЕР В РЕМОНТЕ:
                </h2>
                <p className="promo-subtitle">
                    УСТАНОВКА, ПРОДАЖА И <br /> ОБСЛУЖИВАНИЕ
                </p>
                {/* <CountdownTimer targetDate="2026-01-01T00:00:00" /> */}
                <div className="promo-left_logo">
                    <img
                        alt=""
                        src="/logo.png"
                        className="logo d-inline-block align-top"
                    />
                </div>
                {/* 
                <div className="promo-actions">
                    <div className="promo-qr">
                        <img src="/images/partnership/qr.png" alt="QR Code" />
                    </div>
                    <div className="promo-buttons">
                        <a
                            className="promo-search-btn"
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
                </div> */}
            </div>
        </div>
    );
};

export default RepairPartnerPromo;
