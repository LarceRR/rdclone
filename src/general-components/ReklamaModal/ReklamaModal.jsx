import React, { useEffect, useState } from 'react';
import './ReklamaModal.css';
import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap';
import { dataMain } from '../../data/dataMain.js';
import { getDate } from '../../functions/getDate.js';
import MessageAlert from '../MessageAlert/MessageAlert.jsx';
import axios from 'axios';

import FileInput from './FileInput.jsx';

import { API_CITY, API_LINK } from '../../constants/api.js';
import { API_REKLAMA_ADD } from '../../constants/api.js';
import { useFetchCity } from '../../hooks/useFetchCity.js';
import { UploadFile } from '../../components/UploadFile/index.jsx';
import { UploadVideo } from '../../components/UploadVideo/index.jsx';
import { Controller } from 'swiper/modules';
import { toast } from 'react-toastify';

const LABLES_CONTROLS = {
    title: 'Заголовок',
    description: 'Описание',
    category_id: 'Категория',
    email: 'E-Mail',
    phone: 'Телефон',
    site: 'Адрес сайта',
    city_id: 'Город',
    inn: 'ИНН',
};
const INITIAL_DATA = {
    title: '',
    description: '',
    category_id: null,
    email: '',
    phone: '',
    site: '',
    city_id: null,
    inn: '',
};
const INITIAL_ERRORS = {
    title: false,
    description: false,
    category_id: false,
    email: false,
    phone: false,
    site: false,
    city_id: false,
    media: false,
    inn: false,
};

const ReklamaModal = ({ show, onHide }) => {
    const [data, setData] = useState(INITIAL_DATA);
    const [imagesCount, setImagesCount] = useState(1);
    const [videosCount, setVideosCount] = useState(1);
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        category_id: false,
        email: false,
        phone: false,
        site: false,
        city_id: false,
        media: false,
        inn: false,
    });
    const [mediaError, setMediaError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [approvedInn, setApprovedInn] = useState(false);
    const [inn, setInn] = useState('');
    const [errorInn, setErrorInn] = useState(false);
    const [companyData, setCompanyData] = useState(null);
    const [formInnValid, setFormInnValid] = useState(false);
    const [isCheckingInn, setIsCheckingInn] = useState(false);

    useEffect(() => {
        const fetchData = async (query = '') => {
            try {
                const generalUrl = `${import.meta.env.VITE_API}`;
                const responseCategory = await axios.get(
                    `${generalUrl}category`,
                );
                const responseCities = await axios.post(
                    `${generalUrl}cities`,
                    {
                        search: '',
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
                const categoriesData = responseCategory?.data?.data;
                const citiesData = responseCities?.data?.data;
                setCities(citiesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchData();
    }, []);

    const validate = () => {
        const newErrors = {};

        Object.entries(data).forEach(([key, value]) => {
            // Пропускаем поле site - оно необязательное
            if (key === 'site') return;
            
            if (!value || value === 'all') {
                newErrors[key] = true;
            }
        });

        // Проверка валидности ИНН
        if (!formInnValid) {
            newErrors.inn = true;
        }

        // Проверка наличия хотя бы одного фото или видео
        const hasImages = data.image && data.image.length > 0;
        const hasVideos = data.video && data.video.length > 0;
        
        if (!hasImages && !hasVideos) {
            newErrors.media = true;
            setMediaError('Необходимо загрузить хотя бы 1 фото или 1 видео');
        } else {
            setMediaError('');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const checkInn = async () => {
        const response = await axios.post(
            'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
            { query: inn },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization:
                        'Token 4646aa7fd3dcde0ab7634754a30706b98d07ee27',
                },
            },
        );
        console.log(response, response?.data);
        if (response?.status === 200 && !!response?.data?.suggestions.length) {
            const suggestion = response.data.suggestions[0];
            const data = suggestion.data;
            
            // Определяем ФИО и тип организации
            let fio = '';
            let organizationType = '';
            
            // Для ИП (Индивидуальный предприниматель)
            if (data.type === 'INDIVIDUAL') {
                fio = data.fio?.surname 
                    ? `${data.fio.surname} ${data.fio.name || ''} ${data.fio.patronymic || ''}`.trim()
                    : data.name?.full || '';
                organizationType = data.opf?.short || 'ИП';
            } else {
                // Для юридических лиц (ООО, АО и т.д.)
                fio = data.management?.name || data.name?.full || '';
                organizationType = data.opf?.short || data.type || '';
            }
            
            setCompanyData({
                fio,
                organizationType,
                fullData: data
            });
            setApprovedInn(true);
            setErrorInn(false);
        } else {
            setErrorInn(true);
        }
    };

    // Функция для проверки ИНН из формы
    const checkFormInn = async (innValue) => {
        if (!innValue || innValue.trim().length === 0) {
            setCompanyData(null);
            setFormInnValid(false);
            setErrors((prev) => ({ ...prev, inn: false }));
            return;
        }

        setIsCheckingInn(true);
        try {
            const response = await axios.post(
                'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',
                { query: innValue },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization:
                            'Token 4646aa7fd3dcde0ab7634754a30706b98d07ee27',
                    },
                },
            );

            if (response?.status === 200 && !!response?.data?.suggestions.length) {
                const suggestion = response.data.suggestions[0];
                const suggestionData = suggestion.data;
                
                // Определяем ФИО и тип организации
                let fio = '';
                let organizationType = '';
                
                // Для ИП (Индивидуальный предприниматель)
                if (suggestionData.type === 'INDIVIDUAL') {
                    fio = suggestionData.fio?.surname 
                        ? `${suggestionData.fio.surname} ${suggestionData.fio.name || ''} ${suggestionData.fio.patronymic || ''}`.trim()
                        : suggestionData.name?.full || '';
                    organizationType = suggestionData.opf?.short || 'ИП';
                } else {
                    // Для юридических лиц (ООО, АО и т.д.)
                    fio = suggestionData.management?.name || suggestionData.name?.full || '';
                    organizationType = suggestionData.opf?.short || suggestionData.type || '';
                }
                
                setCompanyData({
                    fio,
                    organizationType,
                    fullData: suggestionData
                });
                setFormInnValid(true);
                setErrors((prev) => ({ ...prev, inn: false }));
            } else {
                setCompanyData(null);
                setFormInnValid(false);
                setErrors((prev) => ({ ...prev, inn: true }));
            }
        } catch (error) {
            console.error('Error checking INN:', error);
            setCompanyData(null);
            setFormInnValid(false);
            setErrors((prev) => ({ ...prev, inn: true }));
        } finally {
            setIsCheckingInn(false);
        }
    };

    // Debounce эффект для проверки ИНН из формы
    useEffect(() => {
        if (!approvedInn || !data.inn) return;

        const timer = setTimeout(() => {
            checkFormInn(data.inn);
        }, 800); // Задержка 800мс

        return () => clearTimeout(timer);
    }, [data.inn, approvedInn]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            setLoading(false);
            return;
        }

        setLoading(true);

        // Здесь можно делать POST-запрос
        const formData = new FormData();

        Object.entries({ ...data })
            .filter(([key]) => key !== 'image' && key !== 'video')
            .forEach(([key, value]) => {
                if (value != null) formData.append(key, String(value));
            });

        if (data.image) {
            // @ts-ignore
            data.image.forEach((file, idx) => {
                formData.append(`image${idx + 1}`, file);
            });
        }

        if (data.video) {
            // @ts-ignore
            data.video.forEach((file, idx) => {
                formData.append(`video${idx + 1}`, file);
            });
        }
        let successResponse = false;
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API}add`,
                formData,
            );
            if (response.data.code === 200) {
                successResponse = true;
            }
        } catch (e) {
            console.log(e);
        }

        setTimeout(() => {
            setLoading(false);
            setData(INITIAL_DATA);
            setErrors(INITIAL_ERRORS);
            onHide(); // закрытие после отправки
            if (successResponse) {
                toast.success('Компания успешно добавлена!', {
                    position: 'top-right',
                });
            } else {
                toast.error('Ошибка добавления компании', {
                    position: 'top-right',
                });
            }
        }, 2000);
    };

    useEffect(() => {
        setData(INITIAL_DATA);
        setErrors(INITIAL_ERRORS);
        setMediaError('');
        setInn('');
        setApprovedInn(false);
        setErrorInn(false);
        setCompanyData(null);
        setFormInnValid(false);
        setIsCheckingInn(false);
    }, [show]);

    // Инициализация поля inn в форме после успешной первой проверки
    useEffect(() => {
        if (approvedInn && inn) {
            setData((prev) => ({ ...prev, inn }));
            setFormInnValid(true);
        }
    }, [approvedInn]);

    return (
        <>
            {show && <div className="custom-backdrop-fix" />}
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="true"
                className={'AdvertisingModal'}
                size={approvedInn ? 'xl' : 'lg'}
                backdropClassName={'custom-backdrop'}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Добавить мою компанию
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {!approvedInn && (
                        <div className={'research-company'}>
                            <div className={'control-wrapper_element'}>
                                <label htmlFor={`control_inn`}>
                                    Проверка ИНН
                                </label>
                                <FormControl
                                    value={inn}
                                    onChange={(e) => setInn(e.target.value)}
                                    id={'control_inn'}
                                    placeholder={'Введите ИНН компании'}
                                />
                            </div>
                            <Button className={'yellow-but'} onClick={checkInn}>
                                Проверить ИНН
                            </Button>
                            {errorInn ? (
                                <span className={'info-inn_danger'}>
                                    Неправильный ИНН или компания не найдена
                                </span>
                            ) : null}
                        </div>
                    )}
                    {approvedInn && (
                        <Form
                            className={'form-modal_element'}
                            onSubmit={onSubmit}
                        >
                            {companyData && (
                                <div className="company-preloaded-data">
                                    <div className="company-preloaded-data-physFace">
                                        {companyData?.fio && (
                                            <>
                                                <strong>ФИО:</strong> {companyData.fio}
                                            </>
                                        )}
                                    </div>
                                    <div className="company-preloaded-data-organizationType">
                                        {companyData?.organizationType && (
                                            <>
                                                <strong>Тип организации:</strong> {companyData.organizationType}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className={'other-fields'}>
                                {Object.entries(data).map(([key, value]) => {
                                    if (key === 'image' || key === 'video') return;
                                    const isError = errors[key];
                                    const commonProps = {
                                        id: `control_${key}`,
                                        value: value || '',
                                        className: isError ? 'is-invalid' : '',
                                        placeholder: `Введите ${LABLES_CONTROLS[key].toLowerCase()}`,
                                        onChange: (e) => {
                                            setData({
                                                ...data,
                                                [key]: e.target.value,
                                            });
                                            setErrors((prev) => ({
                                                ...prev,
                                                [key]: false,
                                            }));
                                        },
                                    };
                                    if (key === 'city_id' && cities.length) {
                                        return (
                                            <div
                                                className={
                                                    'control-wrapper_element'
                                                }
                                            >
                                                <label
                                                    htmlFor={`control_${key}`}
                                                >
                                                    {LABLES_CONTROLS[key]}
                                                </label>
                                                <Form.Select {...commonProps}>
                                                    <option value="all">
                                                        Выберите
                                                    </option>
                                                    {cities.map((city) => (
                                                        <option value={city.id}>
                                                            {city.title}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </div>
                                        );
                                    }
                                    if (
                                        key === 'category_id' &&
                                        cities.length
                                    ) {
                                        return (
                                            <div
                                                className={
                                                    'control-wrapper_element'
                                                }
                                            >
                                                <label
                                                    htmlFor={`control_${key}`}
                                                >
                                                    {LABLES_CONTROLS[key]}
                                                </label>
                                                <Form.Select {...commonProps}>
                                                    <option value="all">
                                                        Выберите
                                                    </option>
                                                    {categories.map(
                                                        (category) => (
                                                            <option
                                                                value={
                                                                    category.id
                                                                }
                                                            >
                                                                {category.title}
                                                            </option>
                                                        ),
                                                    )}
                                                </Form.Select>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div
                                            className={
                                                'control-wrapper_element'
                                            }
                                        >
                                            <label htmlFor={`control_${key}`}>
                                                {LABLES_CONTROLS[key]}
                                            </label>
                                            <FormControl
                                                {...commonProps}
                                                type={
                                                    key === 'email'
                                                        ? 'email'
                                                        : 'text'
                                                }
                                            />
                                        </div>
                                    );
                                })}
                                <div className="media-loader-wrapper">
                                    <div className={'image-controller_wrapper'}>
                                        {[...new Array(imagesCount)]
                                            .fill(null)
                                            .map((_, idx) => (
                                                <UploadFile
                                                    key={`image-${idx}`}
                                                    id={`upload-image-${idx}`}
                                                    maxSize={5 * 1024 * 1024}
                                                    onValidationError={(message) => {
                                                        toast.error(message, {
                                                            position: 'top-right',
                                                        });
                                                    }}
                                                    onChange={(e) => {
                                                        const files = Array.from(
                                                            e.target.files || [],
                                                        );
                                                        
                                                        if (files.length === 0) return;
                                                        
                                                        // Проверка общего количества файлов
                                                        const currentImagesCount = (data.image || []).length;
                                                        const currentVideosCount = (data.video || []).length;
                                                        const totalCount = currentImagesCount + currentVideosCount + files.length;
                                                        
                                                        if (totalCount > 3) {
                                                            toast.error('Максимум можно загрузить 3 файла (фото + видео)', {
                                                                position: 'top-right',
                                                            });
                                                            e.target.value = '';
                                                            return;
                                                        }
                                                        
                                                        // @ts-ignore
                                                        setData({
                                                            ...data,
                                                            image: [
                                                                ...(data.image ||
                                                                    []),
                                                                ...files,
                                                            ],
                                                        });
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            media: false,
                                                        }));
                                                        setMediaError('');
                                                    }}
                                                />
                                            ))}
                                        <button
                                            onClick={() => {
                                                const currentImagesCount = (data.image || []).length;
                                                const currentVideosCount = (data.video || []).length;
                                                const totalCount = currentImagesCount + currentVideosCount;
                                                
                                                if (totalCount >= 3) {
                                                    toast.error('Максимум можно загрузить 3 файла (фото + видео)', {
                                                        position: 'top-right',
                                                    });
                                                    return;
                                                }
                                                
                                                if (imagesCount < 20) {
                                                    setImagesCount(imagesCount + 1);
                                                }
                                            }}
                                            type={'button'}
                                            style={{
                                                cursor: 'pointer',
                                                background: 'none',
                                                width: '50px',
                                                height: '50px',
                                                minWidth: '50px',
                                                minHeight: '50px',
                                                borderRadius: '8px',
                                                border: '2px dashed var(--primary-color)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '32px',
                                                color: 'var(--primary-color)',
                                                lineHeight: 0,
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className={'video-controller_wrapper'}>
                                        {[...new Array(videosCount)]
                                            .fill(null)
                                            .map((_, idx) => (
                                                <UploadVideo
                                                    key={`video-${idx}`}
                                                    id={`upload-video-${idx}`}
                                                    maxSize={100 * 1024 * 1024}
                                                    onValidationError={(message) => {
                                                        toast.error(message, {
                                                            position: 'top-right',
                                                        });
                                                    }}
                                                    onChange={(e) => {
                                                        const files = Array.from(
                                                            e.target.files || [],
                                                        );
                                                        
                                                        if (files.length === 0) return;
                                                        
                                                        // Проверка общего количества файлов
                                                        const currentImagesCount = (data.image || []).length;
                                                        const currentVideosCount = (data.video || []).length;
                                                        const totalCount = currentImagesCount + currentVideosCount + files.length;
                                                        
                                                        if (totalCount > 3) {
                                                            toast.error('Максимум можно загрузить 3 файла (фото + видео)', {
                                                                position: 'top-right',
                                                            });
                                                            e.target.value = '';
                                                            return;
                                                        }
                                                        
                                                        // @ts-ignore
                                                        setData({
                                                            ...data,
                                                            video: [
                                                                ...(data.video ||
                                                                    []),
                                                                ...files,
                                                            ],
                                                        });
                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            media: false,
                                                        }));
                                                        setMediaError('');
                                                    }}
                                                />
                                            ))}
                                        <button
                                            onClick={() => {
                                                const currentImagesCount = (data.image || []).length;
                                                const currentVideosCount = (data.video || []).length;
                                                const totalCount = currentImagesCount + currentVideosCount;
                                                
                                                if (totalCount >= 3) {
                                                    toast.error('Максимум можно загрузить 3 файла (фото + видео)', {
                                                        position: 'top-right',
                                                    });
                                                    return;
                                                }
                                                
                                                if (videosCount < 10) {
                                                    setVideosCount(videosCount + 1);
                                                }
                                            }}
                                            type={'button'}
                                            style={{
                                                cursor: 'pointer',
                                                background: 'none',
                                                width: '50px',
                                                height: '50px',
                                                minWidth: '50px',
                                                minHeight: '50px',
                                                borderRadius: '8px',
                                                border: '2px dashed var(--primary-color)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '32px',
                                                color: 'var(--primary-color)',
                                                lineHeight: 0,
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {mediaError && (
                                    <div style={{
                                        color: '#dc3545',
                                        fontSize: '14px',
                                        marginTop: '10px',
                                        padding: '8px',
                                        backgroundColor: '#f8d7da',
                                        border: '1px solid #f5c6cb',
                                        borderRadius: '4px'
                                    }}>
                                        {mediaError}
                                    </div>
                                )}
                            </div>
                            <Button 
                                className={'yellow-but'} 
                                type={'submit'}
                                disabled={loading || !formInnValid || isCheckingInn}
                            >
                                {loading || isCheckingInn ? (
                                    <Spinner size={'sm'} variant={'warning'} />
                                ) : (
                                    'Отправить'
                                )}
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

// export const ReklamaModal = ({ show, onHide }) => {
//     const [file, setFile] = useState(null);
//     const [direction, setDirection] = useState('');
//     const [name_company, setNameCompany] = useState('');
//     const [description, setDescription] = useState('');
//     const [phone, setPhone] = useState('');
//     const [city, setCity] = useState('all');
//     const { dataCity, errorCity, loadCity } = useFetchCity(API_CITY);
//     //const [select, setSelect] = useState(null);
//
//
//     const [error, setError] = useState(false);
//     const [load, setLoad] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const [answer, setAnswer] = useState(false);
//     const handleSend = (e) => {
//         e.preventDefault();
//         setLoad(true);
//         const date = Date.now();
//         const options = {
//             headers: {
//                 'Content-type': `multipart/form-data`,
//             },
//         };
//         axios
//             .post(
//                 API_LINK + API_REKLAMA_ADD,
//                 {
//                     direction,
//                     name_company,
//                     phone,
//                     city,
//                     description,
//                     image: file,
//                 },
//                 options,
//             )
//             .then((res) => {
//                 if (res.data.result == 'error') {
//                     setAnswer(res.data.data.error);
//                     setError(true);
//                     setLoad(false);
//                 } else {
//                     setAnswer(
//                         'Ваша заявка принята на рассмотрение с вами свяжутся!',
//                     );
//                     setSuccess(true);
//                     setError(null);
//                     document.getElementById('ModalForm').style.display = 'none';
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//             })
//             .finally(() => {
//                 //setLoad(false)
//                 //setFile(null)
//             });
//     };
//     return (
//         <Modal
//             show={show}
//             onHide={onHide}
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             className={'AdvertisingModal'}
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     Опубликуйте ваш рекламный пост
//                 </Modal.Title>
//             </Modal.Header>
//
//             <Modal.Body>
//                 <Form onSubmit={handleSend}>
//                     <Form.Select
//                         value={direction}
//                         onChange={(e) => setDirection(e.target.value)}
//                     >
//                         <option hidden>*Направление компании</option>
//                         {dataMain.map((elem) => (
//                             <option value={elem.id} key={elem.id}>
//                                 {elem.title}
//                             </option>
//                         ))}
//                     </Form.Select>
//
//                     <FormControl
//                         required={true}
//                         placeholder={'*Название компани'}
//                         value={name_company}
//                         onChange={(e) => setNameCompany(e.target.value)}
//                     />
//
//                     <FormControl
//                         required={true}
//                         placeholder={'*Телефон для связи'}
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                     />
//
//                     <Form.Select
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                     >
//                         <option value="all">- во всех -</option>
//                         {dataCity &&
//                             !errorCity &&
//                             !loadCity &&
//                             Object.values(dataCity) &&
//                             Object.values(dataCity).map((elem) => (
//                                 <option value={elem.title}>{elem.title}</option>
//                             ))}
//                     </Form.Select>
//                     <FormControl
//                         required={true}
//                         className={'textarea'}
//                         placeholder={'*Описание'}
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                     {error && (
//                         <MessageAlert
//                             variant={'danger'}
//                             text={'Ошибка при заказе рекламы!'}
//                         />
//                     )}
//                     {success && (
//                         <MessageAlert
//                             variant={'success'}
//                             text={'Заявка успешно отправлена!'}
//                         />
//                     )}
//
//                     <div
//                         className={
//                             'd-flex justify-content-between actions_footer'
//                         }
//                     >
//                         <FileInput
//                             value={file}
//                             onChange={(value) => setFile(value[0])}
//                         />
//
//                         <Button
//                             className={'yellow-but'}
//                             disabled={!file}
//                             type={'submit'}
//                         >
//                             {load ? (
//                                 <Spinner size={'sm'} variant={'warning'} />
//                             ) : (
//                                 'Отправить'
//                             )}
//                         </Button>
//                     </div>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

export default ReklamaModal;
