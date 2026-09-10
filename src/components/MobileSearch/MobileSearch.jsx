import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MobileSearch.css';

const MobileSearch = ({ city, city_id }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [placeholder, setPlaceholder] = useState('Поиск...');

    useEffect(() => {
        // При первой загрузке проверяем localStorage
        const savedCity = localStorage.getItem('city');
        if (savedCity) {
            try {
                const parsedCity = JSON.parse(savedCity);
                setPlaceholder(`Поиск в городе ${parsedCity.city_name}`);
            } catch (error) {
                console.error('Error parsing city from localStorage:', error);
                setPlaceholder('Поиск...');
            }
        } else {
            setPlaceholder('Поиск...');
        }
    }, [localStorage.getItem('city')]);

    useEffect(() => {
        // Если проп city изменился (пользователь выбрал город)
        if (city) {
            if (typeof city === 'object' && city.search) {
                setPlaceholder(city.search);
            } else if (typeof city === 'string') {
                setPlaceholder(`Поиск в городе ${city}`);
            }
        }
    }, [city]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            if (query.trim().length > 2) {
                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_API}search`,
                        { search: query, city_id: city_id ? city_id : 0 },
                    );
                    if (res.data.data) {
                        setResults(res.data.data);
                        setShowDropdown(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        const delay = setTimeout(fetchResults, 300);
        return () => clearTimeout(delay);
    }, [query, city]);

    // Закрытие выпадающего списка при клике вне его
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setShowDropdown(false);
                setQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleResultClick = (item) => {
        const url = `/company/${item.id}`;
        navigate(url);
        setShowDropdown(false);
        setQuery('');
    };

    return (
        <div className="MobileSearch">
            <div className="search-container">
                <div className="search-container-left">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.972">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.164 0.984472C16.8868 0.689522 20.981 3.10369 23.4465 8.22699C25.0003 12.397 24.5149 16.3045 21.9905 19.9494C23.7836 21.7549 25.5631 23.5717 27.3291 25.4C27.614 26.0761 27.5643 26.7232 27.1797 27.3413C26.6916 27.8297 26.1067 27.9915 25.4251 27.8266C25.2051 27.7664 25.0061 27.6669 24.8278 27.5279C23.097 25.7847 21.3548 24.055 19.6012 22.3387C16.0975 24.7803 12.3144 25.3155 8.25211 23.944C3.878 22.1073 1.35184 18.8345 0.67359 14.1255C0.342786 8.40029 2.7445 4.30618 7.87878 1.84312C8.94776 1.41835 10.0429 1.13213 11.164 0.984472ZM11.836 4.19507C15.7872 4.15991 18.6368 5.90207 20.3852 9.42164C21.7976 13.3114 20.9887 16.6589 17.9586 19.4641C14.8123 21.8018 11.5021 22.0507 8.02811 20.2108C4.32651 17.6181 3.1194 14.1462 4.40685 9.79496C5.80607 6.49095 8.28249 4.62433 11.836 4.19507Z"
                                fill="#878787"
                                fillOpacity="0.72"
                            />
                            <path
                                d="M11.1846 1.23285C14.0038 1.08872 16.4044 1.61316 18.3994 2.78949C20.3922 3.96456 21.9991 5.80237 23.2139 8.32074C24.7364 12.4121 24.2615 16.2315 21.7852 19.8071L21.667 19.978L21.8135 20.1254C23.5932 21.9175 25.3593 23.7211 27.1123 25.5356C27.3448 26.1142 27.3015 26.654 26.9814 27.183C26.5612 27.5926 26.0744 27.7251 25.4863 27.5834C25.3021 27.5324 25.1366 27.4497 24.9873 27.3344C23.2615 25.5963 21.5249 23.8709 19.7764 22.1596L19.6279 22.0151L19.458 22.1332C16.0229 24.527 12.3269 25.0517 8.34375 23.7104C4.05707 21.9086 1.58929 18.7146 0.921875 14.0991C0.760877 11.2806 1.27297 8.8806 2.44238 6.88715C3.6127 4.89228 5.45349 3.2848 7.98242 2.07074C9.02513 1.65746 10.0924 1.3777 11.1846 1.23285ZM11.8057 3.94672C8.16313 4.38682 5.61076 6.31157 4.17676 9.69769L4.1709 9.71039L4.16699 9.72406C3.51198 11.9378 3.48597 13.9487 4.11035 15.7446C4.73479 17.5405 6.00101 19.0961 7.88477 20.4155L7.89746 20.4243L7.91113 20.4321C9.68189 21.3699 11.4247 21.7823 13.1348 21.6537C14.845 21.5252 16.5033 20.8564 18.1074 19.6645L18.1182 19.6567L18.1279 19.6479C19.6718 18.2186 20.6629 16.639 21.0811 14.9086C21.4992 13.1782 21.3397 11.318 20.6201 9.33636L20.6152 9.32269L20.6094 9.31L20.4385 8.97894C19.5692 7.34855 18.4469 6.10557 17.0674 5.26215C15.5959 4.36253 13.8476 3.92687 11.834 3.94476H11.8203L11.8057 3.94672Z"
                                stroke="#878787"
                                strokeOpacity="0.72"
                                strokeWidth="0.5"
                            />
                        </g>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && setShowDropdown(true)}
                />
            </div>

            {showDropdown && results.length <= 0 && (
                <div className="searchbox-dropdown" ref={dropdownRef}>
                    <div className="searchbox-name-no-results">
                        Результаты не найдены
                    </div>
                </div>
            )}

            {showDropdown && results.length > 0 && (
                <div className="searchbox-dropdown" ref={dropdownRef}>
                    {results.map((item) => (
                        <div
                            key={`${item.type}-${item?.id}`}
                            className="searchbox-item"
                            onClick={() => handleResultClick(item)}
                        >
                            {typeof item.image1 == 'string' ? (
                                item.image1.includes('mp4') ? (
                                    <video
                                        src={`${import.meta.env.VITE_GENERAL_IMAGE}${item?.image1}`}
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                        className="w-full h-full object-cover"
                                    ></video>
                                ) : (
                                    <img
                                        src={`${import.meta.env.VITE_GENERAL_IMAGE}${item?.image1}`}
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                '/images/no-img.png')
                                        }
                                        alt={item?.title}
                                    />
                                )
                            ) : null}
                            <div className="searchbox-text">
                                <div className="searchbox-name">
                                    {item.title}
                                </div>
                                {/*<div className="searchbox-type">*/}
                                {/*    {item.type === 'category'*/}
                                {/*        ? 'Категория'*/}
                                {/*        : 'Компания'}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MobileSearch;
