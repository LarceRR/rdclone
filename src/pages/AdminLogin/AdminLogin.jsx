import React, { useState } from 'react';
import './AdminLogin.css';
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

import { API_CITY, API_LINK, API_USERS } from '../../constants/api.js';
import { checkCity } from '../../hooks/checkCity.js';
import { useLocation } from '../../hooks/useLocation.js';
import { useFetchCity } from '../../hooks/useFetchCity.js';
import FileInput from '../../general-components/BannerModal/FileInput.jsx';
import MessageAlert from '../../general-components/MessageAlert/MessageAlert.jsx';
const AdminLogin = ({ show, onHide }) => {
    const locations = checkCity(useLocation());

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const [error, setError] = useState(false);
    const [answer, setAnswer] = useState(false);
    const [load, setLoad] = useState(false);
    const [success, setSuccess] = useState(false);

    const { dataCity, errorCity, loadCity } = useFetchCity(API_CITY);
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
                API_LINK + API_USERS,
                {
                    login,
                    password,
                },
                options,
            )

            .then((res) => {
                window.sessionStorage.setItem('admin', 'false');
                if (res.data.result == 'success') {
                    window.sessionStorage.setItem('token', 'true');
                    window.location = '/';
                } else {
                    setError(true);
                    setLoad(false);
                    setAnswer('Такого пользователя не существует!');
                    window.sessionStorage.setItem('token', '');
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
        <div className={'AdminLogin'}>
            <Form onSubmit={handleSend}>
                <FormControl
                    required
                    placeholder={'Логин'}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />

                <FormControl
                    required
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <MessageAlert variant={'danger'} text={answer} />}
                {/*{error && <Alert variant={"danger"} className={"my-2 p-2 text-center"}>{error}</Alert>}*/}

                <Button size={'sm'} type={'submit'} className={'w-100'}>
                    Войти
                </Button>
            </Form>
        </div>
    );
};

export default AdminLogin;

//import React, {useState} from 'react';
// import "./AdminLogin.css";
// import {Alert, Button, Form, FormControl, Spinner} from "react-bootstrap";
// import {useGetAdmin} from "../../hooks/useGetAdmin.js";
// import {useNavigate} from "react-router-dom";
//
// const AdminLogin = () => {
//
// 	const navigate = useNavigate();
// 	const data = useGetAdmin();
// 	const [formData, setFormData] = useState({
// 		login: '',
// 		password: '',
// 	});
// 	const [error, setError] = useState('');
//
// 	const handleSend = e => {
// 		e.preventDefault();
// 		if (formData.login !== data.login  || formData.password !== data.password) {
// 			setError('Неверные данные!')
// 			return false;
// 		}
// 		window.sessionStorage.setItem('admin', 'true');
// 		navigate("/banner");
// 	}
//
// 	if (!data) return (
// 		<div className={"AdminLogin"}>
// 			<Spinner />
// 		</div>
// 	);
//
// 	return (
// 		<div className={"AdminLogin"}>
// 			<Form onSubmit={handleSend}>
// 				<FormControl
// 					required
// 					placeholder={"Логин"}
// 					value={formData.login}
// 					onChange={e => setFormData({...formData, login: e.target.value})}
// 				/>
//
// 				<FormControl
// 					required
// 					type={"password"}
// 					placeholder={"Пароль"}
// 					onChange={e => setFormData({...formData, password: e.target.value})}
// 				/>
//
// 				{error && <Alert variant={"danger"} className={"my-2 p-2 text-center"}>{error}</Alert>}
//
// 				<Button size={"sm"} type={"submit"} className={"w-100"}>
// 					Войти
// 				</Button>
// 			</Form>
// 		</div>
// 	);
// };
//
// export default AdminLogin;
