import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './ServiceInfo.css';
import './ServicesInfoMedia.css';
import CompaniesListOptimized from './CompaniesList/CompaniesListOptimized';
import InterestingServices from './InterestingServices/InterestingServices';
import { useMediaQuery } from 'react-responsive';

const MEDIA_KEYS = Array.from({ length: 20 }, (_, index) => `image${index + 1}`);
const isVideo = (media) => /\.mp4(?:$|[?#])/i.test(media || '');
const getMedia = (item) =>
    MEDIA_KEYS.map((key) => item?.[key]).filter(
        (media) => typeof media === 'string' && media.trim(),
    );
const fallbackImage = '/images/no-img.png';

const MediaGallery = ({ item, mobile }) => {
    const media = useMemo(() => getMedia(item), [item]);
    const [activeIndex, setActiveIndex] = useState(0);
    const baseUrl = import.meta.env.VITE_GENERAL_IMAGE;

    if (!media.length) return <img src={fallbackImage} alt={item?.title || ''} />;

    const poster = media.find((value) => !isVideo(value));

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={!mobile}
            loop={media.length > 1}
            preloadImages={false}
            watchSlidesProgress
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
            {media.map((source, index) => {
                const video = isVideo(source);
                const active = index === activeIndex;

                return (
                    <SwiperSlide key={`${source}-${index}`}>
                        {video ? (
                            <video
                                controls
                                muted
                                playsInline
                                preload={active ? 'metadata' : 'none'}
                                poster={poster ? `${baseUrl}${poster}` : undefined}
                                className="w-full h-full object-cover"
                                src={active ? `${baseUrl}${source}` : undefined}
                            />
                        ) : (
                            <img
                                loading={index === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                                src={`${baseUrl}${source}`}
                                alt={item?.title || ''}
                                onError={(event) => {
                                    if (!event.currentTarget.src.endsWith(fallbackImage)) {
                                        event.currentTarget.src = fallbackImage;
                                    }
                                }}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

const ServiceInfoOptimized = ({ selectedItem, categories, otherCompanies }) => {
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
                        <p className="service-main-right-subtitle">{selectedItem?.title}</p>
                        <div className="service-main-right-group">
                            <p className={isOpened ? 'service-main-right-desc-full' : 'service-main-right-desc'}>
                                {selectedItem?.description}
                            </p>
                            <button
                                type="button"
                                aria-label="Показать описание"
                                onClick={() => setIsOpened((value) => !value)}
                                style={{
                                    transform: `rotate(${isOpened ? 180 : 0}deg)`,
                                    background: 'none',
                                    border: 0,
                                }}
                            >
                                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                                    <path d="M0.8 0.8L8 8.2L15.2 0.8" stroke="#418FE2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="service-main-block">
                            <a className="service-phone" href={`tel:${selectedItem?.phone}`}><p>{selectedItem?.phone}</p></a>
                            <a className="service-phone" href={`mailto:${selectedItem?.email}`}><p>{selectedItem?.email}</p></a>
                            <a className="service-link" href={selectedItem?.site}><p>Перейти на сайт</p></a>
                        </div>
                    </div>
                    <div className="service-main-left">
                        <MediaGallery item={selectedItem} mobile={media500px} />
                    </div>
                </div>
                <div className="service-home">
                    <button onClick={() => navigate('/')}>Вернуться на главную</button>
                </div>
            </div>
            <CompaniesListOptimized companies={otherCompanies} />
            <InterestingServices categories={categories} />
        </div>
    );
};

export default ServiceInfoOptimized;
