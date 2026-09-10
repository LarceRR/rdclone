import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './WeOfferMedia.css';
import './WeOffer.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Loader from '../Loader/Loader';

const WeOffer = ({ scrollToProducts }) => {
    const [mainCategories, setMainCategories] = useState();

    const getCategory = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}category`,
            );
            const filteredCategories = response?.data?.data?.filter(
                (category) => category?.parent_id == 0,
            );
            const sortedCategories = filteredCategories.sort(
                (a, b) => a.posi - b.posi,
            );
            setMainCategories(sortedCategories);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCategory();
    }, []);

    return (
        <div className={'Offer'}>
            <h2>Мы предлагаем</h2>

            {mainCategories ? (
                <div className="offer-cards cards-container">
                    {mainCategories?.map((el) => {
                        const renderPath = `/?title=${el.title}&parentId=${el.id}`;

                        const handleClick = (e) => {
                            scrollToProducts?.current?.scrollIntoView({
                                behavior: 'smooth',
                            });
                        };

                        return (
                            <Card className={`offer-card`} key={el.id}>
                                <Link
                                    to={renderPath}
                                    onClick={handleClick}
                                    style={{ position: 'relative' }}
                                >
                                    <div className={`offer-mask`}>
                                        <Card.Img
                                            className={'card-img'}
                                            variant="top"
                                            onError={(e) =>
                                                (e.currentTarget.src =
                                                    '/images/no-img.png')
                                            }
                                            src={`${import.meta.env.VITE_GENERAL_IMAGE}${el.image}`}
                                        />
                                    </div>
                                    <div className="card-title">
                                        <h6>{el.title}</h6>
                                        <div className="card-icon">
                                            <svg
                                                width="52"
                                                height="53"
                                                viewBox="0 0 52 53"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="1"
                                                    y="1"
                                                    width="50"
                                                    height="50"
                                                    rx="25"
                                                    fill="#3388CC"
                                                />
                                                <path
                                                    opacity="0.962"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M21.4968 36.0128C21.4498 35.6902 21.5091 35.3833 21.6748 35.0919C25.3739 32.2223 29.0595 29.3438 32.7317 26.4566C29.0081 23.5708 25.2712 20.6939 21.5209 17.8257C21.2692 17.442 21.2658 17.0584 21.5106 16.6746C22.0245 16.2964 22.6072 16.2292 23.259 16.4728C27.3458 19.6087 31.4325 22.7445 35.5193 25.8805C35.771 26.2642 35.7744 26.6478 35.5296 27.0316C31.4988 30.1691 27.467 33.3066 23.4369 36.4441C22.6111 36.7506 21.9643 36.6069 21.4968 36.0128Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default WeOffer;
