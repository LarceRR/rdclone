import React, { useState, useEffect, useRef } from 'react';
import { Container, Dropdown, Form, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavbarTop.css';
import './NavbarTopMedia.css';
import ReklamaModal from '../ReklamaModal/ReklamaModal.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import axios from 'axios';
import MobileSearch from '../../components/MobileSearch/MobileSearch.jsx';

const NavbarTop = () => {
    const [showModalReklama, setShowModalReklama] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cities, setCities] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputWidth, setInputWidth] = useState(160); // минимальная ширина
    const inputRef = useRef(null);
    const hiddenSpanRef = useRef(null);

    useEffect(() => {
        const savedCity = localStorage.getItem('city');
        if (savedCity) {
            try {
                setSelectedCity(JSON.parse(savedCity));
            } catch (error) {
                console.error('Error parsing city from localStorage:', error);
                localStorage.removeItem('city'); // Удаляем некорректные данные
            }
        }
        fetchCities();
    }, []);

    useEffect(() => {
        if (searchQuery?.city_name) {
            fetchCities(searchQuery.city_name);
        }
    }, [searchQuery]);

    // Обновление ширины инпута при изменении текста
    useEffect(() => {
        if (hiddenSpanRef.current && inputRef.current) {
            const text = selectedCity || searchQuery || 'Выберите город';
            hiddenSpanRef.current.textContent = text;
            const width = hiddenSpanRef.current.offsetWidth + 20; // + padding
            setInputWidth(Math.max(width, 160)); // не меньше минимальной ширины
        }
    }, [selectedCity, searchQuery]);

    // Фокус на инпут при открытии дропдауна
    useEffect(() => {
        if (dropdownOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [dropdownOpen]);

    // Получение списка городов
    const fetchCities = async (query = '') => {
        try {
            const url = `${import.meta.env.VITE_API}cities`;
            const payload = { search: query };
            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const citiesData = response.data?.data;
            setCities(citiesData);
            if (!query) {
                setAllCities(citiesData);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    // Обработчик поиска городов
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            fetchCities(query);
        } else {
            setCities(allCities);
        }
    };

    // Выбор города
    const handleSelectCity = (city) => {
        localStorage.setItem(
            'city',
            JSON.stringify({ city_name: city.title, city_id: city.id }),
        );
        setSelectedCity({ city_name: city.title, city_id: city.id });
        setDropdownOpen(false);
        setSearchQuery('');
    };

    // Сброс выбранного города
    const handleResetCity = async () => {
        localStorage.removeItem('city');
        setSelectedCity(null);
        setDropdownOpen(false);
        setSearchQuery('');
        await fetchCities('');
    };

    // Обработчик клика по инпуту
    const handleInputClick = (e) => {
        e.stopPropagation();
        setDropdownOpen(true);
    };

    return (
        <>
            <Navbar className="NavbarTop">
                <Container>
                    <Link className="navbar-brand" to="/">
                        <img
                            alt=""
                            src="/logo.png"
                            className="logo d-inline-block align-top"
                        />
                    </Link>

                    <SearchBox
                        city={selectedCity?.city_name || ''}
                        city_id={selectedCity?.city_id || ''}
                    />

                    <div className="navbar-menu">
                        <a href="/" className="navbar-home">
                            Главная
                        </a>

                        <div className="dropdown-city-container">
                            <span
                                ref={hiddenSpanRef}
                                style={{
                                    position: 'absolute',
                                    visibility: 'hidden',
                                    whiteSpace: 'nowrap',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    padding: '0 10px',
                                }}
                            />

                            <Dropdown
                                show={dropdownOpen}
                                onToggle={(isOpen) => {
                                    setDropdownOpen(isOpen);
                                    if (isOpen) {
                                        setSearchQuery(
                                            selectedCity?.city_name || '',
                                        );
                                        setCities(allCities);
                                    }
                                }}
                            >
                                <Dropdown.Toggle
                                    as="div"
                                    variant="light"
                                    id="dropdown-city"
                                    className="city-input-toggle"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Выберите город"
                                        value={
                                            selectedCity?.city_name ||
                                            searchQuery
                                        }
                                        onChange={(e) => {
                                            setSelectedCity(e.target.value);
                                            handleSearch(e.target.value);
                                        }}
                                        onFocus={() => {
                                            handleSearch(selectedCity);
                                        }}
                                        onClick={handleInputClick}
                                        ref={inputRef}
                                        className="city-input"
                                        style={{
                                            width: `${inputWidth + 20}px`,
                                        }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu
                                    style={{
                                        maxHeight: '300px',
                                        overflowY: 'auto',
                                    }}
                                    className="city-dropdown-menu"
                                >
                                    {cities.length > 0 ? (
                                        cities.map((city) => (
                                            <Dropdown.Item
                                                key={city.id}
                                                onClick={() =>
                                                    handleSelectCity(city)
                                                }
                                                className={
                                                    Number(city.million) === 1
                                                        ? 'fw-bold'
                                                        : ''
                                                }
                                            >
                                                {city.title}
                                            </Dropdown.Item>
                                        ))
                                    ) : (
                                        <div className="dropdown-no-results">
                                            <div className="text-muted p-2 text-center">
                                                <i className="bi bi-exclamation-circle fs-4"></i>
                                                <div>Город не найден</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Кнопка сброса, если город выбран */}
                                    {selectedCity?.city_id && (
                                        <>
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                onClick={handleResetCity}
                                                className="text-danger"
                                            >
                                                <i className="bi bi-x-circle me-2"></i>
                                                Сбросить выбор
                                            </Dropdown.Item>
                                        </>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <MobileSearch
                        city={selectedCity?.city_name || ''}
                        city_id={selectedCity?.city_id || ''}
                    />
                </Container>
            </Navbar>

            <ReklamaModal
                show={showModalReklama}
                onHide={() => setShowModalReklama(false)}
            />
        </>
    );
};

export default NavbarTop;
