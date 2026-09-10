import React, { useState } from 'react';
import './CatalogModal.css';
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap';
import MessageAlert from '../MessageAlert/MessageAlert.jsx';
import axios from 'axios';

import FileInput from './FileInput.jsx';
import FileInput2 from './FileInput2.jsx';

import { API_LINK, API_CATALOG_ADD } from '../../constants/api.js';

const CatalogModal = ({ show, onHide }) => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [sale, setSale] = useState('');
    const [innerBlocks, setInnerBlocks] = useState('');

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);

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
                API_LINK + API_CATALOG_ADD,
                {
                    title,
                    name,
                    text1,
                    text2,
                    text3,
                    sale,
                    imageCard: file,
                    imageInner: file2,
                },
                options,
            )
            .then((res) => {
                if (res.data.result == 'error') {
                    setAnswer(res.data.data.error);
                    setError(true);
                    setLoad(false);
                } else {
                    setAnswer('Реклама добавлена!');
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
            className={'CatalogModal'}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый рекламу
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="ModalForm" onSubmit={handleSend}>
                    <FormControl
                        required={true}
                        placeholder={'*Заголовок'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <FormControl
                        required={true}
                        placeholder={'*Имя'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <FormControl
                        required={true}
                        placeholder={'*Описание'}
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                    />

                    <FormControl
                        required={true}
                        placeholder={'*Описание'}
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                    />
                    <FormControl
                        required={true}
                        placeholder={'*Описание'}
                        value={text3}
                        onChange={(e) => setText3(e.target.value)}
                    />
                    <FormControl
                        required={true}
                        placeholder={'*Скидка в цифрах'}
                        value={sale}
                        onChange={(e) => setSale(e.target.value)}
                    />

                    <div className={'d-flex justify-content-between'}>
                        <FileInput
                            value={file}
                            onChange={(value) => setFile(value[0])}
                        />
                        <FileInput2
                            value={file2}
                            onChange={(value) => setFile2(value[0])}
                        />

                        <Button
                            className={'yellow-but'}
                            disabled={!file && !file2}
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

export default CatalogModal;
