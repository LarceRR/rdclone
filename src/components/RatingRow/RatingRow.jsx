import React from 'react';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useResize } from '../../hooks/useRisize.js';
import RangeProduct from '../ProductPageInner/RangeProduct.jsx';

const RatingRow = () => {
    const screenWidth = useResize();

    return (
        <div>
            <div className="row">
                <div className="contacts">
                    <a href="tel:+79800258047" className="phoneSlider">
                        <button className={'yellow-but phoneSlider'}>
                            {screenWidth > 992 ? (
                                'Позвонить'
                            ) : (
                                <img
                                    className="phoneSvg"
                                    width="30"
                                    src="/images/phone.svg"
                                />
                            )}
                        </button>
                    </a>
                    <a href="#" className="site">
                        <button className={'yellow-but site'}>
                            {screenWidth > 992 ? (
                                'Сайт'
                            ) : (
                                <img
                                    className="websiteSvg"
                                    width="35"
                                    src="/images/website.svg"
                                />
                            )}
                        </button>
                    </a>
                </div>
                <div className="ratingBtn">
                    <button className="btnLike">
                        <FontAwesomeIcon icon={faThumbsUp} className="like" />
                    </button>
                    <RangeProduct />
                    <button className="btnDislike">
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="dislike"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingRow;
