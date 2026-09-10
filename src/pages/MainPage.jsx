import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SliderPreview from '../components/SliderPreview/SliderPreview.jsx';
import ProductsCards from '../components/ProductsCards/ProductsCards.jsx';
//import AboutUs from "../components/AboutUs/AboutUs.jsx";
import Contacts from '../components/Contacts/Contacts.jsx';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer.jsx';
import VideoPromo from '../components/VideoPromo/VideoPromo.tsx';
import WeOffer from '../components/WeOffer/WeOffer.jsx';
import RepairPartnerPromo from '../components/RepairPartnerPromo/RepairPartnerPromo.jsx';
import { useRef } from 'react';

const MainPage = () => {
    const animate = 'animate__animated animate__fadeIn';
    const productsRef = useRef(null); // 👉 создаем ref

    /*<AboutUs />*/

    return (
        <div className={`MainPage ${animate}`}>
            <Container>
                {/*<SliderPreview />*/}
                <RepairPartnerPromo />
                {/* <VideoPromo /> */}
                <WeOffer scrollToProducts={productsRef} />
                <div ref={productsRef}>
                    <ProductsCards />
                </div>
                {/* <VideoPlayer />
                <Contacts /> */}
            </Container>
        </div>
    );
};

export default MainPage;
