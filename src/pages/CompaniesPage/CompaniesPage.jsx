import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link, useLocation, useParams } from 'react-router-dom';
import './CompaniesPage.css';
import './CompaniesPageMedia.css';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import Loader from '../../components/Loader/Loader';

const CompaniesPage = () => {
    const [dataCategory, setDataCategory] = useState([]);
    const { categoryId } = useParams();
    const { search } = useLocation();

    const media500px = useMediaQuery({ query: '(max-width: 510px)' });
    const categoryName = search.length
        ? decodeURIComponent(search.replace('?service=', ''))
        : 'Неизвестная категория';

    const getCompanyList = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}company`,
            );
            const filteredCompany = response?.data?.data.filter(
                (company) => company.category_id == categoryId,
            );
            const sortedCompany = filteredCompany.sort(
                (a, b) => a.posi - b.posi,
            );
            setDataCategory(sortedCompany);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (categoryId) {
            getCompanyList();
        }
    }, [categoryId]);

    const sortedCompanies = [...dataCategory]?.sort(
        (a, b) => b?.rating - a?.rating,
    );
    const topCompanies = sortedCompanies?.slice(0, 3) || [];
    const otherCompanies = sortedCompanies?.slice(3) || [];

    return (
        <Container>
            {topCompanies.length && otherCompanies.length ? (
                <div className="companies">
                    <h2>Компании, занимающиеся: {categoryName}</h2>

                    <div className="companies__top">
                        {!!topCompanies.length &&
                            topCompanies?.map((company) => {
                                return (
                                    <Link
                                        to={`/company/${company?.id}`}
                                        key={company?.id}
                                        className="company company--top"
                                    >
                                        <div className="company__media">
                                            <div className="company__badge">
                                                Рекомендуем
                                            </div>

                                            {typeof company?.image1 ===
                                            'string' ? (
                                                !media500px ? (
                                                    <Swiper
                                                        modules={[Navigation]}
                                                        spaceBetween={20}
                                                        slidesPerView={1}
                                                        navigation={{
                                                            prevEl: `.button-prev-${company?.id}`,
                                                            nextEl: `.button-next-${company?.id}`,
                                                        }}
                                                        loop
                                                    >
                                                        {[
                                                            company?.image1,
                                                            company?.image2,
                                                            company?.image3,
                                                            company?.image4,
                                                            company?.image5,
                                                            company?.image6,
                                                            company?.image7,
                                                            company?.image8,
                                                            company?.image9,
                                                            company?.image10,
                                                            company?.image11,
                                                            company?.image12,
                                                            company?.image13,
                                                            company?.image14,
                                                            company?.image15,
                                                            company?.image16,
                                                            company?.image17,
                                                            company?.image18,
                                                            company?.image19,
                                                            company?.image20,
                                                        ]
                                                            ?.filter((el) => el)
                                                            .map(
                                                                (
                                                                    media,
                                                                    index,
                                                                ) => (
                                                                    <SwiperSlide
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {media &&
                                                                        media?.includes(
                                                                            'mp4',
                                                                        ) ? (
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
                                                                                onError={(
                                                                                    e,
                                                                                ) =>
                                                                                    (e.currentTarget.src =
                                                                                        '/images/no-img.png')
                                                                                }
                                                                                src={`${import.meta.env.VITE_GENERAL_IMAGE}${media}`}
                                                                                alt={
                                                                                    company?.title
                                                                                }
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        )}
                                                                    </SwiperSlide>
                                                                ),
                                                            )}
                                                    </Swiper>
                                                ) : (
                                                    <img
                                                        onError={(e) =>
                                                            (e.currentTarget.src =
                                                                '/images/no-img.png')
                                                        }
                                                        src={`${import.meta.env.VITE_GENERAL_IMAGE}${company?.image1}`}
                                                    ></img>
                                                )
                                            ) : (
                                                <img
                                                    onError={(e) =>
                                                        (e.currentTarget.src =
                                                            '/images/no-img.png')
                                                    }
                                                    src={`${import.meta.env.VITE_GENERAL_IMAGE}${company?.image1}`}
                                                ></img>
                                            )}
                                            {typeof company?.image1 ===
                                                'string' && !media500px ? (
                                                <div className="custom-swiper-nav">
                                                    <button
                                                        className={`button-prev-${company?.id}`}
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
                                                        className={`button-next-${company?.id}`}
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
                                            ) : null}
                                        </div>
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
                                                    window.open(
                                                        company.site,
                                                        '_blank',
                                                    );
                                                }}
                                            >
                                                <a
                                                    href={company.site}
                                                    target={'_blank'}
                                                >
                                                    Перейти на сайт
                                                </a>
                                            </button>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>

                    <div className="companies__grid">
                        {!!otherCompanies.length &&
                            otherCompanies.map((company) => (
                                <Link
                                    to={`/company/${company?.id}`}
                                    key={company?.id}
                                    className="company company--top"
                                >
                                    {/* <div key={company?.id} className="company"> */}
                                    <div className="company__media">
                                        {typeof company?.image === 'string' ? (
                                            <div className="custom-swiper-nav">
                                                <button
                                                    className={`button-prev-${company?.id}`}
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
                                                    className={`button-next-${company?.id}`}
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
                                        ) : null}

                                        {typeof company?.image1 === 'string' ? (
                                            !media500px ? (
                                                <Swiper
                                                    modules={[Navigation]}
                                                    spaceBetween={20}
                                                    slidesPerView={1}
                                                    navigation={{
                                                        prevEl: `.button-prev-${company?.id}`,
                                                        nextEl: `.button-next-${company?.id}`,
                                                    }}
                                                    loop
                                                >
                                                    {[
                                                        company?.image1,
                                                        company?.image2,
                                                        company?.image3,
                                                        company?.image4,
                                                        company?.image5,
                                                        company?.image6,
                                                        company?.image7,
                                                        company?.image8,
                                                        company?.image9,
                                                        company?.image10,
                                                        company?.image11,
                                                        company?.image12,
                                                        company?.image13,
                                                        company?.image14,
                                                        company?.image15,
                                                        company?.image16,
                                                        company?.image17,
                                                        company?.image18,
                                                        company?.image19,
                                                        company?.image20,
                                                    ]
                                                        ?.filter((el) => el)
                                                        .map((media, index) => (
                                                            <SwiperSlide
                                                                key={index}
                                                            >
                                                                {media?.includes(
                                                                    'mp4',
                                                                ) ? (
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
                                                                        onError={(
                                                                            e,
                                                                        ) =>
                                                                            (e.currentTarget.src =
                                                                                '/images/no-img.png')
                                                                        }
                                                                        src={`${import.meta.env.VITE_GENERAL_IMAGE}${media}`}
                                                                        alt={
                                                                            company?.title
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                )}
                                                            </SwiperSlide>
                                                        ))}
                                                </Swiper>
                                            ) : (
                                                <img
                                                    onError={(e) =>
                                                        (e.currentTarget.src =
                                                            '/images/no-img.png')
                                                    }
                                                    src={`https://remontdeco.ru/${company?.image1}`}
                                                ></img>
                                            )
                                        ) : (
                                            <img
                                                onError={(e) =>
                                                    (e.currentTarget.src =
                                                        '/images/no-img.png')
                                                }
                                                src={`https://remontdeco.ru/${company?.image1}`}
                                            ></img>
                                        )}
                                    </div>
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
                                                window.open(
                                                    company?.site,
                                                    '_blank',
                                                );
                                            }}
                                        >
                                            <a href="#">Перейти на сайт</a>
                                        </button>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default CompaniesPage;
