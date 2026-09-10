import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import './ServiceInfo.css';
import './ServicesInfoMedia.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import CompaniesList from './CompaniesList/CompaniesList';
import InterestingServices from './InterestingServices/InterestingServices';
import { Navigation } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';

const ServiceInfo = ({ selectedItem, categories, otherCompanies }) => {
    const navigate = useNavigate();
    const media500px = useMediaQuery({ query: '(max-width: 510px)' });
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div>
            <h1 className="service-info-title">
                {selectedItem?.title_category || 'Неопознана'}
            </h1>
            <div>
                <div className="service-main">
                    <div className="service-main-right">
                        <p className="service-main-right-title">Компания:</p>
                        <p className="service-main-right-subtitle">
                            {selectedItem?.title}
                        </p>
                        <div className="service-main-right-group">
                            <p
                                className={`${isOpened ? 'service-main-right-desc-full' : 'service-main-right-desc'}`}
                            >
                                {selectedItem?.description}
                            </p>
                            <div
                                onClick={() => setIsOpened(!isOpened)}
                                style={{
                                    transform: `rotate(${isOpened ? 180 : 0}deg)`,
                                }}
                            >
                                <svg
                                    width="16"
                                    height="10"
                                    viewBox="0 0 16 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.962"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0.873061 0.787871C1.11391 0.761918 1.3431 0.798437 1.56056 0.897471C3.70242 3.09008 5.85086 5.27476 8.00587 7.45154C10.1609 5.27476 12.3093 3.09008 14.4512 0.897471C14.7377 0.751353 15.0241 0.751353 15.3106 0.897471C15.5928 1.20194 15.643 1.54534 15.461 1.92771C13.1192 4.31698 10.7774 6.70626 8.43556 9.09554C8.14909 9.24165 7.86266 9.24165 7.57619 9.09554C5.23439 6.70626 2.89259 4.31698 0.550796 1.92771C0.322086 1.43995 0.429508 1.05999 0.873061 0.787871Z"
                                        fill="#418FE2"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="service-main-block">
                            <a
                                className="service-phone"
                                href={`tel:${selectedItem?.phone}`}
                            >
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
                                <p>{selectedItem?.phone}</p>
                            </a>

                            <a
                                className="service-phone"
                                href={`mailto:${selectedItem?.email}`}
                            >
                                <svg
                                    width="33"
                                    height="27"
                                    viewBox="0 0 33 27"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_13_1433)">
                                        <path
                                            opacity="0.992"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M32.2681 3.30471C32.2681 3.75612 32.2681 4.20746 32.2681 4.65888C32.0876 5.40922 31.7126 6.0299 31.1431 6.52086C26.7681 9.6806 22.3931 12.8403 18.0181 16C16.8514 16.7674 15.6848 16.7674 14.5181 16C10.1431 12.8403 5.76807 9.6806 1.39307 6.52086C0.82352 6.0299 0.44852 5.40922 0.268066 4.65888C0.268066 4.20746 0.268066 3.75612 0.268066 3.30471C0.624464 1.95959 1.43697 1.1358 2.70557 0.833355C11.7473 0.788214 20.7889 0.788214 29.8306 0.833355C31.0984 1.13544 31.9109 1.95922 32.2681 3.30471Z"
                                            fill="#878787"
                                        />
                                        <path
                                            opacity="0.994"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M0.268066 8.04425C4.79629 11.2905 9.31713 14.5518 13.8306 17.8281C15.4556 18.776 17.0806 18.776 18.7056 17.8281C23.219 14.5518 27.7398 11.2905 32.2681 8.04425C32.2681 13.4609 32.2681 18.8776 32.2681 24.2942C31.9109 25.6397 31.0984 26.4635 29.8306 26.7656C20.7889 26.8108 11.7473 26.8108 2.70557 26.7656C1.43697 26.4632 0.624464 25.6393 0.268066 24.2942C0.268066 18.8776 0.268066 13.4609 0.268066 8.04425Z"
                                            fill="#878787"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_13_1433">
                                            <rect
                                                width="32"
                                                height="26"
                                                fill="white"
                                                transform="translate(0.299316 0.5)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>{selectedItem?.email}</p>
                            </a>

                            <a
                                className="service-link"
                                href={`${selectedItem?.site}`}
                            >
                                <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_14_1506)">
                                        <path
                                            d="M12.2646 5C11.7126 5 11.2646 4.552 11.2646 4V1C11.2646 0.448 11.7126 0 12.2646 0C12.8166 0 13.2646 0.448 13.2646 1V4C13.2646 4.552 12.8166 5 12.2646 5ZM7.26465 10C7.26465 9.448 6.81665 9 6.26465 9H3.26465C2.71265 9 2.26465 9.448 2.26465 10C2.26465 10.552 2.71265 11 3.26465 11H6.26465C6.81665 11 7.26465 10.552 7.26465 10ZM8.69765 6.542C9.08865 6.151 9.08865 5.519 8.69765 5.128L6.57565 3.006C6.18465 2.615 5.55265 2.615 5.16165 3.006C4.77065 3.397 4.77065 4.029 5.16165 4.42L7.28365 6.542C7.67465 6.933 8.30665 6.933 8.69765 6.542ZM17.2146 6.465L19.3356 4.344C19.7266 3.953 19.7266 3.321 19.3356 2.93C18.9446 2.539 18.3126 2.539 17.9216 2.93L15.8006 5.051C15.4096 5.442 15.4096 6.074 15.8006 6.465C16.1916 6.856 16.8236 6.856 17.2146 6.465ZM21.8526 15.314L13.8916 7.529C12.4706 6.323 10.2646 7.315 10.2646 9.159V20.399C10.2646 21.575 11.6746 22.203 12.5756 21.429L14.5896 19.627L16.1976 22.886C16.7846 24.028 18.2706 24.346 19.2906 23.595C20.1146 22.991 20.3086 21.832 19.8466 20.92L18.4226 18.01L21.0626 17.639C22.2036 17.483 22.6696 16.112 21.8536 15.314H21.8526Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_14_1506">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                                transform="translate(0.264648)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>Перейти на сайт</p>
                            </a>
                        </div>
                    </div>
                    {media500px && typeof selectedItem?.image1 === 'string' && (
                        <div className="custom-swiper-nav">
                            <button
                                className={`button-prev-${selectedItem?.id}`}
                            >
                                <svg
                                    width="20"
                                    height="21"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.8334 10.0552H4.16669M4.16669 10.0552L10 15.8885M4.16669 10.0552L10 4.22186"
                                        stroke="#3388CC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                className={`button-next-${selectedItem?.id}`}
                            >
                                <svg
                                    width="20"
                                    height="21"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.16669 10.0552H15.8334M15.8334 10.0552L10 4.22186M15.8334 10.0552L10 15.8885"
                                        stroke="#3388CC"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="service-main-left">
                        {selectedItem &&
                            (typeof selectedItem?.image1 === 'string' ? (
                                <>
                                    {typeof selectedItem?.image1 === 'string'
                                        ? media500px || (
                                              <div className="custom-swiper-nav">
                                                  <button
                                                      className={`button-prev-${selectedItem?.id}`}
                                                  >
                                                      <svg
                                                          width="20"
                                                          height="21"
                                                          viewBox="0 0 20 21"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                          <path
                                                              d="M15.8334 10.0552H4.16669M4.16669 10.0552L10 15.8885M4.16669 10.0552L10 4.22186"
                                                              stroke="#3388CC"
                                                              stroke-width="1.5"
                                                              stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                          />
                                                      </svg>
                                                  </button>
                                                  <button
                                                      className={`button-next-${selectedItem?.id}`}
                                                  >
                                                      <svg
                                                          width="20"
                                                          height="21"
                                                          viewBox="0 0 20 21"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                          <path
                                                              d="M4.16669 10.0552H15.8334M15.8334 10.0552L10 4.22186M15.8334 10.0552L10 15.8885"
                                                              stroke="#3388CC"
                                                              stroke-width="1.5"
                                                              stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                          />
                                                      </svg>
                                                  </button>
                                              </div>
                                          )
                                        : null}

                                    <Swiper
                                        modules={[Navigation]}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        navigation={{
                                            prevEl: `.button-prev-${selectedItem?.id}`,
                                            nextEl: `.button-next-${selectedItem?.id}`,
                                        }}
                                        loop
                                    >
                                        {[
                                            selectedItem?.image1,
                                            selectedItem?.image2,
                                            selectedItem?.image3,
                                            selectedItem?.image4,
                                            selectedItem?.image5,
                                            selectedItem?.image6,
                                            selectedItem?.image7,
                                            selectedItem?.image8,
                                            selectedItem?.image9,
                                            selectedItem?.image10,
                                            selectedItem?.image11,
                                            selectedItem?.image12,
                                            selectedItem?.image13,
                                            selectedItem?.image14,
                                            selectedItem?.image15,
                                            selectedItem?.image16,
                                            selectedItem?.image17,
                                            selectedItem?.image18,
                                            selectedItem?.image19,
                                            selectedItem?.image20,
                                        ]
                                            ?.filter((el) => el)
                                            .map((media, index) => (
                                                <SwiperSlide key={index}>
                                                    {media?.includes('mp4') ? (
                                                        <video
                                                            src={`${import.meta.env.VITE_GENERAL_IMAGE}${media}`}
                                                            controls
                                                            autoPlay
                                                            muted
                                                            loop
                                                            className="w-full h-full object-cover"
                                                        ></video>
                                                    ) : (
                                                        <img
                                                            onError={(e) =>
                                                                (e.currentTarget.src =
                                                                    '/images/no-img.png')
                                                            }
                                                            src={`${import.meta.env.VITE_GENERAL_IMAGE}${media}`}
                                                            alt={
                                                                selectedItem?.title
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </>
                            ) : (
                                <img
                                    onError={(e) =>
                                        (e.currentTarget.src =
                                            '/images/no-img.png')
                                    }
                                    src={`${import.meta.env.VITE_GENERAL_IMAGE}${selectedItem?.image1}`}
                                />
                            ))}
                    </div>
                </div>
                <div className="service-home">
                    <button onClick={() => navigate('/')}>
                        Вернуться на главную
                    </button>
                </div>
            </div>
            <CompaniesList companies={otherCompanies} />
            <InterestingServices categories={categories} />
        </div>
    );
};

export default ServiceInfo;
