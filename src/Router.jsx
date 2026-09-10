import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import NavbarTop from './general-components/NavbarTop/NavbarTop.jsx';
import FooterBottom from './general-components/FooterBottom/FooterBottom.jsx';
import ProductPage from './pages/ProductPage/ProductPage.jsx';
import useScrollTop from './hooks/useScrollTop.js';
import ServicesPage from './pages/ServicesPage/ServicesPage.jsx';

import VacancyPage from './pages/VacancyPage/VacancyPage.jsx';
import ResumePage from './pages/ResumePage/ResumePage.jsx';

import AdminLogin from './pages/AdminLogin/AdminLogin.jsx';

import AdvertisingPage from './pages/AdvertisingPage/AdvertisingPage.jsx';

import WorkPage from './pages/WorkPage/WorkPage.jsx';

import BannerPage from './pages/BannerPage/BannerPage.jsx';
import ProfessionPage from './pages/ProfessionPage/ProfessionPage.jsx';
import CityPage from './pages/CityPage/CityPage.jsx';
import ReklamaPage from './pages/ReklamaPage/ReklamaPage.jsx';
import axios from 'axios';
import { API_LINK, API_USERS_GET_TOKEN } from './constants/api.js';
import { useMediaQuery } from 'react-responsive';
import CompaniesPage from './pages/CompaniesPage/CompaniesPage.jsx';

const Router = () => {
    const { pathname } = useLocation();

    const media500px = useMediaQuery({ query: '(max-width: 500px)' });
    //чтобы при переходе на новую страницу она начиналась с начала а не с середины

    const scrollEnabled = pathname !== '/services' && pathname !== '/catalog';

    useScrollTop(scrollEnabled);

    const options = {
        headers: {
            'Content-type': `multipart/form-data`,
        },
    };

    // if (data === true) {
    //     window.location = "/";
    //     window.sessionStorage.setItem('token', 'true');
    // }

    const token = window.sessionStorage.getItem('token');

    if (token != '') {
        axios
            .post(
                API_LINK + API_USERS_GET_TOKEN,
                {
                    token,
                },
                options,
            )
            .then((res) => {
                if (token === '') {
                    window.sessionStorage.clear();
                    //window.sessionStorage.setItem('admin', token);
                }
                //  else {
                //   //  window.sessionStorage.setItem('admin', 'false');
                //     window.sessionStorage.setItem('token', '');
                // }
            });
    }
    return (
        <div
            className={`Router ${pathname == '/' && !media500px ? 'RouterWithBg' : ''}`}
        >
            <NavbarTop />

            <Routes>
                <Route path={'/'} element={<MainPage />} />
                <Route path={'/product/:productId'} element={<ProductPage />} />
                {/* <Route path={'/admin'} element={<AdminLogin />} /> */}
                <Route path={'/services'} element={<MainPage />} />
                <Route path={'/company/:id'} element={<ServicesPage />} />

                <Route path={'/vacancy'} element={<VacancyPage />} />
                <Route path={'/resume'} element={<ResumePage />} />

                {/*<Route path={"/advertising"} element={<AdvertisingPage />} />*/}
                <Route path={'/reklama'} element={<ReklamaPage />} />

                <Route path={'/work'} element={<WorkPage />} />
                <Route path={'/banner'} element={<BannerPage />} />
                <Route path={'/profession'} element={<ProfessionPage />} />
                <Route path={'/city'} element={<CityPage />} />
                <Route path={'/catalog'} element={<MainPage />} />
                <Route
                    path={'/category/:categoryId'}
                    element={<CompaniesPage />}
                />
                <Route
                    path={'/category/:categoryId'}
                    element={<CompaniesPage />}
                />
                <Route path={'/company/:id'} element={<ServicesPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <FooterBottom />
        </div>
    );
};

export default Router;
