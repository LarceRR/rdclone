import React from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import ProductPageInner from '../../components/ProductPageInner/ProductPageInner.jsx';
import ProductSlider from '../../components/ProductPageInner/ProductSlider.jsx';
import { dataMain } from '../../data/dataMain.js';
import { useParams } from 'react-router-dom';
import { useGetAllAdvert } from '../../hooks/useGetAllAdvert.js';
import './ProductPage.css';
import AdvertisingBlock from '../../general-components/AdvertisingBlock/AdvertisingBlock.jsx';
import ReklamaFront from '../ReklamaPage/ReklamaFront.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import { API_REKLAMA } from '../../constants/api.js';

const ProductPage = () => {
    const path = useParams();

    const dataM = dataMain.find((elem) => elem.id === path.productId);
    //const dataAdv = useGetAllAdvert("/" + path.productId);
    const dataAdv = useGetAllAdvert(path.productId); //useGetAllAdvert("/" + path.productId);

    //console.log(13);
    //console.log(dataM);

    const animate = 'animate__animated animate__fadeIn';
    const { data, error, load } = useFetch(API_REKLAMA);
    const view = 1;

    //console.log(1313);
    //console.log(data);

    if (!dataM) {
        return (
            <h4 className={'w-100 text-center my-5 py-5'}>
                Данной страницы не существует. Пожалуйста вернитесь на главную.
            </h4>
        );
    }

    return (
        <div className={`ProductPage ${animate}`}>
            <Container>
                <ProductPageInner data={dataM} />
                {!!(data && Object.values(data).length) && (
                    <div>
                        <h2>Другие компании</h2>
                        <div className={'d-flex flex-column'}>
                            {Object.values(data).map(
                                (block) =>
                                    dataM.id == block.direction && (
                                        <AdvertisingBlock
                                            key={block.id}
                                            data={block}
                                        />
                                    ),
                            )}
                        </div>
                    </div>
                )}
                <ReklamaFront />
            </Container>
        </div>
    );
};

export default ProductPage;
