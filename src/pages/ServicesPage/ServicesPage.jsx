import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';

import './ServicesPage.css';
import ServiceInfoOptimized from './ServiceInfo/ServiceInfoOptimized';
import axios from 'axios';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';

const ServicesPage = () => {
    const animate = 'animate__animated animate__fadeIn';
    const { pathname } = useLocation();
    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState({});
    const [otherCompanies, setOtherCompanies] = useState([]);
    const [categories, setCategories] = useState([]);

    const linkedPath = pathname.includes('services') ? '/services' : '/catalog';

    const getCompanyList = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API}company`,
            );
            const responseCategory = await axios.get(
                `${import.meta.env.VITE_API}category`,
            );
            const findedCompany = response?.data?.data.find(
                (company) => company.id == id,
            );
            const filteredCompany = response?.data?.data.filter(
                (company) => company.id != id,
            );
            const titleCategory =
                responseCategory?.data?.data?.find(
                    (category) => category.id == findedCompany.category_id,
                )?.title || '';
            const filteredCategory = responseCategory?.data?.data?.filter(
                (category) => category.parent_id > 0,
            );
            setSelectedItem({
                ...findedCompany,
                title_category: titleCategory,
            });
            setOtherCompanies(filteredCompany.slice(0, 10));
            setCategories(filteredCategory.slice(0, 6));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCompanyList();
    }, [id]);

    return (
        <div className={`ServicesPage ${animate}`}>
            <Container>
                {selectedItem ? (
                    <>
                        <Link className={'servicesPage-title'} to={linkedPath}>
                            {'<-'} Назад
                        </Link>

                        <ServiceInfoOptimized
                            selectedItem={selectedItem}
                            otherCompanies={otherCompanies}
                            categories={categories}
                        />
                    </>
                ) : (
                    <Loader />
                )}
            </Container>
        </div>
    );
};

export default ServicesPage;
