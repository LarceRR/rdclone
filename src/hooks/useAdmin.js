import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ADMIN, API_LINK } from '../constants/api.js';
import { checkCity } from './checkCity.js';
import { useLocation } from './useLocation.js';

export const useAdmin = (url) => {
    const [dataAdmin, setDataAdmin] = useState(null);
    const [loadAdmin, setLoadAdmin] = useState(false);
    const [errorAdmin, setErrorAdmin] = useState(null);

    const getData = () => {
        setLoadAdmin(true);
        setDataAdmin(null);
        setErrorAdmin(null);

        axios(API_LINK + url)
            .then((res) => {
                if (res.data.result === 'success') {
                    setDataAdmin(res.data.data);
                } else {
                    setErrorAdmin('Ошибка получения информации!');
                    return false;
                }
            })
            .catch(() => setErrorAdmin('Ошибка получения информации!'))
            .finally(() => setLoadAdmin(false));
    };

    useEffect(() => {
        getData();
    }, [url]);

    return {
        dataAdmin,
        loadAdmin,
        errorAdmin,
    };
};
