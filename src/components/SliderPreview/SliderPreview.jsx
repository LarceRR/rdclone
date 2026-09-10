import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './SliderPreview.css';
import './SliderPreviewMedia.css';

import { useFetch } from '../../hooks/useFetch.js';
import { API_BANNER_MAIN } from '../../constants/api.js';

const SliderPreview = () => {
    const { data, error, load } = useFetch(API_BANNER_MAIN);

    const image = 'https://remontdeco.ru/back/upload/';

    return (
        <div className="carousel-container">
            <Carousel>
                {data &&
                    !error &&
                    !load &&
                    Object.values(data) &&
                    Object.values(data).map((elem) => (
                        <Carousel.Item>
                            <a
                                className="carouselHref"
                                target="_blank"
                                href={elem.href}
                            >
                                <div className="carouselDiv">
                                    <div className="carouselDivImage">
                                        <img
                                            className="carouselImage"
                                            src={image + elem.photo}
                                        />
                                    </div>
                                    <div className="carouselDivText">
                                        <font className="carouselTitle">
                                            {elem.title}
                                        </font>
                                        <br />
                                        <font className="carouselText">
                                            {elem.text}
                                        </font>
                                    </div>
                                </div>
                            </a>
                        </Carousel.Item>
                    ))}
            </Carousel>
            <div className="qr-code">
                <img src="/images/qr-code.png" alt="qr-code" />
            </div>
        </div>
    );
};

export default SliderPreview;
