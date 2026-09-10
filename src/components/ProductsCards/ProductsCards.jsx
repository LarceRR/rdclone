import React from 'react';
import './ProductsCards.css';
import ProductCard from './ProductsCard.jsx';
import './ProductCardsMedia.css';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';

const ProductsCards = () => {
    const { search } = useLocation();

    const searchParams = new URLSearchParams(search);

    const selectedId = searchParams.get('parentId') || '';
    const categoryName = decodeURIComponent(searchParams.get('title') || '');
    const isServiceCategory = categoryName === 'Услуги';

    const [categories, setCategories] = useState();

    const getCategory = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}category`,
            );
            const filteredCategories = response.data.data.filter((category) => {
                if (selectedId) {
                    return category?.parent_id == selectedId;
                }
                return category?.parent_id == 26;
            });
            const sortedCategories = filteredCategories.sort(
                (a, b) => a.posi - b.posi,
            );
            setCategories(sortedCategories);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategory();
    }, [search]);

    if (!categories) return null;

    return (
        <div className={'ProductsCards'}>
            <h2>{categoryName}</h2>
            {categories ? (
                <div className="products-container">
                    <div className="cards-container">
                        {categories
                            ?.sort((a, b) => {
                                if (isServiceCategory) {
                                    const isFeatured =
                                        a.title === 'Укладка плитки';
                                    const isOtherFeatured =
                                        b.title === 'Укладка плитки';

                                    if (isFeatured !== isOtherFeatured) {
                                        return isFeatured ? -1 : 1;
                                    }
                                }

                                return a.posi - b.posi;
                            })
                            .map((elem) => {
                                return <ProductCard
                                    key={elem.id}
                                    data={elem}
                                    isServiceCategory={isServiceCategory}
                                />;
                            })}
                    </div>
                </div>
            ) : (
                <Loader />
            )}

            {/* <a name="products"></a> */}
        </div>
    );
};

export default ProductsCards;
