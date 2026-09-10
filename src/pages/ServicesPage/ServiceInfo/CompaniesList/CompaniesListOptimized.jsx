import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css';
import 'swiper/css/navigation';
import './CompaniesList.css';
import './CompaniesListMedia.css';
import CompanyItemOptimized from './CompanyItemOptimized';

const CompaniesListOptimized = ({ companies }) => {
    const mobile = useMediaQuery({ query: '(max-width: 510px)' });

    return (
        <section className="companies-section">
            <h2 className="section-title">Другие компании</h2>
            <div className="carousel-container">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView="auto"
                    spaceBetween={mobile ? 8 : 30}
                    loop={Boolean(companies?.length > 1)}
                    navigation={!mobile}
                    preloadImages={false}
                    watchSlidesProgress
                >
                    {companies?.map((company) => (
                        <SwiperSlide key={company.id}>
                            <Link to={`/company/${company.id}`} className="companies-link">
                                <CompanyItemOptimized company={company} />
                                <div className="company__info">
                                    <div>
                                        <div className="company__title">
                                            <h3>{company?.title}</h3>
                                            <div className="company__rating">
                                                ⭐ {Number(company?.rating).toFixed(1)}
                                            </div>
                                        </div>
                                        <p className="company__product">{company?.product}</p>
                                        <p className="company__desc">{company?.description}</p>
                                    </div>
                                    <button
                                        className="company__btn"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            window.open(company?.site, '_blank', 'noopener,noreferrer');
                                        }}
                                    >
                                        Перейти на сайт
                                    </button>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CompaniesListOptimized;
