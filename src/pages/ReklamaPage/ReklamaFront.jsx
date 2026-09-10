import React from 'react';
import { useFetch } from '../../hooks/useFetch.js';
import { API_REKLAMA_MAIN } from '../../constants/api.js';
import { dataMain } from '../../data/dataMain.js';
import { useParams } from 'react-router-dom';
import { useFetchCity } from '../../hooks/useFetchCity.js';

const ReklamaFront = () => {
    const path = useParams();
    const dataM = dataMain.find((elem) => elem.id === path.productId);
    const { data, error, load } = useFetch(API_REKLAMA_MAIN);
    const image = `${import.meta.env.VITE_EBV}/upload/`;
    const cityName = window.localStorage.getItem('city_title');

    return (
        data &&
        !error &&
        !load &&
        Object.values(data) &&
        Object.values(data).map((elem) => (
            <div className="ReklamaPage-Tr">
                <div className="ReklamaPageTd-N">
                    {cityName === elem.city && dataM.id === elem.direction && (
                        <img
                            className="ReklamaPageTd-Image"
                            src={image + elem.image}
                        ></img>
                    )}
                    <br />
                    {cityName === elem.city &&
                        dataM.id === elem.direction &&
                        elem.name_company}
                    <br />
                    {cityName === elem.city &&
                        dataM.id === elem.direction &&
                        elem.phone}
                    <br />
                    {cityName === elem.city &&
                        dataM.id === elem.direction &&
                        elem.city}
                    <br />
                    {cityName === elem.city &&
                        dataM.id === elem.direction &&
                        elem.description}
                </div>
            </div>
        ))
    );
};

export default ReklamaFront;
