import React, { useState } from 'react';
import './CityModal.css';
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap';
import { dataMain } from '../../data/dataMain.js';
import { getDate } from '../../functions/getDate.js';
import MessageAlert from '../MessageAlert/MessageAlert.jsx';
import axios from 'axios';

import FileInput from './FileInput.jsx';

import { API_LINK } from '../../constants/api.js';
import { API_CITY_ADD } from '../../constants/api.js';
import { checkCity } from '../../hooks/checkCity.js';
import { useLocation } from '../../hooks/useLocation.js';

const CityModal = ({ show, onHide }) => {
    const locations = checkCity(useLocation());
    const [city, setCity] = useState('');
    //const [city, setCity] = useState(locations);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [index_start, setIndexStart] = useState('');
    const [index_end, setIndexEnd] = useState('');
    const [index_dop1, setIndexDop1] = useState('');
    const [index_dop2, setIndexDop2] = useState('');
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const [success, setSuccess] = useState(false);

    const [answer, setAnswer] = useState(false);

    const handleSend = (e) => {
        e.preventDefault();

        setLoad(true);

        const date = Date.now();

        const options = {
            headers: {
                'Content-type': `multipart/form-data`,
            },
        };

        axios
            .post(
                API_LINK + API_CITY_ADD,
                {
                    title,
                    name,
                    index_start,
                    index_end,
                    index_dop1,
                    index_dop2,
                },
                options,
            )
            .then((res) => {
                if (res.data.result == 'error') {
                    setAnswer(res.data.data.error);
                    setError(true);
                    setLoad(false);
                } else {
                    setAnswer('Город добавлен!');
                    setSuccess(true);
                    setError(null);
                    document.getElementById('ModalForm').style.display = 'none';
                    location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                //setLoad(false)
                //setFile(null)
            });
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={'CityModal'}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый город
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="ModalForm" onSubmit={handleSend}>
                    {/*<FormControl*/}
                    {/*	required={true}*/}
                    {/*	placeholder={"*Название Города"}*/}
                    {/*	value={city}*/}
                    {/*	onChange={e => setCity(e.target.value)}*/}
                    {/*/>*/}
                    <FormControl
                        required={true}
                        placeholder={'*Название Города'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormControl
                        required={true}
                        placeholder={'*Индекс Города'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormControl
                        required={true}
                        placeholder={'*Начальный индекс Города'}
                        value={index_start}
                        onChange={(e) => setIndexStart(e.target.value)}
                    />
                    <FormControl
                        required={true}
                        placeholder={'*Конечный индекс Города'}
                        value={index_end}
                        onChange={(e) => setIndexEnd(e.target.value)}
                    />
                    <FormControl
                        required={true}
                        placeholder={'*Дополнительный индекс города 1'}
                        value={index_dop1}
                        onChange={(e) => setIndexDop1(e.target.value)}
                    />
                    <FormControl
                        required={true}
                        placeholder={'*Дополнительный индекс города 2'}
                        value={index_dop2}
                        onChange={(e) => setIndexDop2(e.target.value)}
                    />

                    <div className={'d-flex justify-content-between'}>
                        <Button className={'yellow-but'} type={'submit'}>
                            {load ? (
                                <Spinner size={'sm'} variant={'warning'} />
                            ) : (
                                'Отправить'
                            )}
                        </Button>
                    </div>
                </Form>

                {error && <MessageAlert variant={'danger'} text={answer} />}
                {success && <MessageAlert variant={'success'} text={answer} />}
            </Modal.Body>
        </Modal>
    );
};

export default CityModal;
