import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './InterestingServices.css';
import './InterestingServicesMedia.css';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const InterestingServices = ({ categories }) => {
    return (
        <section className="interesting-section">
            <h2 className="section-title">Может быть интересно</h2>
            <div className="services-grid">
                {categories.map((service) => (
                    <Card className={`ProductCard sale`}>
                        <Link
                            to={`/category/${service.id}?service=${service.title || ''}`}
                            style={{ position: 'relative' }}
                        >
                            <Card.Img
                                className={'card-img'}
                                variant="top"
                                onError={(e) =>
                                    (e.currentTarget.src = '/images/no-img.png')
                                }
                                src={`${import.meta.env.VITE_GENERAL_IMAGE}${service?.image}`}
                            />
                            <div className="card-title">
                                <h6>{service.title}</h6>
                            </div>
                            <div className="card-icon">
                                <svg
                                    width="50"
                                    height="50"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="0.791504"
                                        y="0.933594"
                                        width="50.002"
                                        height="50.8384"
                                        rx="25.001"
                                        fill="#418FE2"
                                    />
                                    <g clip-path="url(#clip0_54_64)">
                                        <path
                                            opacity="0.971"
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M22.0395 15.8973C22.2965 15.6028 22.6159 15.4237 22.9976 15.3601C27.2502 15.4875 31.503 15.6149 35.7556 15.7423C36.3928 15.9011 36.7716 16.3038 36.8918 16.9501C36.7764 21.2808 36.6331 25.6084 36.462 29.9328C36.0492 30.8176 35.3999 31.0637 34.514 30.6709C34.2028 30.4446 34.0024 30.1451 33.9129 29.7726C34.0084 26.5754 34.104 23.3784 34.1995 20.1812C28.7721 25.2728 23.3447 30.3642 17.9173 35.4557C17.0607 35.8892 16.4112 35.6742 15.9688 34.8104C15.8147 34.3714 15.8825 33.9682 16.1725 33.6008C21.5728 28.4806 26.9731 23.3603 32.3735 18.2401C29.2084 18.1453 26.0432 18.0504 22.8782 17.9556C21.861 17.563 21.5815 16.8769 22.0395 15.8973Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_54_64">
                                            <rect
                                                width="30.3198"
                                                height="30.3221"
                                                fill="white"
                                                transform="matrix(0.727498 -0.68611 0.685174 0.728379 5.01807 25.0703)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </Link>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default InterestingServices;
