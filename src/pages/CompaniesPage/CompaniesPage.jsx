import React, { useEffect, useMemo, useState } from 'react';
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

const MEDIA_KEYS = Array.from({ length: 20 }, (_, index) => `image${index + 1}`);

const getMediaList = (company) =>
    MEDIA_KEYS.map((key) => company?.[key]).filter(
        (media) => typeof media === 'string' && media.trim(),
    );

const isVideo = (media) => /\.mp4(?:$|[?#])/i.test(media || '');

const MediaImage = ({ media, title }) => (
    <img
        loading="lazy"
        decoding="async"
        onError={(e) => {
            if (e.currentTarget.src.endsWith('/images/no-img.png')) return;
            e.currentTarget.src = '/images/no-img.png';
        }}
        src={`${import.meta.env.VITE_GENERAL_IMAGE}${media}`}
        alt={title || ''}
        className="w-full h-full object-cover"
    />
);

const MediaVideo = ({ media }) => (
    <video
        controls
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        src={`${import.meta.env.VITE_GENERAL_IMAGE}${media}`}
    />
);

const CompanyMedia = ({ company, mobile }) => {
    const mediaList = useMemo(() => getMediaList(company), [company]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0);
    }, [company?.id]);

    if (!mediaList.length) {
        return <MediaImage media="/images/no-img.png" title={company?.title} />;
    }

    // On mobile keep only the first card media mounted. If it is a video,
    // show the video without autoplay and load only its metadata.
    if (mobile) {
        const firstMedia = mediaList[0];
        return isVideo(firstMedia) ? (
            <MediaVideo media={firstMedia} />
        ) : (
            <MediaImage media={firstMedia} title={company?.title} />
        );
    }

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
                prevEl: `.button-prev-${company?.id}`,
                nextEl: `.button-next-${company?.id}`,
            }}
            loop={mediaList.length > 1}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
            {mediaList.map((media, index) => (
                <SwiperSlide key={`${company?.id}-${media}-${index}`}>
                    {isVideo(media) ? (
                        <MediaVideo media={media} />
                    ) : (
                        <MediaImage media={media} title={company?.title} />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const SwiperNavigation = ({ companyId, mobile }) => (
    <div className="custom-swiper-nav">
        {!mobile && (
            <>
                <button className={`button-prev-${companyId}`} aria-label="Предыдущее фото">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8334 10.0552H4.16669M4.16669 10.0552L10 15.8885M4.16669 10.0552L10 4.22186" stroke="#3388CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className={`button-next-${companyId}`} aria-label="Следующее фото">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.16669 10.0552H15.8334M15.8334 10.0552L10 4.22186M15.8334 10.0552L10 15.8885" stroke="#3388CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </>
        )}
    </div>
);

const CompanyCard = ({ company, top, mobile }) => (
    <Link to={`/company/${company?.id}`} className={`company ${top ? 'company--top' : ''}`}>
        <div className="company__media">
            {top && <div className="company__badge">Рекомендуем</div>}
            <SwiperNavigation companyId={company?.id} mobile={mobile} />
            <CompanyMedia company={company} mobile={mobile} />
        </div>

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
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(company?.site, '_blank', 'noopener,noreferrer');
                }}
            >
                Перейти на сайт
            </button>
        </div>
    </Link>
);

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
            const response = await axios.get(`${import.meta.env.VITE_API}company`);
            const filteredCompany = response?.data?.data?.filter(
                (company) => company.category_id == categoryId,
            );
            const sortedCompany = (filteredCompany || []).sort(
                (a, b) => a.posi - b.posi,
            );
            setDataCategory(sortedCompany);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (categoryId) getCompanyList();
    }, [categoryId]);

    const sortedCompanies = useMemo(
        () => [...dataCategory].sort((a, b) => b?.rating - a?.rating),
        [dataCategory],
    );
    const topCompanies = sortedCompanies.slice(0, 3);
    const otherCompanies = sortedCompanies.slice(3);

    if (!dataCategory.length) return <Loader />;

    return (
        <Container>
            <div className="companies">
                <h2>Компании, занимающиеся: {categoryName}</h2>

                {!!topCompanies.length && (
                    <div className="companies__top">
                        {topCompanies.map((company) => (
                            <CompanyCard
                                key={company?.id}
                                company={company}
                                top
                                mobile={media500px}
                            />
                        ))}
                    </div>
                )}

                {!!otherCompanies.length && (
                    <div className="companies__grid">
                        {otherCompanies.map((company) => (
                            <CompanyCard
                                key={company?.id}
                                company={company}
                                mobile={media500px}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default CompaniesPage;
