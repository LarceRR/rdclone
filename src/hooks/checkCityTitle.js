import { API_LINK, API_CITY_GET_TITLE_BY_NAME } from '../constants/api.js';
import axios from 'axios';

export const checkCityTitle = (locations) => {
    if (!locations) {
        return false;
    }
    if (locations) {
        const options = { headers: { 'Content-type': `multipart/form-data` } };
        axios
            .post(
                API_LINK + API_CITY_GET_TITLE_BY_NAME,
                {
                    name: locations,
                },
                options,
            )
            .then((res) => {
                window.localStorage.setItem('city_title', res.data.data.title);
            });
    }
};
