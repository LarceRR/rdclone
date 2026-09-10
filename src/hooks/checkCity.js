import { API_LINK, API_CITY_GET_NAME_BY_INDEX } from '../constants/api.js';
import axios from 'axios';

export const checkCity = (index) => {
    if (!index) {
        return false;
    }
    if (index) {
        const options = { headers: { 'Content-type': `multipart/form-data` } };
        axios
            .post(
                API_LINK + API_CITY_GET_NAME_BY_INDEX,
                {
                    numbers: index,
                },
                options,
            )
            .then((res) => {
                window.localStorage.setItem('local_city', res.data.data.name);
                window.localStorage.setItem('city_title', res.data.data.title);
            });
    }
};
