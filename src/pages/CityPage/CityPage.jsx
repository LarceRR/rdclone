import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Spinner } from 'react-bootstrap';
import './CityPage.css';

import { useFetch } from '../../hooks/useFetch.js';
import { API_CITY } from '../../constants/api.js';

import { getAdmin } from '../../functions/getAdmin.js';

import { fncSetView } from './fncSetView.js';
import { fncSetDelete } from './fncSetDelete.js';
import { checkCity } from '../../hooks/checkCity.js';
import { useLocation } from '../../hooks/useLocation.js';
import CityModal from '../../general-components/CityModal/CityModal.jsx';

const CityPage = () => {
    const locations = checkCity(useLocation());

    const animate = 'animate__animated animate__fadeIn';

    const { data, error, load } = useFetch(API_CITY);

    const [showModal, setShowModal] = useState(false);

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
        <div className={`CityPage ${animate}`}>
            <Container>
                <h1>Администрирование Гордов</h1>

                <div className={'CityPage-Add'}>
                    <button
                        className={'yellow-but small'}
                        onClick={() => setShowModal(true)}
                    >
                        Добавить город
                    </button>
                </div>

                {!token && <b>У Вас нет доступа к данному разделу!</b>}

                {token &&
                    data &&
                    !error &&
                    !load &&
                    Object.values(data) &&
                    Object.values(data).map((elem) => (
                        <div className="CityPage-Tr">
                            <div className="CityPageTd-N">
                                Город: {elem.title}
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

            <CityModal show={showModal} onHide={() => setShowModal(false)} />
        </div>
    );
};

export default CityPage;
