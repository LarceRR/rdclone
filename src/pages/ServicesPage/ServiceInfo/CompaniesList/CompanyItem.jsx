import 'swiper/css';
import 'swiper/css/navigation';

import './CompaniesList.css';
import './CompaniesListMedia.css';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import { Navigation } from 'swiper/modules';

const CompanyItem = ({ company }) => {
    const media500px = useMediaQuery({ query: '(max-width: 510px)' });
    return (
        <div className="company-card">
            <div>
                {company &&
                    (typeof company?.image === 'object' ? (
                        <>
                            {!media500px && (
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
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
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
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}

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
                                    company.image1,
                                    company.image2,
                                    company.image3,
                                    company.image4,
                                    company.image5,
                                ]?.map((media, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            {media?.includes('mp4') ? (
                                                <video
                                                    src={`${import.meta.env.VITE_GENERAL_IMAGE}${media}`}
                                                    controls
                                                    autoPlay
                                                    muted
                                                    loop
                                                />
                                            ) : (
                                                <img
                                                    onError={(e) =>
                                                        (e.currentTarget.src =
                                                            '/images/no-img.png')
                                                    }
                                                    src={`${import.meta.env.VITE_GENERAL_IMAGE}${media}`}
                                                    alt={company?.title}
                                                />
                                            )}
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </>
                    ) : (
                        <img
                            onError={(e) =>
                                (e.currentTarget.src = '/images/no-img.png')
                            }
                            src={`${import.meta.env.VITE_GENERAL_IMAGE}${company?.image1}`}
                            alt={company?.title}
                        />
                    ))}
            </div>
        </div>
    );
};

export default CompanyItem;
