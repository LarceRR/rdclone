// src/components/RegisterModal/RegisterModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import './RegisterModal.css';

const LABELS_CONTROLS = {
    phone: 'Телефон',
    email: 'E-Mail',
    name: 'Имя',
    surname: 'Фамилия',
    password: 'Пароль',
    password_confirmation: 'Подтверждение пароля'
};

const INITIAL_DATA = {
    phone: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    password_confirmation: ''
};

const INITIAL_ERRORS = {
    phone: false,
    email: false,
    name: false,
    surname: false,
    password: false,
    password_confirmation: false,
    submit: false
};

const RegisterModal = ({ show, onHide, onLoginClick }) => {
    const [data, setData] = useState(INITIAL_DATA);
    const [errors, setErrors] = useState(INITIAL_ERRORS);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    // Очистка формы при открытии/закрытии
    useEffect(() => {
        if (!show) {
            setData(INITIAL_DATA);
            setErrors(INITIAL_ERRORS);
            setSuccess(false);
        }
    }, [show]);
    
    const validate = () => {
        const newErrors = { ...INITIAL_ERRORS };
        let isValid = true;
        
        // Валидация телефона
        const phoneRegex = /^\+7[0-9]{10}$/;
        if (!data.phone) {
            newErrors.phone = true;
            isValid = false;
        } else if (!phoneRegex.test(data.phone)) {
            newErrors.phone = true;
            isValid = false;
        }
        
        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            newErrors.email = true;
            isValid = false;
        } else if (!emailRegex.test(data.email)) {
            newErrors.email = true;
            isValid = false;
        }
        
        // Валидация имени
        if (!data.name.trim()) {
            newErrors.name = true;
            isValid = false;
        }
        
        // Валидация фамилии
        if (!data.surname.trim()) {
            newErrors.surname = true;
            isValid = false;
        }
        
        // Валидация пароля
        if (!data.password) {
            newErrors.password = true;
            isValid = false;
        } else if (data.password.length < 8) {
            newErrors.password = true;
            isValid = false;
        }
        
        // Валидация подтверждения пароля
        if (!data.password_confirmation) {
            newErrors.password_confirmation = true;
            isValid = false;
        } else if (data.password !== data.password_confirmation) {
            newErrors.password_confirmation = true;
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) {
            return;
        }
        
        setLoading(true);
        
        try {
            const apiUrl = import.meta.env.VITE_API || 'http://api.remontdeco.ru/';
            const response = await axios.post(`${apiUrl}register-by-phone`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            if (response.data.code === 200) {
                setSuccess(true);
                toast.success('Регистрация успешна! Теперь вы можете войти.', {
                    position: 'top-right',
                    autoClose: 3000
                });
                
                // Автоматически закрываем через 2 секунды
                setTimeout(() => {
                    onHide();
                    if (onLoginClick) {
                        onLoginClick();
                    }
                }, 2000);
            } else {
                setErrors(prev => ({ ...prev, submit: response.data.message || 'Ошибка регистрации' }));
            }
        } catch (error) {
            console.error('Registration error:', error);
            
            if (error.response?.data?.code === 422) {
                // Ошибки валидации с сервера
                const serverErrors = error.response.data.data?.errors || {};
                
                // Преобразуем ошибки сервера в наш формат
                const newErrors = { ...INITIAL_ERRORS };
                Object.keys(serverErrors).forEach(key => {
                    if (newErrors.hasOwnProperty(key)) {
                        newErrors[key] = true;
                    }
                });
                setErrors(newErrors);
                
                // Показываем первую ошибку toast
                const firstError = Object.values(serverErrors)[0];
                if (firstError && firstError[0]) {
                    toast.error(firstError[0], { position: 'top-right' });
                }
            } else {
                setErrors(prev => ({ ...prev, submit: error.response?.data?.message || 'Ошибка соединения' }));
                toast.error('Ошибка регистрации', { position: 'top-right' });
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: false
            }));
        }
    };
    
    // Форматирование телефона при вводе
    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (!value.startsWith('7')) {
                value = '7' + value;
            }
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            value = '+' + value;
        }
        
        setData(prev => ({
            ...prev,
            phone: value
        }));
        
        if (errors.phone) {
            setErrors(prev => ({
                ...prev,
                phone: false
            }));
        }
    };
    
    return (
        <>
            {show && <div className="custom-backdrop-fix" />}
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="true"
                className={'RegisterModal'}
                backdropClassName={'custom-backdrop'}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Регистрация
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {success ? (
                        <div className="success-message">
                            <Alert variant="success">
                                <Alert.Heading>Регистрация успешна!</Alert.Heading>
                                <p>Ваш аккаунт создан. Теперь вы можете войти в систему.</p>
                            </Alert>
                        </div>
                    ) : (
                        <Form className={'form-modal_element'} onSubmit={handleSubmit}>
                            {errors.submit && (
                                <Alert variant="danger" className="mb-3">
                                    {errors.submit}
                                </Alert>
                            )}
                            
                            <div className={'other-fields'}>
                                {Object.entries(data).map(([key, value]) => {
                                    const isError = errors[key];
                                    const commonProps = {
                                        id: `control_${key}`,
                                        name: key,
                                        value: value || '',
                                        className: isError ? 'is-invalid' : '',
                                        placeholder: `Введите ${LABELS_CONTROLS[key].toLowerCase()}`,
                                        onChange: key === 'phone' ? handlePhoneChange : handleChange,
                                        disabled: loading
                                    };
                                    
                                    // Для полей пароля используем type="password"
                                    if (key === 'password' || key === 'password_confirmation') {
                                        return (
                                            <div className={'control-wrapper_element'} key={key}>
                                                <label htmlFor={`control_${key}`}>
                                                    {LABELS_CONTROLS[key]}
                                                </label>
                                                <FormControl
                                                    {...commonProps}
                                                    type="password"
                                                />
                                            </div>
                                        );
                                    }
                                    
                                    // Для поля email используем type="email"
                                    if (key === 'email') {
                                        return (
                                            <div className={'control-wrapper_element'} key={key}>
                                                <label htmlFor={`control_${key}`}>
                                                    {LABELS_CONTROLS[key]}
                                                </label>
                                                <FormControl
                                                    {...commonProps}
                                                    type="email"
                                                />
                                            </div>
                                        );
                                    }
                                    
                                    // Для остальных полей - обычный text
                                    return (
                                        <div className={'control-wrapper_element'} key={key}>
                                            <label htmlFor={`control_${key}`}>
                                                {LABELS_CONTROLS[key]}
                                            </label>
                                            <FormControl
                                                {...commonProps}
                                                type="text"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            
                            <div className="mt-3">
                                <p className="small text-muted mb-2">
                                    * Все поля обязательны для заполнения
                                </p>
                                <p className="small text-muted">
                                    Формат телефона: +7XXXXXXXXXX
                                </p>
                            </div>
                            
                            <Button 
                                className={'yellow-but'} 
                                type={'submit'}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Spinner 
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Регистрация...
                                    </>
                                ) : 'Зарегистрироваться'}
                            </Button>
                            
                            <div className="text-center mt-3">
                                <p className="mb-0 small">
                                    Уже есть аккаунт?{' '}
                                    <Button 
                                        variant="link" 
                                        className="p-0 small"
                                        onClick={() => {
                                            onHide();
                                            if (onLoginClick) {
                                                onLoginClick();
                                            }
                                        }}
                                    >
                                        Войти
                                    </Button>
                                </p>
                            </div>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RegisterModal;