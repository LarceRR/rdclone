import React, { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css';
import 'swiper/css/navigation';

const MEDIA_KEYS = ['image1', 'image2', 'image3', 'image4', 'image5'];
const isVideo = (media) => /\.mp4(?:$|[?#])/i.test(media || '');

const CompanyItemOptimized = ({ company }) => {
    const mobile = useMediaQuery({ query: '(max-width: 510px)' });
    const [activeIndex, setActiveIndex] = useState(0);
    const media = useMemo(
        () => MEDIA_KEYS.map((key) => company?.[key]).filter((value) => typeof value === 'string' && value.trim()),
        [company],
    );
    const baseUrl = import.meta.env.VITE_GENERAL_IMAGE;
    const poster = media.find((value) => !isVideo(value));

    if (!media.length) return null;

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
                                src={active ? `${baseUrl}${source}` : undefined}
                            />
                        ) : (
                            <img
                                loading={index === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                                src={`${baseUrl}${source}`}
                                alt={company?.title || ''}
                                onError={(event) => {
                                    if (!event.currentTarget.src.endsWith('/images/no-img.png')) {
                                        event.currentTarget.src = '/images/no-img.png';
                                    }
                                }}
                            />
                        )}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default CompanyItemOptimized;
