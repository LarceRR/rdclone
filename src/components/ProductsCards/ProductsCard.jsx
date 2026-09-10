import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { getAdmin } from '../../functions/getAdmin.js';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductCard = ({ data, isServiceCategory }) => {
    //const admin = getAdmin();
    const token = window.sessionStorage.getItem('token');
    const { pathname } = useLocation();

    const isInService = pathname.includes('service');

    return (
        <Card
            className={`ProductCard ${data?.sale ? 'sale' : ''} ${isInService ? 'serviceCard' : ''} ${isServiceCategory ? 'service-category' : ''} ${isServiceCategory && data?.title === 'Укладка плитки' ? 'featured-service-category' : ''}`}
        >
            <Link
                to={`/category/${data?.id}?service=${data?.title}`}
                style={{ position: 'relative' }}
            >
                <Card.Img
                    className={'card-img'}
                    variant="top"
                    onError={(e) =>
                        (e.currentTarget.src = '/images/no-img.png')
                    }
                    src={`${import.meta.env.VITE_GENERAL_IMAGE}${data.image}`}
                />
                <div className="card-title">
                    <h6>{data?.title}</h6>
                </div>
                <div className="card-icon">
                    <img src="/images/product-arrow.svg" alt="" />
                </div>
            </Link>
        </Card>
    );
};

export default ProductCard;
