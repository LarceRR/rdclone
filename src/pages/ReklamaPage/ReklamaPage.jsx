import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Spinner } from 'react-bootstrap';
import './ReklamaPage.css';

import { useFetch } from '../../hooks/useFetch.js';
import { API_REKLAMA, API_CITY } from '../../constants/api.js';

import ReklamaModal from '../../general-components/ReklamaModal/ReklamaModal.jsx';
import { getAdmin } from '../../functions/getAdmin.js';

import { fncSetView } from './fncSetView.js';
import { fncSetDelete } from './fncSetDelete.js';
import { checkCity } from '../../hooks/checkCity.js';
import { useLocation } from '../../hooks/useLocation.js';
import { useFetchCity } from '../../hooks/useFetchCity.js';
import ReklamaFront from './ReklamaFront.jsx';

const ReklamaPage = () => {
    const locations = checkCity(useLocation());

    const animate = 'animate__animated animate__fadeIn';

    const { data, error, load } = useFetch(API_REKLAMA);
    const { dataCity, errorCity, loadCity } = useFetchCity(API_CITY);

    const [showModal, setShowModal] = useState(false);
    const image = `${import.meta.env.VITE_EBV}/upload/`;

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
        <div className={`ReklamaPage ${animate}`}>
            <Container>
                <h1>Администрирование Реклам</h1>

                <div className={'ReklamaPage-Add'}>
                    <button
                        className={'yellow-but small'}
                        onClick={() => setShowModal(true)}
                    >
                        Добавить Рекламу
                    </button>
                </div>

                {!token && <b>У Вас нет доступа к данному разделу!</b>}

                {token &&
                    data &&
                    !error &&
                    !load &&
                    Object.values(data) &&
                    Object.values(data).map((elem) => (
                        <div className="ReklamaPage-Tr">
                            <div className="ReklamaPageTd-N">
                                <img
                                    className="ReklamaPageTd-Image"
                                    src={image + elem.image}
                                />

                                <br />

                                <b>{elem.direction}</b>

                                <br />

                                {elem.name_company}

                                <br />

                                {elem.phone}

                                <br />
                                {elem.city}

                                <br />
                                {elem.description}

                                <br />

                                {elem.city}

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

            <ReklamaModal show={showModal} onHide={() => setShowModal(false)} />
        </div>
    );
};

export default ReklamaPage;
