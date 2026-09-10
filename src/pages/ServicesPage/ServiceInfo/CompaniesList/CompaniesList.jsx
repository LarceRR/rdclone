import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import './CompaniesList.css';
import './CompaniesListMedia.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import CompanyItem from './CompanyItem';

const CompaniesList = ({ companies }) => {
    const media500px = useMediaQuery({ query: '(max-width: 510px)' });

    return (
        <section className="companies-section">
            <h2 className="section-title">Другие компании</h2>
            <div className="carousel-container">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={'auto'}
                    spaceBetween={media500px ? 8 : 30}
                    loop={true}
                    navigation={{
                        prevEl: '.button-prev',
                        nextEl: '.button-next',
                    }}
                    observer={true}
                    observeParents={true}
                    updateOnWindowResize={true}
                >
                    {companies?.map((company, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Link
                                    to={`/company/${company.id}`}
                                    className="companies-link"
                                >
                                    <CompanyItem company={company} />
                                    <div className="company__info">
                                        <div>
                                            <div className="company__title">
                                                <h3>{company?.title}</h3>
                                                <div className="company__rating">
                                                    ⭐{' '}
                                                    {Number(
                                                        company?.rating,
                                                    ).toFixed(1)}
                                                </div>
                                            </div>
                                            <p className="company__product">
                                                {company?.product}
                                            </p>
                                            <p className="company__desc">
                                                {company?.description}
                                            </p>
                                        </div>

                                        <button
                                            className="company__btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation(); // prevent navigation from Link
                                                window.open(company?.site);
                                            }}
                                        >
                                            <a href="#">Перейти на сайт</a>
                                        </button>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <div className="custom-swiper-nav">
                <button className="button-prev">
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
                <button className="button-next">
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
        </section>
    );
};

export default CompaniesList;
