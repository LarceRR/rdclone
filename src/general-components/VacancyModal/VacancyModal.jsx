import React, { useState } from 'react';
import './VacancyModal.css';
import {
    Button,
    Form,
    FormControl,
    Modal,
    NavDropdown,
    Spinner,
} from 'react-bootstrap';
import { dataMain } from '../../data/dataMain.js';
import { getDate } from '../../functions/getDate.js';
import MessageAlert from '../MessageAlert/MessageAlert.jsx';
import axios from 'axios';

import FileInput from './FileInput.jsx';

import {
    API_LINK,
    API_PROFESSION_MAIN,
    API_CITY_MAIN,
} from '../../constants/api.js';
import { API_ADD_1 } from '../../constants/api.js';
import { checkCity } from '../../hooks/checkCity.js';
import { useLocation } from '../../hooks/useLocation.js';
import { useFetch } from '../../hooks/useFetch.js';
import { useFetchCity } from '../../hooks/useFetchCity.js';

const VacancyModal = ({ show, onHide }) => {
    const locations = checkCity(useLocation());

    const [city, setCity] = useState(locations);
    const [name, setName] = useState('');
    const [spec, setSpec] = useState('');
    const [col, setCol] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneOn, setPhoneOn] = useState(0);
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const { data, error, load } = useFetch(API_PROFESSION_MAIN);
    const { dataCity, errorCity, loadCity } = useFetchCity(API_CITY_MAIN);

    const [error1, setError] = useState(false);
    const [load1, setLoad] = useState(false);
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
                API_LINK + API_ADD_1,
                {
                    city,
                    name,
                    spec,
                    col,
                    text,
                    email,
                    phone,
                    phoneOn,
                    photo: file,
                },
                options,
            )
            .then((res) => {
                if (res.data.result == 'error') {
                    setAnswer(res.data.data.error);
                    setError(true);
                    setLoad(false);
                } else {
                    setAnswer(
                        'Вакансия создана! После проверки модератором, она будет опубликована!',
                    );
                    setSuccess(true);
                    setError(null);
                    document.getElementById('ModalForm').style.display = 'none';
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
            className={'VacancyModal'}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новую вакансию
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                >
                    <option value="all">- во всех -</option>
                    {dataCity &&
                        !errorCity &&
                        !loadCity &&
                        Object.values(dataCity) &&
                        Object.values(dataCity).map((elem) => (
                            <option value={elem.name}>{elem.title}</option>
                        ))}
                </Form.Select>

                <Form id="ModalForm" onSubmit={handleSend}>
                    <FormControl
                        required={true}
                        placeholder={'*Название компании'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Form.Select
                        value={spec}
                        onChange={(e) => setSpec(e.target.value)}
                    >
                        {data &&
                            !error &&
                            !load &&
                            Object.values(data) &&
                            Object.values(data).map((elem) => (
                                <option value={elem.id}>{elem.title}</option>
                            ))}
                    </Form.Select>

                    <FormControl
                        required={true}
                        placeholder={'*Количество человек'}
                        value={col}
                        onChange={(e) => setCol(e.target.value)}
                    />

                    <FormControl
                        required={true}
                        as={'textarea'}
                        placeholder={'*Описание вакансии'}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <FormControl
                        required={true}
                        placeholder={'*E-mail для связи'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <FormControl
                        required={true}
                        placeholder={'*Телефон для связи'}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Form.Select
                        value={phoneOn}
                        onChange={(e) => setPhoneOn(e.target.value)}
                    >
                        <option value="0">Скрывать мой телефон</option>
                        <option value="1">Показывать мой телефон</option>
                    </Form.Select>

                    <div className={'d-flex justify-content-between'}>
                        <FileInput
                            value={file}
                            onChange={(value) => setFile(value[0])}
                        />

                        <Button
                            className={'yellow-but'}
                            disabled={!file}
                            type={'submit'}
                        >
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

export default VacancyModal;
