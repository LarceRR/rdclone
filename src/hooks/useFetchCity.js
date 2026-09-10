import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_LINK } from '../constants/api.js';
import { checkCity } from './checkCity.js';
import { useLocation } from './useLocation.js';

export const useFetchCity = (url) => {
    const [dataCity, setData] = useState(null);
    const [loadCity, setLoad] = useState(false);
    const [errorCity, setError] = useState(null);

    const getData = () => {
        setLoad(true);
        setData(null);
        setError(null);

        axios(API_LINK + url)
            .then((res) => {
                if (res.data.result === 'success') {
                    setData(res.data.data);
                } else {
                    setError('Ошибка получения информации!');
                    return false;
                }
            })
            .catch(() => setError('Ошибка получения информации!'))
            .finally(() => setLoad(false));
    };

    useEffect(() => {
        getData();
    }, [url]);

    return {
        dataCity,
        loadCity,
        errorCity,
    };
};
