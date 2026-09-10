import React, { useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import './CatalogPage.css';

import { useFetch } from '../../hooks/useFetch.js';
import { API_CATALOG, API_CITY, API_LINK } from '../../constants/api.js';

import { getAdmin } from '../../functions/getAdmin.js';

import { fncSetView } from './fncSetView.js';
import { fncSetDelete } from './fncSetDelete.js';
import { checkCity } from '../../hooks/checkCity.js';
import { useLocation } from '../../hooks/useLocation.js';
import { useFetchCity } from '../../hooks/useFetchCity.js';
import CatalogModal from '../../general-components/CatalogModal/CatalogModal.jsx';

const CatalogPage = () => {
    const locations = checkCity(useLocation());

    // const getCity = (city) => {
    //
    // 	switch(city) {
    //
    // 		case 'msk': return "Москва";
    // 		case 'nn': return "Н.Новгород";
    //
    // 		case 'spb': return "Санкт-Петербург";
    // 		case 'smr': return "Самара";
    // 		case 'oms': return "Омск";
    // 		case 'kzn': return "Казань";
    // 		case 'rst': return "Ростов на Дону";
    // 		case 'vgd': return "Волгоград";
    // 		case 'kry': return "Красноярск";
    // 		case 'ufa': return "Уфа";
    // 		case 'vrn': return "Воронеж";
    // 		case 'prm': return "Пермь";
    //
    // 		default: return "Все";
    // 	}
    // }

    const { data, error, load } = useFetch(API_CATALOG);
    //const { dataInnerBlocks, errorInnerBlocks, loadInnerBlocks } = useFetch(API_INNER_BLOCKS);
    const { dataCity, errorCity, loadCity } = useFetchCity(API_CITY);

    const [showModal, setShowModal] = useState(false);
    const image = `${import.meta.env.VITE_EBV}upload/`;

    //const admin = getAdmin();
    const token = window.sessionStorage.getItem('token');

    const setView = (view) => {
        fncSetView({ view: view });
    };

    const setDelete = (del) => {
        let confirm = window.confirm('Вы уверены, что хотите удалить?');
        if (confirm) fncSetDelete({ del: del });
    };

    return (
        <div className={`CatalogPage ${animate}`}>
            <Container>
                <h1>Администрирование Каталогов</h1>

                <div className={'CatalogPage-Add'}>
                    <button
                        className={'yellow-but small'}
                        onClick={() => setShowModal(true)}
                    >
                        Добавить Каталог
                    </button>
                </div>

                {!token && <b>У Вас нет доступа к данному разделу!</b>}

                {token &&
                    data &&
                    !error &&
                    !load &&
                    Object.values(data) &&
                    Object.values(data).map((elem) => (
                        <div className="CatalogPage-Tr">
                            <div className="CatalogPageTd-N">
                                <br />

                                <b>{elem.title}</b>

                                <br />

                                <b>{elem.name}</b>

                                <br />

                                {elem.text1}

                                <br />

                                {elem.text2}

                                <br />

                                {elem.text3}

                                <br />

                                {elem.sale}

                                <br />
                                <img
                                    className="CatalogPageTd-Image"
                                    src={image + elem.imageCard}
                                />
                                <img
                                    className="CatalogPageTd-Image"
                                    src={image + elem.imageInner}
                                />

                                {dataCity &&
                                    !errorCity &&
                                    !loadCity &&
                                    Object.values(dataCity) &&
                                    Object.values(dataCity).map((elem) => (
                                        <option value={elem.name}>
                                            {elem.title}
                                        </option>
                                    ))}
                                {/*Город: {getCity(elem.city)}*/}

                                <br />

                                <ButtonGroup
                                    hidden={!token}
                                    size={'sm'}
                                    className={'mt-2'}
                                >
                                    <Button
                                        variant={'secondary'}
                                        onClick={() => setView({ elem })}
                                    >
                                        {elem.view == 1 ? 'Скрыть' : 'Показать'}
                                    </Button>

                                    <Button
                                        variant={'danger'}
                                        onClick={() => setDelete({ elem })}
                                    >
                                        Удалить
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    ))}
            </Container>

            <CatalogModal show={showModal} onHide={() => setShowModal(false)} />
        </div>
    );
};

export default CatalogPage;
