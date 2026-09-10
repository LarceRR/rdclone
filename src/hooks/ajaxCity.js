import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_CITY_GETNAMEBYINDEX } from '../constants/api.js';

export const ajaxCity = (index) => {
    const [dataCity, setData] = useState(null);
    const [loadCity, setLoad] = useState(false);
    const [errorCity, setError] = useState(null);

    const getData = () => {
        setLoad(true);
        setData(null);
        setError(null);

        axios(API_CITY_GETNAMEBYINDEX + index)
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
    }, [index]);

    return {
        dataCity,
        loadCity,
        errorCity,
    };
};
