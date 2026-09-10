import React from 'react';
import './Contacts.css';
import './ContactsMedia.css';
import { useLocation } from '../../hooks/useLocation.js';
import { checkCity } from '../../hooks/checkCity.js';
import { getTelephone } from '../../hooks/getTelephone.js';
import { Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

const Contacts = () => {
    const location = useLocation();

    const telephone = getTelephone(window.localStorage.getItem('local_city'));

    return (
        <div className={'Contacts'}>
            <a name="contacts"></a>
            <h2>Контакты:</h2>
            <div className={'block'}>
                <img src="/images/city.svg" alt="city-bg" />

                <div className="inner">
                    <h3>remontdeco@yandex.ru</h3>
                    <p className="small m-0">Ответим вам в течение 24 часов.</p>
                </div>

                <div className="inner">
                    <h3>{telephone}</h3>
                    <p className="small m-0">Вы всегда можете позвонить нам.</p>
                </div>

                <div className="inner">
                    <h3>
                        {checkCity(location) === 'msk' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'nn' &&
                            'Н. Новгород, ул.Советская, д.34, стр.1'}

                        {checkCity(location) === 'spb' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'smr' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'oms' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'kzn' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'rst' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'vgd' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'kry' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'ufa' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'vrn' &&
                            'Адрес уточняйте по телефону'}
                        {checkCity(location) === 'prm' &&
                            'Адрес уточняйте по телефону'}

                        {!checkCity(location) && 'Адрес уточняйте по телефону'}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
